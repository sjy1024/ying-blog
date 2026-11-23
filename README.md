# 颖的手记

黑白线框风的个人档案与手记博客：项目记录、可筛选的文章列表、明暗主题，以及一枚可交互的浮雕字标。

线上地址（部署中）：https://orz.autos

## 技术栈

- Next.js 16（App Router）+ React 19
- Tailwind CSS v4
- lucide-react 图标
- 全部路由静态生成（SSG），可导出为纯静态文件，由 Caddy / Nginx 直出

## 本地开发

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # 生产构建
pnpm start    # 运行构建产物
```

建议使用 Node.js 24。

## 修改内容

内容都在源码数据文件里，改完重新构建即可：

| 内容 | 文件 |
| --- | --- |
| 个人资料 / 实践 / 联系 | `app/templates/technical-profile/page.tsx` |
| 项目与文章数据 | `app/templates/technical-profile/_data.ts` |
| 品牌 / 导航 / 页脚 | `app/templates/technical-profile/layout.tsx` |
| 主题配色与布局 | `app/templates/technical-profile/_components/field-manual.module.css` |
| 浮雕字标 | `components/templates/relief-mark.tsx` |

详细定制说明见 [CUSTOMIZE.md](./CUSTOMIZE.md)（模板原指南）。

## 致谢与许可

基于 [StyleKit Templates](https://www.stylekit.top/templates) 的开源模板修改而成。
模板版权 Copyright (c) 2026 AnxForever，MIT License，完整条款见 [LICENSE](./LICENSE)。
