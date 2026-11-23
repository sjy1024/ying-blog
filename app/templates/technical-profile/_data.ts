export type FieldNoteCategory = "实践" | "系统" | "手记";

export type FieldNote = {
  slug: string;
  title: string;
  category: FieldNoteCategory;
  date: string;
  readingTime: string;
  excerpt: string;
  paragraphs: string[];
  takeaway: string;
};

export const FIELD_NOTE_CATEGORIES = [
  "全部",
  "实践",
  "系统",
  "手记",
] as const;

export const FIELD_NOTES: FieldNote[] = [
  {
    slug: "https-before-firewall",
    title: "HTTPS 打不开，先别怀疑防火墙",
    category: "手记",
    date: "2026-11-22",
    readingTime: "4 分钟",
    excerpt:
      "第一次从外网拉 HTTPS 失败，真正的原因不是端口被拦，而是证书还没签完。",
    paragraphs: [
      "给个人站点切 HTTPS 时，第一次从外网拉 https 失败了。我的第一反应是「443 没放行，去控制台加规则」。幸好先没动手——真正的原因是证书还没签发：没有证书的服务端，TLS 握手必然失败，表现和端口被拦一模一样。",
      "区分方法要按证据顺序来：先在本机用 openssl s_client 看服务端能不能拿出证书；本机有证书而外网仍连不上，才轮到查防火墙。本机通也不等于外网通——本机 curl 走的是回环，证明不了入站规则，最后要从手机 4G 再验一次才算数。",
      "Caddy 的管理接口让这次验证做到了零副作用：它只监听本机，可以临时挂一个 :443 探测站点，先快照运行中的配置，测完删除，再逐字节比对确认还原。证书大约三分钟签好，现有站点全程无感。排错时别急着怀疑防火墙，先问证书到位了没有。",
    ],
    takeaway:
      "排错按证据的顺序来：先本机后外网，先证书后防火墙。",
  },
  {
    slug: "ruoyi-graduation-notes",
    title: "在 RuoYi 上做毕设：基座给的是边界，不是答案",
    category: "实践",
    date: "2026-11-20",
    readingTime: "4 分钟",
    excerpt:
      "开源基座解决了系统管理和鉴权，但毕设真正的工作量在业务边界和诚实的文档里。",
    paragraphs: [
      "毕设做春联定制与售卖小程序，后端基座选了 RuoYi-Vue。它开箱即用地给了用户、角色、菜单管理和 JWT 鉴权，还有代码生成器——从零写最花时间的部分都有了。但真正开始做业务才发现：基座给的是边界，不是答案。",
      "花时间的部分都在基座之外：春联定制要服务端实时报价，提交后返回排队号和预计完成时间；定制单要流转「待接单 / 制作中 / 已完成」；业务表要和系统表分开，升级基座时才互不干扰。这些没有现成答案，得自己把状态机想清楚。",
      "另一个教训是把限制诚实写进 README：支付是模拟支付，库存先查后改没有加锁、高并发可能超卖，小程序端用 deviceId 匿名访问、校验偏弱。写清楚这些不是丢人的事，而是告诉未来的自己和复用代码的人：边界在哪里。",
    ],
    takeaway:
      "用开源基座省下的时间，要花在业务边界和诚实的文档上。",
  },
  {
    slug: "ai-fallback-design",
    title: "AI 功能要设计降级，而不是祈祷服务在线",
    category: "系统",
    date: "2026-11-12",
    readingTime: "3 分钟",
    excerpt:
      "把大模型当成会掉线的外部依赖：降级路径才是功能的本体，模型回复只是它的最好情况。",
    paragraphs: [
      "春联商城里有个 AI 助手：对话咨询、按主题一键生成春联，生成后还能一键填入定制单。它走 OpenAI 兼容接口，默认接 DeepSeek 云端，也可以切到本地 Ollama。实现时最重要的设计不是提示词，而是降级：模型服务不可用时，自动回退到关键词与本地模板模式，功能不中断，只是回复质量下降。",
      "管理端的助手更进一步：SSE 流式对话，自动把订单和库存摘要注入上下文，会话落库。这样模型不用猜业务数据，系统把当前事实递给它，回答才有依据。",
      "回头看，把大模型当成「保证在线」的能力是最危险的假设。API Key 会过期，额度会用完，本地模型会起不来，任何一种都会让功能瘫痪。先设计降级路径，再接模型，功能在最坏的那天也站得住。",
    ],
    takeaway:
      "先设计降级路径，再接模型；功能要在最坏的那天也站得住。",
  },
];

export type Project = {
  number: string;
  title: string;
  field: string;
  year: string;
  summary: string;
  challenge: string;
  approach: string;
  result: string;
  tools: string[];
  repo?: string;
};

export const PROJECTS: Project[] = [
  {
    number: "01",
    title: "春联定制与售卖小程序",
    field: "毕业设计 · 前后端分离商城",
    year: "2026",
    summary:
      "「线上售卖 + 春联定制 + AI 辅助」一体化商城：微信小程序面向消费者，RuoYi 管理后台面向商家，Spring Boot 后端统一提供 REST API。",
    challenge:
      "一个课题要同时覆盖三端：消费者想免注册即用，春联定制要实时报价并跟踪制作进度，AI 生成要在模型服务不稳定时依然可用。",
    approach:
      "后端以 RuoYi-Vue（Spring Boot + MyBatis + Redis）为基座，小程序用原生 + TDesign，以 deviceId 免登录；定制单服务端实时报价，返回排队号与预计完成时间；AI 走 OpenAI 兼容接口（DeepSeek / 本地 Ollama），不可用时自动降级为关键词与本地模板模式。",
    result:
      "完成商品、购物车、订单、地址、定制与 AI 助手全流程，管理端含定制进度流转与 ECharts 数据看板；README 如实标注模拟支付、库存未加锁等教学演示边界。",
    tools: ["Spring Boot", "RuoYi-Vue", "微信小程序", "TDesign", "Vue 2 / Element UI", "MySQL / Redis", "DeepSeek / Ollama"],
    repo: "https://github.com/sjy1024/SpringFestivalCoupletsSalesSystembaseRuoyi",
  },
  {
    number: "02",
    title: "ying-blog · 个人博客",
    field: "个人站点 · 搭建中",
    year: "2026",
    summary:
      "本站的源码仓库：黑白线框风的个人档案与手记博客，Next.js + Tailwind CSS 构建，计划静态部署到 orz.autos。",
    challenge:
      "想要一个安静、易读的个人站点：项目和文章方便扫读，明暗主题都舒适，还要能在 2 核 2G 的小服务器上运行，不额外增加常驻进程。",
    approach:
      "基于 MIT 许可的开源模板替换全部内容并中文化；内容由数据文件驱动，文章静态生成，整站可导出为纯静态文件交给 Caddy 直出，不新增端口与常驻服务。",
    result:
      "档案、项目记录、可筛选手记与文章页已完成，生产构建通过、全部路由静态生成；源码仓库已初始化，正在推进部署到 orz.autos。",
    tools: ["Next.js", "React", "Tailwind CSS", "静态导出", "Caddy"],
    repo: "https://github.com/sjy1024/ying-blog",
  },
];
