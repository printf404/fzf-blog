# 整理项目文件结构与创建 allblog.md 实施计划

## Summary

本计划用于后续执行“整理并优化文件结构，并在项目根目录创建 `allblog.md`”的任务。根据当前项目实际结构，建议本次优化以“结构梳理与文档化”为主：保持 Astro、Svelte、内容集合、路径别名和静态资源目录不变，在根目录新增 `allblog.md`，用上传图片类似的树状目录格式记录主要文件路径与作用，并补充新增文件放置规则。

本次不建议批量移动源码文件。当前项目的核心目录已经符合 Astro 项目约定，直接迁移会影响 `src/pages` 路由、`src/content` 内容集合、`tsconfig.json` 路径别名、构建脚本和静态资源引用。

## Current State Analysis

项目是 Astro 7 + Svelte 博客站点，使用 `pnpm` 管理依赖。根目录包含 `package.json`、`astro.config.mjs`、`tsconfig.json`、`biome.json`、`pagefind.yml`、`svelte.config.js`、`postcss.config.mjs`、`wrangler.jsonc`、`vercel.json`、多语言 README、`docs/`、`public/`、`scripts/` 和 `src/`。

`src/content.config.ts` 明确将内容集合固定在以下目录：

- `src/content/posts/`：博客文章集合，匹配 `**/*.{md,mdx}`。
- `src/content/spec/`：特殊页面内容集合，匹配 `**/*.{md,mdx}`。
- `src/content/dynamic/`：动态内容集合，匹配 `**/*.md`。

`tsconfig.json` 中的路径别名指向 `src` 体系：

- `@components/*` 指向 `src/components/*`。
- `@assets/*` 指向 `src/assets/*`。
- `@constants/*` 指向 `src/constants/*`。
- `@utils/*` 指向 `src/utils/*`。
- `@i18n/*` 指向 `src/i18n/*`。
- `@layouts/*` 指向 `src/layouts/*`。
- `@/*` 指向 `src/*`。

`public/` 是静态资源目录，包含 `assets/`、`favicon/`、`gallery/`、`pio/` 等资源。该目录中的文件会按原路径发布，适合放置第三方静态 JS/CSS、字体、favicon、相册资源、Live2D/Spine 模型等不需要经过源码构建管线处理的文件。

`src/assets/` 是源码内资源目录，目前主要包含图片资源，例如桌面壁纸、移动端壁纸、logo 和头像。此类资源由 Astro/Vite 构建处理，不应与 `public/` 的静态直出资源混淆。

`src/components/README.md` 已经详细说明组件分类，包括 `analytics/`、`comment/`、`common/`、`controls/`、`features/`、`layout/`、`misc/`、`pages/`、`widget/`。`src/config/README.md` 已经详细说明配置文件结构和每个配置模块的用途。因此 `allblog.md` 应提供全局总览并引用这些已有说明，不应复制大量重复内容。

`.gitignore` 已排除 `dist/`、`.astro/`、`node_modules/`、`.vercel/`、`Firefly-docs/`、`Firefly-Lite/`、`cache/`、`package/`、`.obsidian/` 等目录或文件。其中 `.astro/` 是 Astro 生成缓存，`dist/` 是构建产物，`node_modules/` 是依赖目录，均不应列入 `allblog.md` 的主体结构。

上传图片的目标格式是“标题 + 代码块树状目录 + 每行中文注释”，例如：

```text
src/
├── config/
│   ├── index.ts                     # 配置索引文件
│   ├── siteConfig.ts                # 站点基础配置
│   └── ...
```

## Proposed Changes

### `allblog.md`

新增位置：项目根目录 `allblog.md`。

作用：作为全项目文件结构索引，集中说明主要文件和目录的路径、职责、放置规则和维护注意事项。

写法：

- 使用中文。
- 使用 Markdown。
- 使用类似上传图片的树状目录代码块。
- 每个重要目录或文件后使用 `#` 添加中文作用说明。
- 对深层媒体资源、模型贴图、字体文件、图片文件进行概括，不逐一展开所有二进制资源，避免文档过长。
- 排除 `.astro/`、`dist/`、`node_modules/` 等生成目录和依赖目录。
- 对 `src/config/` 与 `src/components/` 做总览，并提示详见已有 README。

建议内容结构：

