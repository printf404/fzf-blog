type RuntimeEnv = {
	QWEATHER_API_KEY?: string;
	QWEATHER_API_HOST?: string;
};

type WeatherResult = {
	location: string;
	temp: number | string;
	text: string;
	high: number | string;
	low: number | string;
	wind: string;
	humidity: number | string;
	feels: number | string;
	pressure: number | string;
	cloud: number | string;
	rainRate: number | string;
	rain: number | string;
	uv: number | string;
	sunrise: string;
	sunset: string;
	pm25: number | string;
	pm10: number | string;
	o3: number | string;
	no2: number | string;
	so2: number | string;
	co: number | string;
	updateText: string;
};

function json(data: unknown, init?: ResponseInit) {
	return new Response(JSON.stringify(data), {
		...init,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "public, max-age=600",
			...(init?.headers ?? {}),
		},
	});
}

function normalizeApiHost(host: string): string {
	const trimmed = host.trim().replace(/\/+$/, "");
	return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function getClientLocation(request: Request): string | null {
	const cf = (request as Request & { cf?: Record<string, unknown> }).cf;
	const longitude = typeof cf?.longitude === "string" ? cf.longitude : "";
	const latitude = typeof cf?.latitude === "string" ? cf.latitude : "";
	if (longitude && latitude) return `${longitude},${latitude}`;

	const vercelLongitude = request.headers.get("x-vercel-ip-longitude") || "";
	const vercelLatitude = request.headers.get("x-vercel-ip-latitude") || "";
	if (vercelLongitude && vercelLatitude) return `${vercelLongitude},${vercelLatitude}`;

	return null;
}

function getDisplayLocation(request: Request, resolvedLocation?: string): string {
	const cf = (request as Request & { cf?: Record<string, unknown> }).cf;
	const cfCity = typeof cf?.city === "string" ? cf.city : "";
	const cfRegion = typeof cf?.region === "string" ? cf.region : "";
	const vercelCity = decodeURIComponent(request.headers.get("x-vercel-ip-city") || "");
	const vercelRegion = decodeURIComponent(
		request.headers.get("x-vercel-ip-country-region") || "",
	);
	const city = cfCity || vercelCity;
	const region = cfRegion || vercelRegion;
	return [city, region].filter(Boolean).join(" ") || resolvedLocation || "未知";
}

function isDirectWeatherLocation(location: string): boolean {
	return /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(location) || /^\d+$/.test(location);
}

async function resolveLocation(
	apiHost: string,
	location: string,
	apiKey: string,
): Promise<{ id: string; displayName?: string } | null> {
	if (isDirectWeatherLocation(location)) return { id: location };

	const url = new URL("/geo/v2/city/lookup", apiHost);
	url.searchParams.set("location", location);
	url.searchParams.set("lang", "zh");
	url.searchParams.set("range", "cn");

	const response = await fetch(url.toString(), {
		headers: { "X-QW-Api-Key": apiKey },
	});
	if (!response.ok) return null;
	const data = (await response.json()) as {
		code?: string;
		location?: Array<{
			id?: string;
			name?: string;
			adm1?: string;
			adm2?: string;
		}>;
	};
	if (data.code && data.code !== "200") return null;
	const matched = data.location?.[0];
	if (!matched?.id) return null;

	return {
		id: matched.id,
		displayName: [matched.name, matched.adm2, matched.adm1].filter(Boolean).join(" "),
	};
}

async function fetchQWeather<T>(
	apiHost: string,
	pathname: string,
	location: string,
	apiKey: string,
): Promise<T | null> {
	const url = new URL(pathname, apiHost);
	url.searchParams.set("location", location);
	url.searchParams.set("lang", "zh");
	url.searchParams.set("unit", "m");

	const response = await fetch(url.toString(), {
		headers: { "X-QW-Api-Key": apiKey },
	});
	if (!response.ok) return null;
	const data = (await response.json()) as T & { code?: string };
	if (data.code && data.code !== "200") return null;
	return data;
}

function normalizeWeather(
	request: Request,
	resolvedLocation: string | undefined,
	nowData: any,
	dailyData: any,
	airData: any,
): WeatherResult {
	const now = nowData?.now ?? {};
	const today = dailyData?.daily?.[0] ?? {};
	const air = airData?.now ?? {};
	const obsTime = now.obsTime ? new Date(now.obsTime) : null;

	return {
		location: getDisplayLocation(request, resolvedLocation),
		temp: now.temp ?? "--",
		text: now.text ?? "--",
		high: today.tempMax ?? "--",
		low: today.tempMin ?? "--",
		wind: `${now.windDir ?? "--"} ${now.windScale ?? "--"}级`,
		humidity: now.humidity ?? "--",
		feels: now.feelsLike ?? "--",
		pressure: now.pressure ?? "--",
		cloud: now.cloud ?? "--",
		rainRate: "--",
		rain: now.precip ?? "0",
		uv: today.uvIndex ?? "--",
		sunrise: today.sunrise ?? "--:--",
		sunset: today.sunset ?? "--:--",
		pm25: air.pm2p5 ?? "--",
		pm10: air.pm10 ?? "--",
		o3: air.o3 ?? "--",
		no2: air.no2 ?? "--",
		so2: air.so2 ?? "--",
		co: air.co ?? "--",
		updateText: obsTime
			? `${obsTime.getHours().toString().padStart(2, "0")}:${obsTime
					.getMinutes()
					.toString()
					.padStart(2, "0")} 发布`
			: "天气数据已更新",
	};
}

export async function onRequest(context: {
	request: Request;
	env: RuntimeEnv;
}): Promise<Response> {
	const apiKey = context.env.QWEATHER_API_KEY;
	if (!apiKey) {
		return json(
			{
				error: "QWEATHER_API_KEY 未配置",
				message:
					"请在部署平台环境变量中配置 QWEATHER_API_KEY，不要把密钥写进前端代码。",
			},
			{ status: 503 },
		);
	}
	const apiHost = context.env.QWEATHER_API_HOST;
	if (!apiHost) {
		return json(
			{
				error: "QWEATHER_API_HOST 未配置",
				message:
					"请在和风天气控制台的“设置”页复制专属 API Host，并配置到部署平台环境变量。",
			},
			{ status: 503 },
		);
	}

	const rawLocation = getClientLocation(context.request);
	if (!rawLocation) {
		return json(
			{
				error: "天气位置未知",
				message:
					"当前部署环境未提供访问者经纬度，前端将显示未知。",
			},
			{ status: 503 },
		);
	}
	const weatherApiHost = normalizeApiHost(apiHost);
	const location = await resolveLocation(weatherApiHost, rawLocation, apiKey);
	if (!location) {
		return json(
			{
				error: "天气位置解析失败",
				message: "访问者位置解析失败，前端将显示未知。",
			},
			{ status: 502 },
		);
	}
	const [nowData, dailyData, airData] = await Promise.all([
		fetchQWeather(weatherApiHost, "/v7/weather/now", location.id, apiKey),
		fetchQWeather(weatherApiHost, "/v7/weather/3d", location.id, apiKey),
		fetchQWeather(weatherApiHost, "/v7/air/now", location.id, apiKey),
	]);

	if (!nowData) {
		return json(
			{
				error: "天气数据获取失败",
				message: "请检查 QWEATHER_API_KEY、QWEATHER_API_HOST 或和风天气服务状态。",
			},
			{ status: 502 },
		);
	}

	return json(
		normalizeWeather(context.request, location.displayName, nowData, dailyData, airData),
	);
}
