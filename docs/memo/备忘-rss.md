# 创建配置文件

config.json

```json
{
    "values": [
	"https://invites.fun/atom",
	"https://rsshub.app/baidu/top",
	"https://rsshub.app/zhihu/hotlist",
	"https://rsshub.app/zhihu/pin/daily",
	"https://rsshub.app/daily",
	"https://rsshub.app/coolapk/hot",
        "https://tech.meituan.com/feed/",
        "http://www.ruanyifeng.com/blog/atom.xml",
        "https://linux.do/latest.rss",
        "https://rss.nodeseek.com",
        "https://v2ex.com/feed/tab/tech.xml",
        "https://www.dalao.net/feed.htm",
	"https://rsshub.app/smzdm/haowen/1",
	"https://rsshub.app/lfsyd/home",
	"https://rsshub.app/bilibili/weekly",
	"https://rsshub.app/bilibili/hot-search",
	"https://rsshub.app/github/trending/daily/java/en",
	"https://rsshub.app/github/trending/daily/python/en",
	"https://rsshub.app/500px/tribe/set/f5de0b8aa6d54ec486f5e79616418001",
	"https://rsshub.app/natgeo/dailyphoto"
    ],
    "refresh": 5,
    "autoUpdatePush": 7,
    "listHeight": "600",
    "webTitle": "Kaiann's RSS",
    "webDes":""
}
```



# docker-compose安装

```yaml
version: "3"

services:
  server:
    image: topang/rss-reader-mix:latest
    container_name: rss-reader-mix
    restart: always
    ports:
      - "8880:8080"
    volumes:
      - "$PWD/config.json:/app/config.json"

```

