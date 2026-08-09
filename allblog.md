# 全博客项目文件结构说明

本文件用于记录当前 Astro 7 + Svelte 博客项目的主要文件路径与作用，方便后续维护、扩展和放置新文件。目录树参考上传图片的写法：左侧展示路径，右侧用中文说明用途。

## 目录排除说明

以下目录是依赖、缓存或构建产物，不纳入主体结构说明：

- `.astro/`：Astro 自动生成的缓存、类型和内容索引文件。
- `dist/`：生产构建输出目录。
- `node_modules/`：依赖安装目录。
- `.git/`：Git 版本库内部数据。
- `.vercel/`、`cache/`、`package/`：部署、缓存或临时产物目录。

## 项目结构

```text
fzf-blog/
├── .github/                                      # GitHub 配置目录
│   ├── ISSUE_TEMPLATE/                           # Issue 模板目录
│   │   ├── 01-bug_report.yml                     # Bug 反馈模板
│   │   ├── 02-feature_request.yml                # 功能建议模板
│   │   └── 03-custom_issue.yml                   # 自定义 Issue 模板
│   ├── workflows/                                # GitHub Actions 工作流
│   │   ├── biome.yml                             # Biome 格式化与检查工作流
│   │   ├── build.yml                             # 项目构建验证工作流
│   │   └── deploy.yml                            # 部署工作流
│   ├── FUNDING.yml                               # GitHub Sponsors 赞助配置
│   ├── dependabot.yml                            # 依赖自动更新配置
│   └── pull_request_template.md                  # Pull Request 模板
├── docs/                                         # 项目文档与展示图片
│   └── images/                                   # README 和文档使用的图片资源
│       ├── sponsor/                              # 赞助二维码图片
│       ├── 1.webp                                # 项目展示图
│       ├── 2.webp                                # 项目展示图
│       ├── 3.webp                                # 项目展示图
│       ├── 4.webp                                # 项目展示图
│       ├── 1131.png                              # README 头图
│       └── Lighthouse.png                        # Lighthouse 评分展示图
├── public/                                       # 静态资源目录，构建时按原路径发布
│   ├── assets/                                   # 页面直接引用的静态资源
│   │   ├── css/                                  # 第三方或自定义静态 CSS
│   │   │   ├── highlight-github-dark.min.css     # 代码高亮暗色样式
│   │   │   └── twikoo-custom.css                 # Twikoo 评论自定义样式
│   │   ├── fonts/                                # 静态字体文件
│   │   │   ├── GreatVibes-Regular-2.otf          # Great Vibes 字体
│   │   │   └── miao.ttf                          # 本地中文字体
│   │   ├── images/                               # 静态图片资源
│   │   │   ├── ad/                               # 广告图片
│   │   │   ├── effects/                          # 页面特效图片，如樱花贴图
│   │   │   └── sponsor/                          # 打赏或赞助相关图片
│   │   └── js/                                   # 第三方静态 JS
│   │       ├── highlight.min.js                  # 代码高亮脚本
│   │       └── marked.min.js                     # Markdown 解析脚本
│   ├── favicon/                                  # 多尺寸站点图标
│   ├── gallery/                                  # 相册静态资源
│   │   ├── encrypted-test/                       # 加密相册示例资源
│   │   └── firefly-2026/                         # Firefly 相册资源
│   ├── pio/                                      # 看板娘模型与播放器资源
│   │   ├── models/                               # Live2D / Spine 模型文件
│   │   │   ├── live2d/                           # Live2D 模型资源
│   │   │   └── spine/                            # Spine 模型、贴图、音频资源
│   │   ├── static/                               # Spine 播放器静态 CSS/JS
│   │   └── README.md                             # 看板娘资源说明
│   └── anime-list.json                           # 番剧或动画列表数据
├── functions/                                    # 部署平台服务端函数目录，不放前端密钥
│   └── api/
│       └── weather.ts                            # 天气服务端代理，读取 QWEATHER_API_KEY 后请求和风天气
├── scripts/                                      # 项目自动化脚本
│   ├── generate-lqips.ts                         # 生成低质量图片占位数据
│   ├── new-dynamic.js                            # 创建动态内容文件
│   ├── new-post.js                               # 创建新博客文章
│   ├── quarantine-bad-posts.mjs                  # 隔离异常文章内容
│   └── subset-fonts.ts                           # 生成字体子集，减少字体体积
├── src/                                          # 项目源码目录
│   ├── assets/                                   # 源码内资源，会被 Astro/Vite 构建处理
│   │   └── images/                               # 源码图片资源
│   │       ├── DesktopWallpaper/                 # 桌面端壁纸图片
│   │       ├── MobileWallpaper/                  # 移动端壁纸图片
│   │       ├── logo/                             # 站点 logo 图片
│   │       └── avatar.avif                       # 用户头像图片
│   ├── components/                               # Astro/Svelte 组件目录，详见 src/components/README.md
│   │   ├── analytics/                            # 网站统计组件
│   │   ├── comment/                              # 评论系统集成组件
│   │   ├── common/                               # 通用可复用组件
│   │   ├── controls/                             # 页面导航与交互控件
│   │   ├── features/                             # 全局功能增强与特效组件
│   │   ├── layout/                               # 页面布局与结构组件
│   │   │   ├── PostPage.astro                    # 首页文章列表容器，控制列表/网格布局切换逻辑
│   │   │   └── PostCard.astro                    # 单篇文章卡片，列表模式下一篇文章占一整行
│   │   ├── misc/                                 # 杂项辅助组件
│   │   ├── pages/                                # 特定页面专用组件
│   │   ├── widget/                               # 侧边栏小部件组件，包含问候、天气、日期、一言、统计等模块
│   │   └── README.md                             # 组件目录分类说明
│   ├── config/                                   # 站点配置目录，详见 src/config/README.md
│   │   ├── FooterConfig.html                     # 页脚自定义 HTML 片段
│   │   ├── README.md                             # 配置文件说明
│   │   ├── analyticsConfig.ts                    # 统计分析配置
│   │   ├── announcementConfig.ts                 # 公告配置
│   │   ├── backgroundWallpaper.ts                # 背景壁纸配置
│   │   ├── booknavConfig.ts                      # 书签导航配置
│   │   ├── commentConfig.ts                      # 评论系统配置
│   │   ├── coverImageConfig.ts                   # 文章封面图配置
│   │   ├── displaySettingsConfig.ts              # 显示设置面板配置
│   │   ├── dynamicConfig.ts                      # 动态页面配置
│   │   ├── effectsConfig.ts                      # 动画特效配置
│   │   ├── expressiveCodeConfig.ts               # 代码高亮配置
│   │   ├── fontConfig.ts                         # 字体配置
│   │   ├── footerConfig.ts                       # 页脚配置
│   │   ├── friendsConfig.ts                      # 友链配置
│   │   ├── galleryConfig.ts                      # 相册配置
│   │   ├── index.ts                              # 配置统一导出入口
│   │   ├── licenseConfig.ts                      # 许可证配置
│   │   ├── mermaidConfig.ts                      # Mermaid 图表配置
│   │   ├── musicConfig.ts                        # 音乐播放器配置
│   │   ├── navBarConfig.ts                       # 导航栏配置
│   │   ├── pioConfig.ts                          # 看板娘配置
│   │   ├── plantumlConfig.ts                     # PlantUML 图表配置
│   │   ├── profileConfig.ts                      # 个人资料配置
│   │   ├── sidebarConfig.ts                      # 侧边栏布局配置，可控制桌面端两列侧栏都在左侧
│   │   ├── siteConfig.ts                         # 站点基础配置
│   │   └── sponsorConfig.ts                      # 打赏赞助配置
│   ├── constants/                                # 常量与生成数据
│   │   ├── constants.ts                          # 项目通用常量
│   │   ├── icon.ts                               # 图标相关常量或导出
│   │   ├── icons-data.json                       # 图标数据
│   │   └── lqips.json                            # 低质量图片占位数据
│   ├── content/                                  # Astro 内容集合目录，由 src/content.config.ts 管理
│   │   ├── dynamic/                              # 动态内容集合，一条动态对应一个 Markdown 文件
│   │   ├── posts/                                # 博客文章集合
│   │   │   ├── guide/                            # 使用指南类文章及配图
│   │   │   ├── images/                           # 文章示例或通用配图
│   │   │   ├── code-examples.md                  # 代码示例文章
│   │   │   ├── draft.md                          # 草稿文章
│   │   │   ├── encrypted-demo.md                 # 加密文章示例
│   │   │   ├── firefly.md                        # Firefly 介绍文章
│   │   │   ├── katex-math-example.md             # KaTeX 数学公式示例文章
│   │   │   ├── markdown-extended.md              # 扩展 Markdown 语法说明
│   │   │   ├── markdown-mermaid.md               # Mermaid 图表示例文章
│   │   │   ├── markdown-plantuml.md              # PlantUML 图表示例文章
│   │   │   ├── markdown-tutorial.md              # Markdown 教程文章
│   │   │   ├── mdx-example.mdx                   # MDX 示例文章
│   │   │   └── video.md                          # 视频内容示例文章
│   │   └── spec/                                 # 特殊页面内容集合
│   │       ├── about.md                          # 关于页面正文
│   │       ├── friends.mdx                       # 友链页面正文
│   │       └── guestbook.md                      # 留言板页面正文
│   ├── i18n/                                     # 国际化语言与翻译工具
│   │   ├── languages/                            # 多语言文案文件
│   │   │   ├── en.ts                             # 英文文案
│   │   │   ├── ja.ts                             # 日文文案
│   │   │   ├── ko.ts                             # 韩文文案
│   │   │   ├── ru.ts                             # 俄文文案
│   │   │   ├── zh_CN.ts                          # 简体中文文案
│   │   │   └── zh_TW.ts                          # 繁体中文文案
│   │   ├── i18nKey.ts                            # 国际化键名定义
│   │   └── translation.ts                        # 翻译读取与匹配工具
│   ├── layouts/                                  # 页面布局组件
│   │   ├── Layout.astro                          # 全局基础布局
│   │   └── MainGridLayout.astro                  # 主网格布局
│   ├── pages/                                    # Astro 文件路由目录
│   │   ├── api/                                  # API 输出路由
│   │   │   ├── allPostMeta.json.ts               # 输出文章元数据 JSON
│   │   │   └── dynamic.json.ts                   # 输出动态内容 JSON
│   │   ├── categories/                           # 分类页路由目录
│   │   ├── dynamic/                              # 动态页相关路由
│   │   ├── gallery/                              # 相册页相关路由
│   │   ├── og/                                   # Open Graph 图片生成路由
│   │   ├── posts/                                # 博客文章详情动态路由
│   │   ├── tags/                                 # 标签页路由目录
│   │   ├── 404.astro                             # 404 页面
│   │   ├── [...page].astro                       # 首页分页动态路由
│   │   ├── about.astro                           # 关于页面
│   │   ├── anime.astro                           # 动画页面
│   │   ├── archive.astro                         # 文章归档页面
│   │   ├── bangumi.astro                         # 番组页面
│   │   ├── booknav.astro                         # 书签导航页面
│   │   ├── friends.astro                         # 友链页面
│   │   ├── guestbook.astro                       # 留言板页面
│   │   ├── robots.txt.ts                         # robots.txt 输出
│   │   ├── rss.astro                             # RSS 页面或入口
│   │   ├── rss.xml.ts                            # RSS XML 输出
│   │   ├── search.astro                          # 搜索页面
│   │   └── sponsor.astro                         # 赞助页面
│   ├── plugins/                                  # Markdown / HTML 渲染插件
│   │   ├── utils/                                # 插件共用工具
│   │   ├── diagram-panzoom-script.js             # 图表缩放脚本
│   │   ├── plantuml-encoder.js                   # PlantUML 编码工具
│   │   ├── plantuml-render-script.js             # PlantUML 渲染脚本
│   │   ├── plantuml-theme-switch.js              # PlantUML 主题切换脚本
│   │   ├── rehype-component-github-card.mjs      # GitHub 卡片 rehype 组件
│   │   ├── rehype-diagram-panzoom.mjs            # 图表缩放 rehype 插件
│   │   ├── rehype-email-protection.mjs           # 邮箱保护 rehype 插件
│   │   ├── rehype-external-links.mjs             # 外链处理 rehype 插件
│   │   ├── rehype-figure.mjs                     # 图片 figure 包装插件
│   │   ├── rehype-image-referrerpolicy.mjs       # 图片 referrer 策略插件
│   │   ├── rehype-mermaid.mjs                    # Mermaid rehype 渲染插件
│   │   ├── rehype-plantuml.mjs                   # PlantUML rehype 渲染插件
│   │   ├── remark-directive-rehype.js            # remark directive 转 rehype 工具
│   │   ├── remark-excerpt.js                     # 摘要提取 remark 插件
│   │   ├── remark-image-grid.js                  # 图片网格 remark 插件
│   │   ├── remark-mermaid.js                     # Mermaid remark 插件
│   │   ├── remark-plantuml.js                    # PlantUML remark 插件
│   │   ├── remark-reading-time.mjs               # 阅读时间计算插件
│   │   └── remark-wiki-link.js                   # Wiki 链接解析插件
│   ├── styles/                                   # 全局样式与页面样式
│   │   ├── anime-bangumi.css                     # 动画和番组页面样式
│   │   ├── banner-title.css                      # Banner 标题样式
│   │   ├── categories.css                        # 分类页面样式
│   │   ├── custom-scrollbar.css                  # 自定义滚动条样式
│   │   ├── display-settings.css                  # 显示设置面板样式
│   │   ├── dynamic.css                           # 动态页面样式
│   │   ├── expressive-code.css                   # 代码块样式覆盖
│   │   ├── fancybox-custom.css                   # Fancybox 图片查看器样式
│   │   ├── gallery.css                           # 相册页面样式
│   │   ├── layout-styles.css                     # 布局相关样式
│   │   ├── main.css                              # 主样式入口
│   │   ├── markdown-extend.styl                  # Markdown 扩展样式
│   │   ├── markdown.css                          # Markdown 正文样式
│   │   ├── navbar.css                            # 导航栏样式
│   │   ├── photoswipe.css                        # PhotoSwipe 图片查看样式
│   │   ├── scrollbar.css                         # 滚动条基础样式
│   │   ├── tags.css                              # 标签页面样式
│   │   ├── toc.css                               # 目录样式
│   │   ├── transition.css                        # 页面切换动画样式
│   │   ├── variables.styl                        # Stylus 变量
│   │   ├── waves.css                             # 波纹效果样式
│   │   └── widget-responsive.css                 # 小部件响应式样式
│   ├── types/                                    # TypeScript 类型定义
│   │   ├── analyticsConfig.ts                    # 统计配置类型
│   │   ├── anime.ts                              # 动画数据类型
│   │   ├── announcementConfig.ts                 # 公告配置类型
│   │   ├── backgroundWallpaper.ts                # 背景壁纸配置类型
│   │   ├── bangumi.ts                            # 番组数据类型
│   │   ├── booknavConfig.ts                      # 书签导航配置类型
│   │   ├── commentConfig.ts                      # 评论配置类型
│   │   ├── config.ts                             # 通用配置类型
│   │   ├── coverImageConfig.ts                   # 封面图配置类型
│   │   ├── displaySettingsConfig.ts              # 显示设置配置类型
│   │   ├── dynamicConfig.ts                      # 动态配置类型
│   │   ├── effectsConfig.ts                      # 特效配置类型
│   │   ├── expressiveCodeConfig.ts               # 代码高亮配置类型
│   │   ├── fontConfig.ts                         # 字体配置类型
│   │   ├── footerConfig.ts                       # 页脚配置类型
│   │   ├── friendsConfig.ts                      # 友链配置类型
│   │   ├── galleryConfig.ts                      # 相册配置类型
│   │   ├── iconify-svelte-offline.d.ts           # Iconify Svelte 离线类型声明
│   │   ├── licenseConfig.ts                      # 许可证配置类型
│   │   ├── mermaidConfig.ts                      # Mermaid 配置类型
│   │   ├── musicConfig.ts                        # 音乐配置类型
│   │   ├── navBarConfig.ts                       # 导航栏配置类型
│   │   ├── pioConfig.ts                          # 看板娘配置类型
│   │   ├── profileConfig.ts                      # 个人资料配置类型
│   │   ├── sakura-worker.ts                      # 樱花 Worker 类型
│   │   ├── sidebarConfig.ts                      # 侧边栏配置类型
│   │   ├── siteConfig.ts                         # 站点配置类型
│   │   └── sponsorConfig.ts                      # 赞助配置类型
│   ├── utils/                                    # 工具函数目录
│   │   ├── booknav-utils.ts                      # 书签导航工具
│   │   ├── build-platform.ts                     # 构建平台判断工具
│   │   ├── content-utils.ts                      # 内容集合处理工具
│   │   ├── crypto-utils.ts                       # 加密相关工具
│   │   ├── date-utils.ts                         # 日期格式化工具
│   │   ├── display-settings-utils.ts             # 显示设置工具
│   │   ├── dynamic-utils.ts                      # 动态内容工具
│   │   ├── fetch-dedup.ts                        # 请求去重工具
│   │   ├── floating-panel-utils.ts               # 浮动面板工具
│   │   ├── fontHelper.ts                         # 字体配置辅助工具
│   │   ├── gallery-utils.ts                      # 相册工具
│   │   ├── icon-loader.ts                        # 图标加载工具
│   │   ├── image-utils.ts                        # 图片处理工具
│   │   ├── language-utils.ts                     # 语言处理工具
│   │   ├── layout-utils.ts                       # 布局计算工具
│   │   ├── lqip-utils.ts                         # 低质量图片占位工具
│   │   ├── memos-adapter.ts                      # Memos 数据适配工具
│   │   ├── navigation-utils.ts                   # 导航工具
│   │   ├── responsive-utils.ts                   # 响应式工具，生成正文与侧边栏网格布局类
│   │   ├── setting-utils.ts                      # 设置读取工具
│   │   ├── toc-shared.ts                         # 目录共享逻辑
│   │   ├── toc-utils.ts                          # 目录生成工具
│   │   └── url-utils.ts                          # URL 处理工具
│   ├── workers/                                  # Web Worker 脚本
│   │   └── sakura.worker.ts                      # 樱花特效 Worker
│   ├── content.config.ts                         # Astro Content Collections 配置
│   ├── env.d.ts                                  # Astro 环境类型声明
│   └── global.d.ts                               # 全局类型声明
├── .gitattributes                                # Git 文件属性配置
├── .gitignore                                    # Git 忽略规则
├── .npmrc                                        # npm/pnpm 配置
├── AGENTS.md                                     # 仓库协作与代理工作规范
├── CLAUDE.md                                     # Claude 相关项目说明
├── CONTRIBUTING.md                               # 贡献指南
├── LICENSE                                       # 项目许可证
├── README.md                                     # 简体中文项目说明
├── README.en.md                                  # 英文项目说明
├── README.ja.md                                  # 日文项目说明
├── README.zh-TW.md                               # 繁体中文项目说明
├── _frontmatter.json                             # Markdown frontmatter 辅助配置
├── astro.config.mjs                              # Astro 站点、集成、Markdown 插件和构建配置
├── biome.json                                    # Biome 格式化与检查配置
├── package.json                                  # 项目脚本、依赖和包管理器配置
├── pagefind.yml                                  # Pagefind 搜索索引配置
├── pnpm-lock.yaml                                # pnpm 依赖锁定文件
├── postcss.config.mjs                            # PostCSS 配置
├── svelte.config.js                              # Svelte 配置
├── tsconfig.json                                 # TypeScript 配置与路径别名
├── vercel.json                                   # Vercel 部署配置
└── wrangler.jsonc                                # Cloudflare Workers 部署配置
```

