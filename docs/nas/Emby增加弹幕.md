# Emby增加弹幕

官网：https://danmaku.movie.kg/#page-top

## 前置

在此之前请确认具备以下条件：

- Emby是通过docker安装的。
- ssh连接工具

## 安装步骤

### SSH群晖并进入容器内部

1. 切换到root `sudo -i`
2. 进入容器 `docker exec -it <容器名或者ID> sh`

### 修改index.html

```shell
cd /system/dashboard-ui

vi index.html
```

在`</body>`上方加入以下代码

> 按a进入编辑，按wq保存退出

```html
<script type="text/javascript" src="https://danmaku.movie.kg/ext.js"></script>
<link rel="stylesheet" href="https://danmaku.movie.kg/ext.css"/>
```





