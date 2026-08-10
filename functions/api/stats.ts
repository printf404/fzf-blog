type RuntimeEnv = {
	UMAMI_API_URL?: string;
	UMAMI_USERNAME?: string;
	UMAMI_PASSWORD?: string;
	UMAMI_WEBSITE_ID?: string;
};

type StatsResult = {
	totalViews: number | string;
	visits: number | string;
	visitors: number | string;
};

type UmamiStatsResponse = {
	pageviews?: { value?: number };
	visitors?: { value?: number };
	visits?: { value?: number };
};

// 缓存 token，避免每次请求都登录（在 Worker 实例生命周期内有效）
let cachedToken: string | null = null;
let tokenExpiry = 0;

function json(data: unknown, init?: ResponseInit) {
	const status = init?.status ?? 200;
	return new Response(JSON.stringify(data), {
		...init,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control":
				status >= 400 ? "no-store" : "public, max-age=300",
			...(init?.headers ?? {}),
		},
	});
}

function normalizeBaseUrl(url: string): string {
	return url.trim().replace(/\/+$/, "");
}

async function login(
	baseUrl: string,
	username: string,
	password: string,
): Promise<string | null> {
	try {
		const response = await fetch(`${baseUrl}/api/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});
		if (!response.ok) return null;
		const data = (await response.json()) as { token?: string };
		return data.token ?? null;
	} catch {
		return null;
	}
}

async function getToken(
	baseUrl: string,
	username: string,
	password: string,
): Promise<string | null> {
	const now = Date.now();
	if (cachedToken && now < tokenExpiry) return cachedToken;

	const token = await login(baseUrl, username, password);
	if (token) {
		cachedToken = token;
		// Umami token 不过期，但缓存 1 小时后重新获取以防万一
		tokenExpiry = now + 3600000;
	}
	return token;
}

async function fetchStats(
	baseUrl: string,
	token: string,
	websiteId: string,
): Promise<UmamiStatsResponse | null> {
	const now = Date.now();
	const url = new URL(`${baseUrl}/api/websites/${websiteId}/stats`);
	url.searchParams.set("startAt", "0");
	url.searchParams.set("endAt", String(now));

	const response = await fetch(url.toString(), {
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!response.ok) return null;
	return (await response.json()) as UmamiStatsResponse;
}

export async function onRequest(context: {
	request: Request;
	env: RuntimeEnv;
}): Promise<Response> {
	const apiUrl = context.env.UMAMI_API_URL;
	const username = context.env.UMAMI_USERNAME;
	const password = context.env.UMAMI_PASSWORD;
	const websiteId = context.env.UMAMI_WEBSITE_ID;

	if (!apiUrl || !username || !password || !websiteId) {
		return json(
			{
				error: "Umami 统计代理未配置",
				message:
					"请在部署平台运行时环境变量中配置 UMAMI_API_URL、UMAMI_USERNAME、UMAMI_PASSWORD、UMAMI_WEBSITE_ID",
			},
			{ status: 503 },
		);
	}

	const baseUrl = normalizeBaseUrl(apiUrl);
	const token = await getToken(baseUrl, username, password);
	if (!token) {
		return json(
			{
				error: "Umami 登录失败",
				message: "请检查 UMAMI_USERNAME 和 UMAMI_PASSWORD 是否正确",
			},
			{ status: 502 },
		);
	}

	const stats = await fetchStats(baseUrl, token, websiteId);
	if (!stats) {
		return json(
			{
				error: "Umami 统计数据获取失败",
				message: "请检查 UMAMI_WEBSITE_ID 是否正确或 Umami 服务是否正常",
			},
			{ status: 502 },
		);
	}

	const result: StatsResult = {
		totalViews: stats.pageviews?.value ?? "--",
		visits: stats.visits?.value ?? "--",
		visitors: stats.visitors?.value ?? "--",
	};

	return json(result);
}