## 重点目录说明

### `src/content`

`src/content/` 是 Astro Content Collections 的固定内容入口，目前由 `src/content.config.ts` 管理。`posts/` 用于博客文章，`spec/` 用于关于、友链、留言板等特殊页面正文，`dynamic/` 用于动态内容。

不要随意把这些目录移动到 `docs/` 或 `public/`。如果移动，需要同步修改 `src/content.config.ts`、内容读取逻辑、路由和脚本。

### `src/pages`

`src/pages/` 是 Astro 文件路由目录，文件路径会影响站点访问路径。例如 `src/pages/about.astro` 对应关于页面，`src/pages/posts/[...slug].astro` 对应文章详情动态路由。

整理结构时不建议重命名或移动 `src/pages/` 内的路由目录，除非同时确认页面路径、导航配置、RSS、搜索和站点地图都能正常工作。

### `src/components`

`src/components/` 已按功能分组，当前分类比较清晰。通用组件放在 `common/`，布局组件放在 `layout/`，页面专用组件放在 `pages/`，全局功能增强放在 `features/`，侧边栏小部件放在 `widget/`。

更详细的组件职责说明见 `src/components/README.md`。新增组件时优先放入现有分类，避免重复创建含义相近的新目录。

### `src/config`

`src/config/` 是站点配置中心，`index.ts` 负责统一导出配置。配置模块通常与 `src/types/` 中的类型定义对应，修改配置结构时应同步检查类型文件。