```md
# 全博客项目文件结构说明

本文件按树状目录列出项目主要文件路径与作用，方便维护 Astro 7 + Svelte 博客项目。

## 目录排除说明

- `.astro/`：Astro 生成缓存和类型文件。
- `dist/`：构建输出目录。
- `node_modules/`：依赖安装目录。

## 项目结构

```text
fzf-blog/
├── src/                              # 项目源码目录
│   ├── content.config.ts             # Astro Content Collections 配置
│   ├── content/                      # 内容集合目录，由 src/content.config.ts 管理
│   ├── pages/                        # Astro 路由页面目录
│   ├── layouts/                      # 页面布局组件
│   ├── components/                   # Astro/Svelte 组件，详见 src/components/README.md
│   ├── config/                       # 站点配置，详见 src/config/README.md
│   ├── styles/                       # 全局样式与功能样式
│   ├── utils/                        # 工具函数
│   ├── types/                        # TypeScript 类型定义
│   ├── plugins/                      # Markdown/HTML 渲染插件
│   ├── assets/                       # 源码内资源，由构建工具处理
│   ├── constants/                    # 常量与生成数据
│   ├── i18n/                         # 国际化语言包与翻译工具
│   └── workers/                      # Web Worker 脚本
├── public/                           # 静态资源目录，构建时按原路径发布
├── scripts/                          # 自动化脚本
├── docs/                             # 项目说明文档和文档图片
├── package.json                      # 项目脚本、依赖和 pnpm 配置
├── astro.config.mjs                  # Astro 站点、集成、Markdown 插件和构建配置
├── tsconfig.json                     # TypeScript 配置和路径别名
├── biome.json                        # Biome 格式化和检查配置
├── pagefind.yml                      # Pagefind 搜索配置
├── svelte.config.js                  # Svelte 配置
├── postcss.config.mjs                # PostCSS 配置
├── wrangler.jsonc                    # Cloudflare Workers 部署配置
└── vercel.json                       # Vercel 部署配置
```

## 重点目录说明

## 新增文件放置规则
```

需要重点展开的目录：

- `src/content/`：展开到 `posts/`、`spec/`、`dynamic/`，说明这些目录受 `src/content.config.ts` 管理。
- `src/pages/`：展开主要路由文件和 `api/`、`posts/`、`categories/`、`tags/`、`gallery/`、`dynamic/` 等子目录。
- `src/config/`：列出主要配置文件，但不复制 `src/config/README.md` 的全部内容。
- `src/components/`：列出组件分类目录，并说明详细分类见 `src/components/README.md`。
- `public/`：展开 `assets/`、`favicon/`、`gallery/`、`pio/`，说明静态直出用途。
- `scripts/`：列出生成 LQIP、创建文章、创建动态、字体子集等脚本。
- 根目录配置文件：说明每个配置文件的作用。

可概括的目录：

- `public/pio/models/spine/firefly/images/`：模型贴图资源很多，写成“Spine 模型贴图资源”即可。
- `src/assets/images/DesktopWallpaper/` 与 `src/assets/images/MobileWallpaper/`：写成“桌面/移动端壁纸图片资源”即可。
- `docs/images/`：写成“README 与文档展示图片”即可。
- `public/favicon/`：写成“多尺寸 favicon 图标”即可。

### `src/content/`

不移动，只在 `allblog.md` 中说明其职责。

原因：`src/content.config.ts` 已将集合加载入口固定为 `src/content/posts`、`src/content/spec`、`src/content/dynamic`。移动这些目录会导致内容集合失效，需要同步修改 loader、路由读取逻辑和相关脚本。

### `src/pages/`

不移动，只在 `allblog.md` 中说明其职责。

原因：Astro 使用文件路由，`src/pages` 下的文件和目录决定站点页面路径。移动或重命名会改变路由行为。

### `src/components/`

不移动，只在 `allblog.md` 中列出组件分类目录。

原因：该目录已经按职责划分为 `layout/`、`controls/`、`common/`、`widget/`、`features/`、`pages/`、`comment/`、`analytics/`、`misc/` 等，并且已有 `src/components/README.md`。后续新增组件应遵循已有分类，而不是新建重复分类。

### `src/config/`

不移动，只在 `allblog.md` 中列出配置模块。

