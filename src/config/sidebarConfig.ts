import type { SidebarLayoutConfig } from "../types/sidebarConfig";

/**
 * 侧边栏布局配置
 */
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	// 是否启用侧边栏功能
	enable: true,

	// 侧边栏位置：
	// left: 仅显示左侧边栏
	// right: 仅显示右侧边栏
	// both: 保持两套侧边栏配置，1280px以上同时显示两列，769-1279px根据tabletSidebar配置显示其中一侧
	position: "both",

	// 平板端(769-1279px)显示哪侧侧边栏，仅position为both时生效
	// left: 平板端显示左侧边栏
	// right: 平板端显示右侧边栏
	tabletSidebar: "left",

	// 桌面端双侧栏摆放方式，仅position为both时生效
	// split: 左右分布，布局为 [左侧栏 + 正文 + 右侧栏]
	// left: 两列侧边栏都放在正文左侧，布局为 [左侧栏组件列 + 右侧栏组件列 + 正文]
	desktopSidebarPlacement: "left",

	// 文章详情页隐藏侧边栏，设为 true 则只在首页等非文章页显示
	hideSidebarOnPostPage: false,

	// 文章详情页保持双侧栏
	// 使用单侧栏(position为left或right)时，是否在文章详情页显示双侧边栏，（hideSidebarOnPostPage需要保持false）
	// 当position为left时开启此项，文章详情页将额外显示右侧边栏
	// 当position为right时开启此项，文章详情页将额外显示左侧边栏
	// 适用在只想用单侧栏，但在文章详情页想用对侧栏的目录等组件的场景
	showBothSidebarsOnPostPage: true,

	// 左侧边栏组件配置列表
	// 组件的渲染顺序完全取决于它们在配置数组中出现的顺序，但top的组件会优先于sticky位置的组件渲染
	// type 组件类型
	// enable 是否启用该组件
	// showTitle 是否显示该组件标题，默认true
	// position 组件位置：top固定顶部，sticky粘性定位(会跟随页面滚动)
	// showOnPostPage 是否在文章详情页显示该组件
	// hideOnNonPostPage 是否在非文章详情页隐藏该组件（true=仅文章详情页显示）
	// specificConfig 组件专属配置
	leftComponents: [
		{
			// 组件类型：用户资料组件
			type: "profile",
			// 是否启用该组件
			enable: true,
			// 组件位置
			position: "top",
			// 是否在文章详情页显示
			showOnPostPage: true,
		},
		{
			// 组件类型：公告组件
			type: "announcement",
			// 是否启用该组件
			enable: true,
			// 组件位置
			position: "top",
			// 是否在文章详情页显示
			showOnPostPage: true,
		},
		{
			// 组件类型：天气预报
			type: "weatherForecast",
			// 是否启用该组件
			enable: true,
			// 放在左边第一列侧边栏，但不放在最顶部
			position: "top",
			// 是否在文章详情页显示
			showOnPostPage: true,
			customProps: {
				// 天气接口走站内服务端代理，不要把和风天气 Key 写到前端。
				// 部署时把真实密钥配置到环境变量 QWEATHER_API_KEY。
				// 还需要在和风天气控制台“设置”页复制专属 API Host，配置到 QWEATHER_API_HOST。
				// 不设置固定兜底城市；无法从访问者请求推断位置时，组件显示未知。
				apiEndpoint: "/api/weather",
			},
		},
		{
			// 组件类型：音乐播放器
			type: "music",
			// 是否启用该组件
			enable: true,
			// 组件位置
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: true,
		},
		{
			// 组件类型：分类组件
			type: "categories",
			// 是否启用该组件
			enable: true,
			// 组件位置
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 组件专属配置
			specificConfig: {
				// 折叠阈值：当分类数量超过>5个时自动折叠
				collapseThreshold: 5,
			},
		},
		{
			// 组件类型：标签组件
			type: "tags",
			// 是否启用该组件
			enable: true,
			// 组件位置
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 组件专属配置
			specificConfig: {
				// 折叠阈值：当标签数量超过>10个时自动折叠
				collapseThreshold: 10,
			},
		},
		{
			// 组件类型：浏览数据统计
			type: "visitStats",
			// 是否启用该组件
			enable: true,
			// 放在左边第一列侧边栏底部
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: true,
			customProps: {
				// 访问统计通过站内 /api/stats 代理从 Umami 获取数据。
				// 部署时配置运行时环境变量：UMAMI_API_URL、UMAMI_USERNAME、UMAMI_PASSWORD、UMAMI_WEBSITE_ID。
				apiEndpoint: "/api/stats",
				provider: "umami",
			},
		},
	],

	// 右侧边栏组件配置列表
	rightComponents: [
		{
			// 组件类型：时间问候卡片
			type: "timeGreeting",
			// 是否启用该组件
			enable: true,
			// 放在左边第二列侧边栏最顶部
			position: "top",
			// 是否在文章详情页显示
			showOnPostPage: true,
			customProps: {
				// 问候图片链接，会根据当前时间自动切换
				greetingImages: {
					黎明: "https://tu.202685.xyz/file/1786257814716_liming.webp",
					早晨: "https://tu.202685.xyz/file/1786257815800_zaochen.webp",
					上午: "https://tu.202685.xyz/file/1786257811956_shangwu.webp",
					中午: "https://tu.202685.xyz/file/1786257814664_zhongwu.webp",
					下午: "https://tu.202685.xyz/file/1786257817003_xiawu.webp",
					晚上: "https://tu.202685.xyz/file/1786257819272_wanshang.webp",
					深夜: "https://tu.202685.xyz/file/1786257820552_shenye.webp",
				},
				imageAlt: "问候配图",
			},
		},
		{
			// 组件类型：日期进度模块
			type: "dateProgress",
			// 是否启用该组件
			enable: true,
			// 放在左边第二列侧边栏
			position: "top",
			// 是否在文章详情页显示
			showOnPostPage: true,
			customProps: {
				// 自动节日倒计时：
				// 组件会自动识别公历节日和常见农历节日，无需每年手动修改。
				// 如需加入生日、纪念日等自定义日期，可在 festivals 中追加：
				// { name: "纪念日", date: "2026-08-09" }
				festivals: [],
			},
		},
		{
			type: "Everydaysay",  // 必须与 componentMap 的 key 一致
			enable: true,           // true = 启用，false = 禁用
			position: "sticky",        // "top" = 固定顶部，"sticky" = 粘性定位
			showOnPostPage: true,   // 是否在文章详情页显示
		},
		{
			// 组件类型：最新动态组件
			type: "dynamic",
			// 是否启用该组件
			enable: true,
			// 组件位置
			position: "top",
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 组件专属配置
			specificConfig: {
				dynamic: {
					// 显示的最新动态数量
					limit: 2,
				},
			},
		},
		{
			// 组件类型：站点统计组件
			type: "stats",
			// 是否启用该组件
			enable: true,
			// 组件位置
			position: "top",
			// 是否在文章详情页显示
			showOnPostPage: false,
		},
		{
			// 组件类型：站点信息组件
			type: "siteInfo",
			// 是否启用该组件
			enable: true,
			// 组件位置
			position: "top",
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 组件专属配置
			specificConfig: {
				siteInfo: {
					// 未能识别的构建平台回退显示文本，可自定义
					unknownBuildPlatform: "Unknown CI",
				},
			},
		},
		{
			// 组件类型：日历组件
			type: "calendar",
			// 是否启用该组件
			enable: true,
			// 是否显示组件标题
			showTitle: false,
			// 组件位置
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: false,
			// 组件专属配置
			specificConfig: {
				calendar: {
					// 是否显示年度文章热力图
					showHeatmap: true,
				},
			},
		},
		{
			// 组件类型：侧边栏目录组件（只在文章详情页显示）
			type: "sidebarToc",
			// 是否启用该组件
			enable: true,
			// 组件位置
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 是否在非文章详情页隐藏
			hideOnNonPostPage: true,
		},
		{
			// 组件类型：广告栏组件 1
			type: "advertisement",
			// 是否启用该组件
			enable: false,
			// 是否显示组件标题
			showTitle: false,
			// 组件位置
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 组件专属配置（广告内容直接在此配置）
			specificConfig: {
				ad: {
					image: {
						src: "/assets/images/ad/ad1.webp",
						alt: "广告横幅",
						link: "https://haoka.lot-ml.com/plugreg.html?agentid=1423316",
						external: true,
					},
					// 是否允许关闭广告
					closable: false,
					// 显示次数限制，-1为无限制
					displayCount: -1,
					// 组件内边距配置
					padding: {
						all: "1rem",
					},
				},
			},
		},
		{
			// 组件类型：广告栏组件 2
			type: "advertisement",
			// 是否启用该组件
			enable: false,
			// 组件位置
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 组件专属配置（广告内容直接在此配置）
			specificConfig: {
				ad: {
					title: "支持博主",
					content:
						"如果您觉得本站内容对您有帮助，欢迎支持我们的创作！您的支持是我们持续更新的动力。",
					link: {
						text: "支持一下",
						url: "about/",
						external: false,
					},
					closable: false,
					displayCount: -1,
				},
			},
		},
	],

	// 移动端底部组件配置列表
	// 这些组件只在移动端(<768px)显示在页面底部，独立于左右侧边栏配置
	mobileBottomComponents: [
		{
			// 组件类型：用户资料组件
			type: "profile",
			// 是否启用该组件
			enable: true,
			// 是否在文章详情页显示
			showOnPostPage: true,
		},
		{
			// 组件类型：公告组件
			type: "announcement",
			// 是否启用该组件
			enable: true,
			// 是否在文章详情页显示
			showOnPostPage: true,
		},
		{
			// 组件类型：分类组件
			type: "categories",
			// 是否启用该组件
			enable: true,
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 组件专属配置
			specificConfig: {
				// 折叠阈值：当分类数量超过5个时自动折叠
				collapseThreshold: 5,
			},
		},
		{
			// 组件类型：标签组件
			type: "tags",
			// 是否启用该组件
			enable: true,
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 组件专属配置
			specificConfig: {
				// 折叠阈值：当标签数量超过20个时自动折叠
				collapseThreshold: 10,
			},
		},
		{
			// 组件类型：最新动态组件
			type: "dynamic",
			// 是否启用该组件
			enable: true,
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 组件专属配置
			specificConfig: {
				dynamic: {
					// 显示的最新动态数量
					limit: 2,
				},
			},
		},
		{
			// 组件类型：站点统计组件
			type: "stats",
			// 是否启用该组件
			enable: true,
			// 是否在文章详情页显示
			showOnPostPage: true,
		},
		{
			// 组件类型：站点信息组件
			type: "siteInfo",
			// 是否启用该组件
			enable: true,
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 组件专属配置
			specificConfig: {
				siteInfo: {
					// 未能识别的构建平台回退显示文本，可自定义
					unknownBuildPlatform: "Unknown CI",
				},
			},
		},
	],
};