更详细的配置说明见 `src/config/README.md`。新增配置文件建议使用 `camelCaseConfig.ts` 命名，并从 `src/config/index.ts` 统一导出。

`src/config/sidebarConfig.ts` 中的 `position: "both"` 保持两套侧边栏配置，`leftComponents` 和 `rightComponents` 仍然独立控制各自组件。当前 `desktopSidebarPlacement: "left"` 表示大屏下将两列侧边栏都放在正文左侧，形成“左侧栏组件列 + 右侧栏组件列 + 正文”的布局；平板和移动端仍按响应式规则显示，不会把两列侧边栏合并成单列。

当前新增的侧边栏模块集中放在 `src/components/widget/`：`TimeGreeting.astro` 是带时间和图片预留位的问候卡片，`WeatherForecast.astro` 是可展开/收起的天气预报卡片，`DateProgress.astro` 是日期进度与节日倒计时，`DailyQuote.astro` 是今日一言，`VisitStats.astro` 是浏览数据统计。图片链接、天气 API、浏览统计 API、自定义纪念日和句子库都在 `src/config/sidebarConfig.ts` 对应组件的 `customProps` 中修改。

天气模块的前端只请求站内 `/api/weather`，真实和风天气密钥由 `functions/api/weather.ts` 在服务端读取 `QWEATHER_API_KEY` 环境变量。不要把和风天气 Key 写入 `src/config/sidebarConfig.ts`、组件文件或任何 `PUBLIC_` 前缀环境变量；本地开发使用 `.dev.vars` 保存密钥，该文件已被 `.gitignore` 忽略。天气优先使用部署平台提供的访问者经纬度自动查询；如果平台无法提供位置，只有显式配置了 `QWEATHER_LOCATION` 才会使用备用城市或经纬度，否则接口返回失败，前端显示“未知/--”，不会展示固定模板城市。