原因：`src/config/index.ts` 是统一导出入口，`astro.config.mjs` 和源码多处通过配置模块读取站点设置。配置文件与 `src/types/` 下类型定义对应，移动时需要同步修改导入和类型引用，本次不做。

### `src/assets/` 与 `public/`

在 `allblog.md` 中明确两者边界。

规则：

- 需要被 Astro/Vite 处理、可通过源码 import 引用的资源放入 `src/assets/`。
- 需要按原路径直接访问的静态资源放入 `public/`。
- 不在本次计划中迁移资源，避免破坏图片路径、模型路径、字体路径和配置引用。

### `scripts/`

不移动，只在 `allblog.md` 中说明每个脚本的用途。

需要说明：

- `generate-lqips.ts`：生成低质量图片占位数据。
- `new-post.js`：创建新博客文章。
- `new-dynamic.js`：创建动态内容。
- `quarantine-bad-posts.mjs`：隔离异常文章。
- `subset-fonts.ts`：生成字体子集。

### 根目录配置文件

不移动，只在 `allblog.md` 中说明作用。

需要覆盖：

- `package.json`：脚本、依赖、包管理器配置。
- `pnpm-lock.yaml`：pnpm 锁定依赖版本。
- `astro.config.mjs`：Astro 集成、Markdown 插件、字体、构建等配置。
- `tsconfig.json`：TypeScript 编译配置与路径别名。
- `biome.json`：格式化和 lint 配置。
- `pagefind.yml`：搜索索引配置。
- `svelte.config.js`：Svelte 集成配置。
- `postcss.config.mjs`：PostCSS 配置。
- `wrangler.jsonc`：Cloudflare Workers 部署配置。
- `vercel.json`：Vercel 部署配置。
- `_frontmatter.json`：编辑器或内容 frontmatter 配置。
- `.gitignore`：Git 忽略规则。
- `.gitattributes`：Git 属性规则。
- `.npmrc`：npm/pnpm 行为配置。
- `AGENTS.md`、`CLAUDE.md`、`CONTRIBUTING.md`、`LICENSE`、多语言 README：项目协作、说明和许可文档。

## Assumptions & Decisions

- 用户要求“类似上图”，理解为 `allblog.md` 需要采用树状目录加中文注释的格式，而不是生成图片或网页。
- 用户要求“存储所有文件的路径与作用”，执行时应尽量覆盖项目主要源码、配置、文档、脚本和静态资源路径；对大量媒体资源可按目录概括，避免生成难维护的超长清单。
- 用户要求“整理并优化文件结构”，本计划将“优化”解释为建立清晰的结构文档和新增文件放置规则，不做批量移动。理由是当前项目已按 Astro 约定组织，移动核心目录会引入较高风险。
- 根目录必须新增 `allblog.md`，不放入 `docs/`，因为用户明确要求在根目录创建。
- `allblog.md` 应保持中文输出。
- `.astro/`、`dist/`、`node_modules/` 不纳入结构主体，因为它们分别是生成缓存、构建产物和依赖目录。
- 不删除或合并 `src/config/README.md`、`src/components/README.md`，只在 `allblog.md` 中引用它们。
- 如果后续执行者发现必须移动文件，应先暂停并确认，因为这会超出当前文档化整理方案，并需要同步修改 import、路由、配置、脚本和构建验证。

## Verification steps

执行完成后检查：

1. 根目录存在 `allblog.md`。
2. `allblog.md` 使用中文说明。
3. `allblog.md` 包含树状目录代码块，格式接近上传图片。
4. `allblog.md` 覆盖根目录、`src/`、`public/`、`scripts/`、`docs/` 和主要配置文件。
5. `allblog.md` 明确排除 `.astro/`、`dist/`、`node_modules/`。
6. `allblog.md` 明确说明 `src/content/posts`、`src/content/spec`、`src/content/dynamic` 是 Astro 内容集合入口。
7. `allblog.md` 明确说明 `src/assets/` 与 `public/` 的区别。
8. `allblog.md` 明确说明 `src/config/README.md` 和 `src/components/README.md` 已有更详细说明。
9. 确认除 `allblog.md` 外未修改业务代码和配置文件。
10. 如执行阶段只新增文档，可不强制运行构建；如进行了任何结构移动或 import 调整，应运行 `pnpm check`、`pnpm type-check` 和 `pnpm build`。
