# MoviePilot-二级分类

> 影视自动化路径：订阅->自动下载->下载目录二级分类->硬链接->硬链接目录刮削
>
> emby按二级目录建媒体库

## 实现效果

**下载目录viewlist、硬链接目录links都有二级分类**

![image](https://img.kaian.de/i/2024/06/14/142940.png)

![image](https://img.kaian.de/i/2024/06/14/143043.png)

## 配置

启动插件

![image](https://img.kaian.de/i/2024/06/14/142839.png)

MP-设定-目录

![image](https://img.kaian.de/i/2024/06/14/142727.png)

## Emby多媒体库

![image](https://img.kaian.de/i/2024/06/14/144752.png)



## 遇到的坑

1.开启二级分类后，会自动在下载目录创建子目录。transmission下载报错，提示没有权限创建目录。

解决方案：在ssh使用 `id sc-transmission`查看下载器用户id。然后在配置指定下载用户ID `AUTO_DOWNLOAD_USER=177169`。





































