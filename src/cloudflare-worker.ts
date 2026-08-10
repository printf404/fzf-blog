/**
 * Cloudflare Workers 入口文件
 *
 * 负责将 /api/* 路径的请求转发到对应的服务端代理函数，
 * 其他所有路径交给静态资源（dist 目录）处理。
 *
 * 路由列表：
 *   /api/weather      → functions/api/weather.ts     （天气代理，需要 QWEATHER_API_KEY 和 QWEATHER_API_HOST）
 *   /api/stats        → functions/api/stats.ts       （Umami 统计代理，用户名/密码认证方式，当前未使用）
 *   /api/umami-share  → functions/api/umami-share.ts  （Umami 统计代理，分享链接方式，当前前端未使用，备用）
 *
 * 新增 API 路由时：
 *   1. 在 functions/api/ 下创建对应的 .ts 文件并导出 onRequest 函数
 *   2. 在此文件 import 并添加 isApiPath 路由判断
 *   3. 在 WorkerEnv 类型中添加所需的环境变量
 *   4. 更新 allblog.md 文档
 */

import { onRequest as handleStatsRequest } from "../functions/api/stats";
import { onRequest as handleWeatherRequest } from "../functions/api/weather";
import { onRequest as handleUmamiShareRequest } from "../functions/api/umami-share";

type WorkerEnv = {
	ASSETS: {
		fetch: (request: Request) => Response | Promise<Response>;
	};
	// 天气代理环境变量
	QWEATHER_API_KEY?: string;
	QWEATHER_API_HOST?: string;
	// Umami 用户名/密码认证方式环境变量（stats.ts 使用，当前未启用）
	UMAMI_API_URL?: string;
	UMAMI_USERNAME?: string;
	UMAMI_PASSWORD?: string;
	UMAMI_WEBSITE_ID?: string;
	// Umami 分享链接方式环境变量（umami-share.ts 使用，当前前端未走代理，备用）
	UMAMI_SHARE_URL?: string;
};

function isApiPath(pathname: string, route: string) {
	return pathname === route || pathname === `${route}/`;
}

export default {
	async fetch(request: Request, env: WorkerEnv): Promise<Response> {
		const url = new URL(request.url);

		// 天气代理：前端请求 /api/weather，服务端读取和风天气凭据并返回天气数据
		if (isApiPath(url.pathname, "/api/weather")) {
			return handleWeatherRequest({ request, env });
		}

		// Umami 统计代理（用户名/密码方式）：当前前端未使用，保留备用
		if (isApiPath(url.pathname, "/api/stats")) {
			return handleStatsRequest({ request, env });
		}

		// Umami 统计代理（分享链接方式）：当前前端直接请求 Umami API，此代理备用
		if (isApiPath(url.pathname, "/api/umami-share")) {
			return handleUmamiShareRequest({ request, env });
		}

		// 其他所有路径交给静态资源处理
		return env.ASSETS.fetch(request);
	},
};
