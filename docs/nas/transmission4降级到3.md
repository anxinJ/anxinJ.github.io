群晖系统：DSM7.2
在套件中心配置了第三方源[我不是矿神](https://spk7.imnks.com/)，原本安装Transmission3，手贱升级到Transmission4，结果大量红种提示Can not connect to tracker，部分种子提示banned client。
本着一了百了的想法决定降级回Transmission3。
## 卸载
建议卸载前备份种子数据
```shell
cd /volume2/@appdata
sudo tar zcvf transmission.tar.gz transmission/
```
套件中心卸载Transmission4，选择仅卸载。（保留种子数据）
## 安装本体
因为[我不是矿神](https://spk7.imnks.com/)不提供离线安装包，所以只能找SynoCommunity的安装包。后续还要自行安装原来的webui。
安装包地址：[https://synocommunity.com/package/transmission](https://synocommunity.com/package/transmission)
安装包有群晖对应版本，可以查下群晖各类机型的套件架构：[查询地址](https://kb.synology.com/en-global/DSM/tutorial/What_kind_of_CPU_does_my_NAS_have)
DS1520+是Geminilake ，所以我选择了下图的安装包。
![image.png](https://img.kaian.de/i/2024/04/19/153500.png)
下载安装包后，一般直接安装会提示端口被占用或者被保留。需要先删除_transmission.sc_文件。

```shell
cd /usr/local/etc/services.d/
rm transmission.sc
```
接着，在套件中心点手动安装，选择刚下载的安装包就可以。
## 安装transmission-web-control
官方地址：[https://github.com/ronggang/transmission-web-control](https://github.com/ronggang/transmission-web-control/)
Gitee地址：[https://gitee.com/culturist/transmission-web-control](https://gitee.com/culturist/transmission-web-control)

### 官方脚本自动安装
我猜一般情况下，使用官方安装脚本安装就可以的。
```shell
wget --no-check-certificate https://github.com/ronggang/transmission-web-control/raw/master/release/install-tr-control-cn.sh
sudo bash install-tr-control-gitee.sh 
# 然后敲1安装，最新版是2020年的1.6.1
```
![image.png](https://img.kaian.de/i/2024/04/19/153533.png)
### 手动安装
**下载源码**
[https://gitee.com/culturist/transmission-web-control/archive/refs/tags/v1.6.1-update1.zip](https://gitee.com/culturist/transmission-web-control/archive/refs/tags/v1.6.1-update1.zip)
**上传解压**
上传到群晖任意目录，然后解压，得到_transmission-web-control-master_目录。
**覆盖UI**
先将原来的index.html备份，然后将_transmission-web-control-master的src_复制到web目录

```shell
cd /var/packages/transmission/target/share/transmission/web
mv index.html index.original.html
cp -r /path/to/transmission-web-control-master/src/. /var/packages/transmission/target/share/transmission/web
```
**修改权限**
不修改权限，刷新页面会报错。
第一条命令：YOUR_USERNAME 替换为 具体用户名字
第二条命令：github上修改目录的命令和系统的用户组对不上，我自己改了下，可以根据实际情况来。

```shell
sed -i '/sc-transmission/s/$/YOUR_USERNAME/' /etc/group
chown sc-transmission:synocommunity /var/packages/transmission/target/share/transmission/web/* -R
chmod 774 /var/packages/transmission/target/share/transmission/web/* -R
```
![image](https://img.kaian.de/i/2024/04/19/153638.png)
**刷新页面**
最后_ctrl+F5_刷新下页面就可以了

---

参考：[https://boriskp.github.io/transmission300-294/](https://boriskp.github.io/transmission300-294/)

<gitalk/>