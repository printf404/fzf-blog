import { onRequest as handleStatsRequest } from "../functions/api/stats";

type VercelRequest = {
	url?: string;
	method?: string;
	headers: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
	status: (statusCode: number) => VercelResponse;
	setHeader: (name: string, value: string) => void;
	send: (body: string) => void;
};

function getHeaderValue(value: string | string[] | undefined): string {
	return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function createFetchRequest(request: VercelRequest): Request {
	const protocol = getHeaderValue(request.headers["x-forwarded-proto"]) || "https";
	const host = getHeaderValue(request.headers.host) || "localhost";
	const url = new URL(request.url || "/api/stats", `${protocol}://${host}`);
	const headers = new Headers();

	for (const [key, value] of Object.entries(request.headers)) {
		if (Array.isArray(value)) {
			for (const item of value) headers.append(key, item);
			continue;
		}
		if (value) headers.set(key, value);
	}

	return new Request(url, {
		method: request.method || "GET",
		headers,
	});
}

export default async function handler(
	request: VercelRequest,
	response: VercelResponse,
): Promise<void> {
	const statsResponse = await handleStatsRequest({
		request: createFetchRequest(request),
		env: {
			UMAMI_API_URL: process.env.UMAMI_API_URL,
			UMAMI_USERNAME: process.env.UMAMI_USERNAME,
			UMAMI_PASSWORD: process.env.UMAMI_PASSWORD,
			UMAMI_WEBSITE_ID: process.env.UMAMI_WEBSITE_ID,
		},
	});

	response.status(statsResponse.status);
	statsResponse.headers.forEach((value, key) => response.setHeader(key, value));
	response.send(await statsResponse.text());
}
