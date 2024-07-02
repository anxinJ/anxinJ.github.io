

## 融合怪测试

```shell
curl -L https://gitlab.com/spiritysdx/za/-/raw/main/ecs.sh -o ecs.sh && chmod +x ecs.sh && bash ecs.sh
#OR
curl -L https://github.com/spiritLHLS/ecs/raw/main/ecs.sh -o ecs.sh && chmod +x ecs.sh && bash ecs.sh
#OR
bash <(wget -qO- bash.spiritlhl.net/ecs)
```

## 三网回程

```shell
curl https://raw.githubusercontent.com/zhanghanyun/backtrace/main/install.sh -sSf | sh
```

## 流媒体解锁检测

```shell
bash <(curl -L -s check.unlock.media)
```

## ChatGPT解锁检测

```shell
wget -O chat.sh https://raw.githubusercontent.com/Netflixxp/chatGPT/main/chat.sh && chmod +x chat.sh && clear && ./chat.sh
```

## 测速

```shell
# 全球
curl -sL network-speed.xyz | bash
# 亚洲
curl -sL network-speed.xyz | bash -s -- -r asia
# 国内
curl -sL network-speed.xyz | bash
```



## bbr

```shell
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh && chmod +x bbr.sh && ./bbr.sh
```

确认

```shell
sysctl net.ipv4.tcp_congestion_control
```

## fail2ban

```shell
wget https://raw.githubusercontent.com/FunctionClub/Fail2ban/master/fail2ban.sh && bash fail2ban.sh 2>&1 | tee fail2ban.log
```

## 修改root密码

```
wget -q root.sh https://raw.githubusercontent.com/passeway/root/main/root.sh && chmod +x root.sh && ./root.sh
```

**详细说明**

脚本会根据用户选择，生成随机密码或者设置自定义密码，并将其应用于root用户。

脚本会修改SSH服务器的配置文件以允许root用户登录和使用密码进行身份验证，并重启SSH服务以应用更改。

## docker安装

```shell
curl -sSL https://get.docker.com/ | sh
```

## docker-compose安装

```shell
curl -SL https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose
```

## xxx

安装

```shell
wget https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh && bash install-release.sh
```

```shell
wget https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-dat-release.sh && bash install-dat-release.sh
```

配置文件路径

`/usr/local/etc/v2ray/config.json`

卸载

```shell
bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh) --remove
```



## seedbox安装（杰佬）

```shell
bash <(wget -qO- https://raw.githubusercontent.com/jerry048/Dedicated-Seedbox/main/Install.sh) -u <用戶名稱> -p <密碼> -c <緩存大小(單位:MiB)> -q -l -b -v -r -3 -x -o
```

> -u: 用戶名稱
> -p: 密碼
> -c: qBitorrent 的緩存大小
> -q: qBittorrent 版本
> -l: libtorrent 版本
> -b: 安裝autobrr
> -v: 安裝vertex
> -r: 安裝 autoremove-torrents
> -3: 啓動 BBR V3
> -x: 啓動 BBRx
> -o: 自定義端口

只安装qb

```shell
bash <(wget -qO- https://raw.githubusercontent.com/jerry048/Dedicated-Seedbox/main/Install.sh) -u <用戶名稱> -p <密碼> -c 256 -q 4.3.9 -l v1.2.19
```



## qBittorrent 进种暂停后自动恢复

```shell
bash <(wget -qO- https://raw.githubusercontent.com/ours1505/qBittorrentAutoResume/master/main.sh)
```

日志查看：

```
journalctl -u qBittorrentAutoResume.service
```

开启：

```
systemctl start qBittorrentAutoResume.service
```

关闭：

```
systemctl stop qBittorrentAutoResume.service
```

重载

```
systemctl restart qBittorrentAutoResume.service
```

配置文件

```
vim /opt/qBittorrentAutoResume/config.ini
```



## 流量监控

安装脚本

```shell
apt-get install vnstat
```

查看是否运行

```shell
systemctl status vnstat
```

查看监控网口

```shell
ls /var/lib/vnstat/
```

view live traffic, enp2s0为上面命令得到的监控网口

```shell
vnstat -i enp2s0 -l
```

安装脚本

```shell
apt-get install vnstat
```

```shell
vnstat -h #查看过去24小时的流量
vnstat -d #查看过去30天的流量
vnstat -m #查看每个月的流量
vnstat -t #查看top10天的流量
```

