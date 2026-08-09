type RuntimeEnv = {
	QWEATHER_API_KEY?: string;
	QWEATHER_LOCATION?: string;
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

const QWEATHER_API_HOST = "https://devapi.qweather.com";

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

function getClientLocation(request: Request, env: RuntimeEnv): string {
	const cf = (request as Request & { cf?: Record<string, unknown> }).cf;
	const longitude = typeof cf?.longitude === "string" ? cf.longitude : "";
	const latitude = typeof cf?.latitude === "string" ? cf.latitude : "";
	if (longitude && latitude) return `${longitude},${latitude}`;

	return env.QWEATHER_LOCATION || "邵阳";
}

function getDisplayLocation(request: Request): string {
	const cf = (request as Request & { cf?: Record<string, unknown> }).cf;
	const city = typeof cf?.city === "string" ? cf.city : "";
	const region = typeof cf?.region === "string" ? cf.region : "";
	return [city, region].filter(Boolean).join(" ") || "自动定位";
}

async function fetchQWeather<T>(
	pathname: string,
	location: string,
	apiKey: string,
): Promise<T | null> {
	const url = new URL(pathname, QWEATHER_API_HOST);
	url.searchParams.set("location", location);
	url.searchParams.set("key", apiKey);
	url.searchParams.set("lang", "zh");
	url.searchParams.set("unit", "m");

	const response = await fetch(url.toString());
	if (!response.ok) return null;
	const data = (await response.json()) as T & { code?: string };
	if (data.code && data.code !== "200") return null;
	return data;
}

function normalizeWeather(
	request: Request,
	nowData: any,
	dailyData: any,
	airData: any,
): WeatherResult {
	const now = nowData?.now ?? {};
	const today = dailyData?.daily?.[0] ?? {};
	const air = airData?.now ?? {};
	const obsTime = now.obsTime ? new Date(now.obsTime) : null;

	return {
		location: getDisplayLocation(request),
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

	const location = getClientLocation(context.request, context.env);
	const [nowData, dailyData, airData] = await Promise.all([
		fetchQWeather("/v7/weather/now", location, apiKey),
		fetchQWeather("/v7/weather/3d", location, apiKey),
		fetchQWeather("/v7/air/now", location, apiKey),
	]);

	if (!nowData) {
		return json(
			{
				error: "天气数据获取失败",
				message: "请检查 QWEATHER_API_KEY、QWEATHER_LOCATION 或和风天气服务状态。",
			},
			{ status: 502 },
		);
	}

	return json(normalizeWeather(context.request, nowData, dailyData, airData));
}