浏览统计模块 `VisitStats.astro` 通过 `src/config/sidebarConfig.ts` 中的 `visitStats.customProps` 接入统计服务。当前配置使用 Waline 的 `/api/article` 按当前页面路径读取浏览量，因此会随真实访问数据变化；如果未配置接口、接口异常或统计服务不可用，组件显示“-- / 统计数据未知”，不会再使用本地示例浏览量、示例访问数或示例访客数，避免把模板数据误认为真实站点数据。

时间问候模块的图片在 `src/config/sidebarConfig.ts` 的 `timeGreeting.customProps.greetingImages` 中维护，当前已按“黎明、早晨、上午、中午、下午、晚上、深夜”填入图床链接。`src/components/widget/TimeGreeting.astro` 会根据访问者当前时间自动切换问候文案和对应图片。

日期进度模块已改为自动节日模式。`src/components/widget/DateProgress.astro` 会扫描未来日期，自动匹配常见公历节日和农历节日（如春节、元宵、端午、中秋、重阳等），不再需要每年手动修改中秋日期；如需添加生日或纪念日，在 `src/config/sidebarConfig.ts` 的 `dateProgress.customProps.festivals` 中追加 `{ name: "纪念日", date: "YYYY-MM-DD" }` 即可。

今日一言模块 `DailyQuote.astro` 会从 `dailyQuote.customProps.quotes` 中随机选取句子展示，刷新页面或重新进入页面时可能变化；它不会联网拉取个人信息。想固定某一句或扩充句库，直接维护 `src/config/sidebarConfig.ts` 的 `quotes` 数组即可。

