import { onRequest as handleStatsRequest } from "../functions/api/stats";
import { onRequest as handleWeatherRequest } from "../functions/api/weather";
import { onRequest as handleUmamiShareRequest } from "../functions/api/umami-share";

type WorkerEnv = {
	ASSETS: {
		fetch: (request: Request) => Response | Promise<Response>;
	};
	QWEATHER_API_KEY?: string;
	QWEATHER_API_HOST?: string;
	UMAMI_API_URL?: string;
	UMAMI_USERNAME?: string;
	UMAMI_PASSWORD?: string;
	UMAMI_WEBSITE_ID?: string;
	UMAMI_SHARE_URL?: string;
};

function isApiPath(pathname: string, route: string) {
	return pathname === route || pathname === `${route}/`;
}

export default {
	async fetch(request: Request, env: WorkerEnv): Promise<Response> {
		const url = new URL(request.url);

		if (isApiPath(url.pathname, "/api/weather")) {
			return handleWeatherRequest({ request, env });
		}

		if (isApiPath(url.pathname, "/api/stats")) {
			return handleStatsRequest({ request, env });
		}

		if (isApiPath(url.pathname, "/api/umami-share")) {
			return handleUmamiShareRequest({ request, env });
		}

		return env.ASSETS.fetch(request);
	},
};
