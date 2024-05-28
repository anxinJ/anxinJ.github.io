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
    ["link", {rel: "icon", href: "/logo.ico"}],
    // 添加统计代码
    // ['script', {},
    // `
    //   var _hmt = _hmt || [];
    //   (function() {
    //     var hm = document.createElement("script");
    //     hm.src = "https://hm.baidu.com/hm.js?9b77e13b749eb16bfaad0e97179ca700";
    //     var s = document.getElementsByTagName("script")[0]; 
    //     s.parentNode.insertBefore(hm, s);
    //   })();
    //   (function(c,l,a,r,i,t,y){
    //       c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    //       t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    //       y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    //   })(window, document, "clarity", "script", "jud16drf49");
    // `
    // ]
  ],
  themeConfig: {
    logo: '/logo.png',
    // 首页右上角导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/aboutme' },
      { text: '图床', link: 'https://img.kaian.de' }
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