首页文章列表由 `src/config/siteConfig.ts` 的 `postListLayout` 控制。当前默认使用 `defaultMode: "list"` 和 `mobileDefaultMode: "list"`，文章会以一条一条的列表形式显示；`src/components/layout/PostPage.astro` 只在设置面板允许布局切换时读取用户保存的布局偏好，避免旧的网格偏好覆盖默认列表样式。

### `src/assets` 与 `public`

`src/assets/` 放源码内资源，适合被 Astro/Vite 构建处理或通过 import 引用。`public/` 放静态直出资源，构建后会按原路径访问，适合 favicon、第三方静态脚本、字体、模型、相册原始资源等。

简单判断规则：需要在组件或脚本里 import 的资源放 `src/assets/`；需要通过 `/assets/...`、`/favicon/...`、`/pio/...` 直接访问的资源放 `public/`。

### `scripts`

`scripts/` 存放项目维护脚本。`new-post.js` 和 `new-dynamic.js` 用于创建内容，`generate-lqips.ts` 和 `subset-fonts.ts` 参与构建优化，`quarantine-bad-posts.mjs` 用于处理异常文章。

新增脚本应放在 `scripts/`，并在 `package.json` 中添加对应命令，方便统一调用。

## 新增文件放置规则

- 新博客文章放入 `src/content/posts/`。
- 动态内容放入 `src/content/dynamic/`。
- 关于、友链、留言板等特殊页面正文放入 `src/content/spec/`。
- 页面路由放入 `src/pages/`。
- 页面级专用组件放入 `src/components/pages/`。
- 多页面复用组件放入 `src/components/common/` 或更贴近职责的现有组件目录。
- 全局功能增强组件放入 `src/components/features/`。
- 侧边栏组件放入 `src/components/widget/`。
- 第三方评论或统计集成组件分别放入 `src/components/comment/`、`src/components/analytics/`。
- 站点配置放入 `src/config/`，并同步维护 `src/types/` 中的类型定义。
- 可被构建处理的图片放入 `src/assets/`。
- 需要按原路径直接发布的静态资源放入 `public/`。
- Markdown / HTML 渲染插件放入 `src/plugins/`。
- 自动化脚本放入 `scripts/`。
- 项目说明文档和展示图片放入 `docs/`，根目录只保留 README、配置、许可证和总览类文件。

## 维护注意事项

- `src/content/posts/`、`src/content/spec/`、`src/content/dynamic/` 受 `src/content.config.ts` 约束，移动前必须同步修改集合配置。
- `src/pages/` 使用 Astro 文件路由，移动或重命名文件会改变页面路径。
- `tsconfig.json` 中的路径别名都指向 `src` 体系，调整目录后需要同步修改别名和 import。
- `src/config/` 和 `src/types/` 应保持对应关系，新增配置时不要只改配置文件。
- 侧边栏布局由 `src/config/sidebarConfig.ts` 和 `src/utils/responsive-utils.ts` 共同控制；调整侧边栏位置时，应同步检查大屏、平板和移动端显示效果。
- 首页文章列表样式由 `src/config/siteConfig.ts`、`src/components/layout/PostPage.astro` 和 `src/components/layout/PostCard.astro` 共同控制；如果希望始终保持“一条一条”的样式，应保持 `postListLayout.defaultMode` 为 `list`。
- `.astro/`、`dist/`、`node_modules/` 不需要人工整理，也不应提交到结构文档主体中。
- 图片、模型、音频和字体等二进制资源可以按目录概括说明，不建议在文档中逐个列出每个素材文件。
