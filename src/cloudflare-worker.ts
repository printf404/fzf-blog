import { onRequest as handleWeatherRequest } from "../functions/api/weather";

type WorkerEnv = {
	ASSETS: {
		fetch: (request: Request) => Response | Promise<Response>;
	};
	QWEATHER_API_KEY?: string;
	QWEATHER_API_HOST?: string;
};

function isWeatherApiPath(pathname: string) {
	return pathname === "/api/weather" || pathname === "/api/weather/";
}

export default {
	async fetch(request: Request, env: WorkerEnv): Promise<Response> {
		const url = new URL(request.url);

		if (isWeatherApiPath(url.pathname)) {
			return handleWeatherRequest({ request, env });
		}

		return env.ASSETS.fetch(request);
	},
};
