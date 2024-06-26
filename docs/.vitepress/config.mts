import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 标题（浏览器后缀）
  title: "Kaiann",
  // 描述
  description: "Kaiann Blog",
  // 根目录，如果需要部署成https://github.com/blog/的形式，则设置/blog/
  base: '/',
  // 语言
  lang: 'zh-CN',
  // 文档最后更新时间展示
  lastUpdated: true,
  // markdown显示行数
  markdown: {
    lineNumbers: true,
  },
   // head设置
   head: [
    // 浏览器中图标
    ["link", {rel: "icon", href: "/logo.ico"}]
  ],
  themeConfig: {
    logo: '/logo.png',
    // 首页右上角导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog📝', link: '/aboutme' },
      { text: '图床🖼️', link: 'https://img.kaian.de' },
      { text: '小鸡🐤', link: 'https://vps.kaian.de' },
      { text: '短链🔗', link: 'https://s.kaian.de' },
    ],
    // 文章左侧导航栏
    sidebar: [
      { text: 'AboutMe', link: '/aboutme' },
      {
        text: 'Blog',
        items: [
          {
            text: '2024',
            items: [
              { text: 'Cloudflare项目”', link: '/vps/Cloudflare项目' },
              { text: '张雪峰高考填报志愿的秘诀“经典9连问”', link: '/memo/张雪峰高考填报志愿的秘诀“经典9连问”' },
              { text: 'FileBrowser部署', link: '/vps/FileBrowser部署' },
              { text: 'vps如何手动挂载硬盘', link: '/vps/vps如何手动挂载硬盘' },
              { text: 'MoviePilot-二级分类', link: '/nas/MoviePilot-二级分类' },
              { text: 'Emby增加弹幕', link: '/nas/Emby增加弹幕' },
              { text: 'cloudflare worker搭建Docker镜像', link: '/docker/cloudflareworker搭建Docker镜像' },
              { text: 'acme证书管理', link: '/memo/acme证书管理' },
              { text: 'VPS线路', link: '/vps/VPS线路' },
              { text: 'VPS搭建及检测脚本汇总', link: '/vps/VPS搭建及检测脚本汇总' },
              { text: '备忘-rss', link: '/memo/备忘-rss' },
              { text: 'ptpp备份到群晖webdav', link: '/nas/ptpp备份到群晖webdav' },
              { text: '网段解释byChatGPT4o', link: '/memo/网段解释byChatGPT4o' },
              { text: 'transmission4降级到3', link: '/nas/transmission4降级到3' },
              { text: 'dockercompose常用命令', link: '/docker/dockercompose常用命令'},
              { text: 'docker&compose安装', link: '/docker/docker&compose安装'}
            ]
          }
        ]
      }
    ],
     // 文章底部导航栏的自定义配置，默认是英语
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    // 文章右侧目录展示级别和标题
    outline: {
      level: [2, 6],
      label: '文章目录'
    },
    // 文章更新时间的前缀文本
    lastUpdatedText: '最后更新时间',
    // 开启本地搜索（左上角）
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/anxinJ/anxinJ.github.io' }
    ],
    // 页脚
    footer: {
      copyright: 'Copyright © 2024-present Kaiann',
    }
  }
})
