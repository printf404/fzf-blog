import type { BooknavGroup, BooknavPageConfig } from "../types/booknavConfig";

// 书签导航页面配置
export const booknavPageConfig: BooknavPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// favicon 自动获取配置
	favicon: {
		// 书签未填写 icon 时，是否自动获取目标站点的 favicon 图标
		enabled: true,

		// favicon 接口地址，{domain} 为占位符，会被替换成目标站点域名
		// 更换接口只需保证地址里含有 {domain}，例如：
		//   https://a.favicon.im/{domain}
		//   https://favicon.im/{domain}
		api: "https://a.favicon.im/{domain}",
	},
};

// 书签导航配置
// 每个数组项是一个分类组，分类组内的 items 是该分类下的书签
export const booknavConfig: BooknavGroup[] = [
	{
		id: "dev",
		name: "开发工具",
		icon: "material-symbols:code-rounded",
		desc: "用于开发的工具、网站",
		weight: 100,
		items: [
			{
				title: "GitHub",
				url: "https://github.com",
				desc: "全球最大的代码托管平台",
				icon: "fa7-brands:github",
				weight: 10,
			},
			{
				title: "MDN Web Docs",
				url: "https://developer.mozilla.org",
				desc: "最权威的 Web 技术文档",
				weight: 9,
			},
			{
				title: "Astro",
				url: "https://astro.build",
				desc: "内容驱动型网站的 Web 框架",
				weight: 8,
			},
			{
				title: "Svelte",
				url: "https://svelte.dev",
				desc: "把组件编译成高效原生 JS 的框架",
				weight: 7,
			},
			{
				title: "Tailwind CSS",
				url: "https://tailwindcss.com",
				desc: "一个功能强大且灵活的 CSS 框架",
				weight: 6,
			},
		],
	},
	{
		id: "mytools",
		name: "我的网站",
		icon: "material-symbols:toolbox",
		desc: "使用的服务管理",
		weight: 1,
		items: [
			{
				title: "Cloudflare",
				url: "https://dash.cloudflare.com",
				desc: "托管平台",
				weight: 10,
			},
			{
				title: "PagesCMS",
				url: "https://app.pagescms.org/printf404/fzf-blog/master/collection/posts",
				desc: "后台管理",
				weight: 9,
			},
			{
				title: "我的图床",
				url: "https://tu.202685.xyz",
				desc: "存放引用文件",
				weight: 8,
			},
		],
	},
	{
		id: "design",
		name: "设计",
		icon: "material-symbols:palette-outline-rounded",
		desc: "配色、图标与灵感来源",
		weight: 90,
		items: [
			{
				title: "Iconify",
				url: "https://icon-sets.iconify.design",
				desc: "海量开源图标集合搜索",
				weight: 10,
			},
			{
				title: "iconfont",
				url: "https://www.iconfont.cn",
				desc: "阿里巴巴矢量图标库",
				weight: 9,
			},
			{
				title: "CodePen",
				url: "https://codepen.io/",
				desc: "在线前端代码编辑器和社区",
				weight: 8,
			},
			{
				title: "Uiverse",
				url: "https://uiverse.io/",
				desc: "开源UI组件库,复制可用",
				weight: 7,
			},
			{
				title: "React Bits",
				url: "https://www.reactbits.dev/",
				desc: "React组件和模式集合",
				weight: 6,
			},
			{
				title: "21ST",
				url: "https://21st.dev/",
				desc: "来自社区的组件和模板",
				weight: 5,
			},
		],
	},
	{
		id: "tools",
		name: "工具",
		icon: "material-symbols:build-outline-rounded",
		desc: "顺手的在线小工具",
		weight: 80,
		items: [
			{
				title: "MapTiler Cloud",
				url: "https://cloud.maptiler.com/auth/widget?next=https://cloud.maptiler.com/maps/",
				desc: "地图服务可视化平台",
				weight: 15,
			},
			{
				title: "imagestool",
				url: "https://imagestool.com/zh_CN/#google_vignette",
				desc: "无需上传图片在线处理",
				weight: 15,
			},
			{
				title: "Free Font",
				url: "https://font.ittools.cc/art",
				desc: "免费的商用字体",
				weight: 14,
			},
			{
				title: "在线本地字体预览",
				url: "https://www.lddgo.net/convert/local-font-preview",
				desc: "本地字体预览工具",
				weight: 13,
			},
			{
				title: "在线Ping测试",
				url: "https://www.itdog.cn/",
				desc: "多线路网络延迟测试工具",
				weight: 12,
			},
			{
				title: "获取任意网站图标",
				url: "https://webicon.cc/zh-cn/",
				desc: "获取网站图标",
				weight: 11,
			},
			{
				title: "TinyPNG",
				url: "https://tinypng.com",
				desc: "在线压缩 PNG / JPEG 图片",
				weight: 10,
			},
			{
				title: "Squoosh",
				url: "https://squoosh.app",
				desc: "Google 出品的图片压缩与格式转换",
				weight: 9,
			},
			{
				title: "Carbon",
				url: "https://carbon.now.sh",
				desc: "把代码片段生成漂亮的图片",
				weight: 8,
			},
			{
				title: "bilibili视频提取",
				url: "https://snapany.com/zh/bilibili",
				desc: "提取B站视频下载地址",
				weight: 7,
			},
			{
				title: "Mp3音频转换",
				url: "https://www.freeconvert.com/zh-CN/mp3-converter",
				desc: "可将任意文件转为mp3音频格式",
				weight: 6,
			},
			{
				title: "网易云音乐提取器",
				url: "https://yy.luodian.net.cn/",
				desc: "网易云音乐内容下载",
				weight: 5,
			},
			{
				title: "获取任意网站图标",
				url: "https://webicon.cc",
				desc: "获取网站图标",
				weight: 4,
			},
			{
				title: "免费在线抠图",
				url: "https://www.koukoutu.com/removebgtool/all",
				desc: "无需上传的在线抠图工具",
				weight: 3,
			},
			{
				title: "在线视频压缩工具",
				url: "https://videocompress.io",
				desc: "免费在线压缩视频",
				weight: 2,
			},
			{
				title: "多功能图片转换器",
				url: "https://imagestool.com/webp2jpg-online/",
				desc: "在线图片格式转换工具",
				weight: 1,
			},
		],
	},
	{
		id: "resources",
		name: "文档",
		icon: "material-symbols:auto-stories-outline-rounded",
		desc: "文档、教程与阅读",
		weight: 1000,
		items: [
			{
				title: "Firefly Docs",
				url: "https://docs-firefly.cuteleaf.cn",
				desc: "Firefly 主题模板文档",
				icon: "https://docs-firefly.cuteleaf.cn/logo.png",
				weight: 10,
			},
		],
	},
	{
		id: "ziyuan",
		name: "资源网站",
		icon: "material-symbols:folder_special",
		desc: "众多资源网站",
		weight: 20,
		items: [
			{
				title: "Emoji词典",
				url: "https://www.emojiall.com/",
				desc: "emoji表情查询工具",
				weight: 10,
			},
			{
				title: "释放字体自由字体",
				url: "https://fonts.zeoseven.com/",
				desc: "免费字体资源网",
				weight: 9,
			},
			{
				title: "skillsMP",
				url: "https://skillsmp.com/zh",
				desc: "skill技能学习与分享",
				weight: 8,
			},
			{
				title: "skillsMP",
				url: "https://skillsmp.com/zh",
				desc: "skill技能学习与分享",
				weight: 8,
			},
			{
				title: "哲风壁纸",
				url: "https://haowallpaper.com/",
				desc: "类似于Wallpaper的内网壁纸网站",
				weight: 7,
			},
			{
				title: "部落冲突阵容库",
				url: "https://coc.tsh520.cn",
				desc: "coc.tsh520.cn",
				weight: 6,
			},
		],
	},
	{
		id: "ai",
		name: "AI工具",
		icon: "material-symbols:link",
		desc: "文档、教程与阅读",
		weight: 85,
		items: [
			{
				title: "DeepSeek",
				url: "https://www.deepseek.com/",
				desc: "深度求索",
				weight: 10,
			},
			{
				title: "Opencode官网",
				url: "https://opencode.ai/",
				desc: "开源ai代理",
				weight: 10,
			},
		],
	},
	{
		id: "API",
		name: "API",
		icon: "material-symbols:link",
		desc: "可使用的API工具",
		weight: 95,
		items: [
			{
				title: "高德地图API",
				url: "https://lbs.amap.com/",
				desc: "高德地图开放平台",
				weight: 10,
			},
			{
				title: "聚合数据",
				url: "https://www.juhe.cn/",
				desc: "国内数据服务平台",
				weight: 9,
			},
			{
				title: "uapis.cn",
				url: "https://uapis.cn/",
				desc: "免费,稳定,快速的公共API",
				weight: 8,
			},
			{
				title: "xxapi.cn",
				url: "https://xxapi.cn/",
				desc: "小小API",
				weight: 7,
			},
		],
	},
	{
		id: "xiangmu",
		name: "项目",
		icon: "material-symbols:link",
		desc: "可使用的项目插件",
		weight: 95,
		items: [
			{
				title: "footprintmap",
				url: "https://footprintmap.xiaoten.com/",
				desc: "小十足迹地图",
				weight: 10,
			},
			{
				title: "CloudFlare托管",
				url: "https://cfbed.sanyue.de/",
				desc: "开源文件托管解决方案",
				weight: 9,
			},
			{
				title: "Waline",
				url: "https://waline.js.org/",
				desc: "简洁稳定的评论系统",
				weight: 8,
			},
		],
	},
];
