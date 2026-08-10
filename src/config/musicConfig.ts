import type { MusicPlayerConfig, MusicVisualizerConfig } from "../types/musicConfig";

// 音乐可视化配置
export const musicVisualizerConfig: MusicVisualizerConfig = {
	// 振幅倍数
	amplitude: 1.5,
	// 频谱平滑系数 (0-1)
	smoothing: 0.8,
	// FFT 大小 (32-32768, 必须是 2 的幂)
	fftSize: 256,
	// 地形网格密度
	gridSize: 64,
	// 自动旋转速度 (弧度/秒)
	rotationSpeed: 0.2,
	// 页面背景色（按明暗主题）
	background: {
		dark: "#27172f",
		light: "#ffffff",
	},
};
// 音乐播放器配置
export const musicPlayerConfig: MusicPlayerConfig = {
	// 是否在导航栏显示音乐播放器入口
	showInNavbar: true,

	// 是否在侧边栏显示音乐播放器组件
	showInSidebar: true,

	// 是否显示迷你播放器
	showMiniPlayer: true,

	// 使用方式："meting" 使用 Meting API，"local" 使用本地音乐列表
	mode: "local",

	// 默认音量 (0-1)
	volume: 0.7,

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode: "list",

	// 是否显启用歌词
	showLyrics: true,

	// 是否同步全局播放器（进入 /music 页面时）
	syncWithGlobalPlayer: true,

	// Meting API 配置
	meting: {
		// Meting API 地址
		// 默认使用官方 API，也可以使用自定义 API
		api: "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
		// 音乐平台：netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
		server: "netease",
		// 类型：song=单曲, playlist=歌单, album=专辑, search=搜索, artist=艺术家
		type: "playlist",
		// 歌单/专辑/单曲 ID 或搜索关键词
		id: "3326382885",
		// 认证 token（可选）
		auth: "",
		// 备用 API 配置（当主 API 失败时使用）
		fallbackApis: [
			"https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
			"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
		],
	},

	// 本地音乐配置（当 mode 为 'local' 时使用）
	// 歌词配置写在每首歌的 lrc 字段：
	// 1. 支持传入歌词文件的路径，建议把 .lrc 放到 public/assets/music/lrc/ 下
	// lrc: "/assets/music/lrc/使一颗心免于哀伤-哼唱.lrc",
	// 2. 或者直接填入歌词字符串内容
	// lrc: "[00:00.00]歌词内容...",
	// 3. 如果暂时没有歌词，保留空字符串即可，页面会显示“暂无歌词”
	local: {
		playlist: [
			{
				name: "The King Funk",
				artist: "Funk / Bilibili / 梦回夏星miracle",
				url: "https://tu.202685.xyz/file/1786083081196_The_king_Funk.mp3",
				cover: "https://tu.202685.xyz/file/1786083891285_梦回夏星miracle.webp",
				lrc: "",
			},
			{
				name: "Zouzei Funk",
				artist: "Funk / Bilibili / 未知作者",
				url: "https://tu.202685.xyz/file/1786093649644_宏伟.mp3",
				cover: "https://tu.202685.xyz/file/1786088717154_兵王.jpg",
				lrc: "",
			},
			{
				name: "Catch My Breath-Kelly Clarkson",
				artist: "贝爷の小曲 / 我们的旅途结束了,现在该你了",
				url: "https://tu.202685.xyz/file/1786369061494_Catch_My_Breath-Kelly_Clarkson.mp3",
				cover: "https://tu.202685.xyz/file/1786369195760_贝爷.webp",
				lrc: "/assets/music/lrc/Catch My Breath-Kelly Clarkson.lrc",
			},
		],
	},
};
