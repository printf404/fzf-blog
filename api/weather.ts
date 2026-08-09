import { onRequest as handleWeatherRequest } from "../functions/api/weather";

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
	const url = new URL(request.url || "/api/weather", `${protocol}://${host}`);
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
	const weatherResponse = await handleWeatherRequest({
		request: createFetchRequest(request),
		env: {
			QWEATHER_API_KEY: process.env.QWEATHER_API_KEY,
			QWEATHER_API_HOST: process.env.QWEATHER_API_HOST,
		},
	});

	response.status(weatherResponse.status);
	weatherResponse.headers.forEach((value, key) => response.setHeader(key, value));
	response.send(await weatherResponse.text());
}
