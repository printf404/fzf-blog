type RuntimeEnv = {
	UMAMI_SHARE_URL?: string;
};

type StatsResult = {
	totalViews: number | string;
	visits: number | string;
	visitors: number | string;
};

type UmamiShareResponse = {
	websiteId?: string;
	token?: string;
};

type UmamiStatsResponse = {
	pageviews?: { value?: number } | number;
	visits?: { value?: number } | number;
	visitors?: { value?: number } | number;
};

// 缓存：避免每次请求都打 Umami API
let cachedStats: StatsResult | null = null;
let cacheExpiry = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 分钟

let cachedShareData: UmamiShareResponse | null = null;
let shareDataExpiry = 0;
const SHARE_DATA_TTL = 30 * 60 * 1000; // 30 分钟

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

function getFieldValue(field: unknown): number {
	if (typeof field === "object" && field !== null) {
		const val = (field as { value?: unknown }).value;
		return Number(val) || 0;
	}
	return Number(field) || 0;
}

function parseShareUrl(shareUrl: string): { apiBase: string; sharePath: string } {
	const url = new URL(shareUrl);
	const sharePath = url.pathname.split("/share/")[1];
	if (!sharePath) throw new Error("Invalid Umami share URL");

	let apiBase = `${url.origin}/api`;
	if (shareUrl.includes("cloud.umami.is") || shareUrl.includes("analytics.umami.is")) {
		const region = shareUrl.includes("/analytics/eu/") ? "eu" : "us";
		apiBase = `https://cloud.umami.is/analytics/${region}/api`;
	}

	return { apiBase, sharePath };
}

async function fetchShareData(
	apiBase: string,
	sharePath: string,
): Promise<UmamiShareResponse | null> {
	const now = Date.now();
	if (cachedShareData && now < shareDataExpiry) return cachedShareData;

	try {
		const response = await fetch(`${apiBase}/share/${sharePath}`, {
			credentials: "omit",
		});
		if (!response.ok) return null;
		const data = (await response.json()) as UmamiShareResponse;
		if (!data.websiteId || !data.token) return null;

		cachedShareData = data;
		shareDataExpiry = now + SHARE_DATA_TTL;
		return data;
	} catch {
		return null;
	}
}

async function fetchStats(
	apiBase: string,
	shareData: UmamiShareResponse,
): Promise<StatsResult | null> {
	const now = Date.now();
	if (cachedStats && now < cacheExpiry) return cachedStats;

	try {
		const endAt = Date.now();
		const statsUrl = new URL(`${apiBase}/websites/${shareData.websiteId}/stats`);
		statsUrl.searchParams.set("startAt", "0");
		statsUrl.searchParams.set("endAt", String(endAt));
		statsUrl.searchParams.set("unit", "hour");
		statsUrl.searchParams.set("timezone", "Asia/Shanghai");

		const response = await fetch(statsUrl.toString(), {
			credentials: "omit",
			headers: {
				"x-umami-share-context": "1",
				"x-umami-share-token": shareData.token ?? "",
			},
		});
		if (!response.ok) return null;

		const data = (await response.json()) as UmamiStatsResponse;
		const result: StatsResult = {
			totalViews: getFieldValue(data.pageviews),
			visits: getFieldValue(data.visits),
			visitors: getFieldValue(data.visitors),
		};

		cachedStats = result;
		cacheExpiry = now + CACHE_TTL;
		return result;
	} catch {
		return null;
	}
}

export async function onRequest(context: {
	request: Request;
	env: RuntimeEnv;
}): Promise<Response> {
	// 优先从环境变量读取 shareUrl，其次从查询参数读取
	let shareUrl = (context.env.UMAMI_SHARE_URL ?? "").trim();

	if (!shareUrl) {
		const url = new URL(context.request.url);
		shareUrl = url.searchParams.get("share") ?? "";
	}

	if (!shareUrl) {
		return json(
			{
				error: "缺少 Umami 分享链接",
				message:
					"请在 Cloudflare 运行时环境变量中配置 UMAMI_SHARE_URL，或在前端通过 ?share= 参数传入。",
			},
			{ status: 503 },
		);
	}

	try {
		const { apiBase, sharePath } = parseShareUrl(shareUrl);
		const shareData = await fetchShareData(apiBase, sharePath);

		if (!shareData) {
			return json(
				{
					error: "Umami 分享数据获取失败",
					message: "请检查分享链接是否正确、Umami 服务是否正常运行。",
				},
				{ status: 502 },
			);
		}

		const stats = await fetchStats(apiBase, shareData);
		if (!stats) {
			return json(
				{
					error: "Umami 统计数据获取失败",
					message: "Umami 服务可能暂不可用，请稍后重试。",
				},
				{ status: 502 },
			);
		}

		return json(stats);
	} catch (error) {
		return json(
			{
				error: "Umami 代理请求异常",
				message: error instanceof Error ? error.message : "未知错误",
			},
			{ status: 500 },
		);
	}
}
