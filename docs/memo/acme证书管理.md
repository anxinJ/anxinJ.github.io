# acme证书管理

## Linux acme

### 安装acme

```shell
curl https://get.acme.sh | sh -s email=my@example.com
```

安装位置：`~/.acme.sh/`

### 生成证书

**acme.sh** 实现了 **acme** 协议支持的所有验证协议. 一般有两种方式验证: http 和 dns 验证.

#### 1. http 方式需要在你的网站根目录下放置一个文件, 来验证你的域名所有权,完成验证. 然后就可以生成证书了.（采用）

```
acme.sh --issue -d mydomain.com -d www.mydomain.com --webroot /home/wwwroot/mydomain.com/
```

只需要指定域名, 并指定域名所在的网站根目录. **acme.sh** 会全自动的生成验证文件, 并放到网站的根目录, 然后自动完成验证. 最后会聪明的删除验证文件. 整个过程没有任何副作用.

如果你用的 **apache**服务器, **acme.sh** 还可以智能的从 **apache**的配置中自动完成验证, 你不需要指定网站根目录:

```
acme.sh --issue -d mydomain.com --apache
```

如果你用的 **nginx**服务器, 或者反代, **acme.sh** 还可以智能的从 **nginx**的配置中自动完成验证, 你不需要指定网站根目录:

```
acme.sh --issue -d mydomain.com --nginx
```

**注意, 无论是 apache 还是 nginx 模式, acme.sh在完成验证之后, 会恢复到之前的状态, 都不会私自更改你本身的配置. 好处是你不用担心配置被搞坏, 也有一个缺点, 你需要自己配置 ssl 的配置, 否则只能成功生成证书, 你的网站还是无法访问https. 但是为了安全, 你还是自己手动改配置吧.**

> nginx需要修改配置的server_name mydomain.com

如果你还没有运行任何 web 服务, **80** 端口是空闲的, 那么 **acme.sh** 还能假装自己是一个webserver, 临时听在**80** 端口, 完成验证:

```
acme.sh --issue -d mydomain.com --standalone
```

acme.sh脚本默认ca服务器是zerossl，经常出错，会导致获取证书的时候一直出现：Pending, The CA is processing your order, please just wait.

只需要把ca服务器改成letsencrypt 即可，虽然更改以后还是有概率出现pending，但基本2-3次即可成功

```
acme.sh --set-default-ca --server letsencrypt
```

#### 2. 手动 dns 方式, 手动在域名上添加一条 txt 解析记录, 验证域名所有权.

这种方式的好处是, 你不需要任何服务器, 不需要任何公网 ip, 只需要 dns 的解析记录即可完成验证. 坏处是，如果不同时配置 Automatic DNS API，使用这种方式 acme.sh 将无法自动更新证书，每次都需要手动再次重新解析验证域名所有权。

```
acme.sh --issue --dns -d mydomain.com \
 --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

然后, **acme.sh** 会生成相应的解析记录显示出来, 你只需要在你的域名管理面板中添加这条 txt 记录即可.

等待解析完成之后, 重新生成证书:

```
acme.sh --renew -d mydomain.com \
  --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

注意第二次这里用的是 `--renew`

dns 方式的真正强大之处在于可以使用域名解析商提供的 api 自动添加 txt 记录完成验证.

**acme.sh** 目前支持 cloudflare, dnspod, cloudxns, godaddy 以及 ovh 等数十种解析商的自动集成.

以 dnspod 为例, 你需要先登录到 dnspod 账号, 生成你的 api id 和 api key, 都是免费的. 然后:

```
export DP_Id="1234"

export DP_Key="sADDsdasdgdsf"

acme.sh --issue --dns dns_dp -d aa.com -d www.aa.com
```

证书就会自动生成了. 这里给出的 api id 和 api key 会被自动记录下来, 将来你在使用 dnspod api 的时候, 就不需要再次指定了. 直接生成就好了:

```
acme.sh --issue -d mydomain2.com --dns  dns_dp
```

#### 3. copy/安装 证书

前面证书生成以后, 接下来需要把证书 copy 到真正需要用它的地方.

注意, 默认生成的证书都放在安装目录下: `~/.acme.sh/`, 请不要直接使用此目录下的文件, 例如: 不要直接让 nginx/apache 的配置文件使用这下面的文件. 这里面的文件都是内部使用, 而且目录结构可能会变化.

正确的使用方法是使用 `--install-cert` 命令,并指定目标位置, 然后证书文件会被copy到相应的位置, 例如:

#### Apache example:

```
acme.sh --install-cert -d example.com \
--cert-file      /path/to/certfile/in/apache/cert.pem  \
--key-file       /path/to/keyfile/in/apache/key.pem  \
--fullchain-file /path/to/fullchain/certfile/apache/fullchain.pem \
--reloadcmd     "service apache2 force-reload"
```

#### Nginx example:

```
acme.sh --install-cert -d example.com \
--key-file       /path/to/keyfile/in/nginx/key.pem  \
--fullchain-file /path/to/fullchain/nginx/cert.pem \
--reloadcmd     "service nginx force-reload"
```

(一个小提醒, 这里用的是 `service nginx force-reload`, 不是 `service nginx reload`, 据测试, `reload` 并不会重新加载证书, 所以用的 `force-reload`)

Nginx 的配置 `ssl_certificate` 使用 `/etc/nginx/ssl/fullchain.cer` ，而非 `/etc/nginx/ssl/<domain>.cer` ，否则 [SSL Labs](https://www.ssllabs.com/ssltest/) 的测试会报 `Chain issues Incomplete` 错误。

`--install-cert`命令可以携带很多参数, 来指定目标文件. 并且可以指定 reloadcmd, 当证书更新以后, reloadcmd会被自动调用,让服务器生效.

#### 4. 查看已安装证书信息

```
acme.sh --info -d example.com
```



#### 5.更新证书

目前证书在 60 天以后会自动更新, 你无需任何操作. 今后有可能会缩短这个时间, 不过都是自动的, 你不用关心.

请确保 cronjob 正确安装, 看起来是类似这样的:

```
crontab  -l

56 * * * * "/root/.acme.sh"/acme.sh --cron --home "/root/.acme.sh" > /dev/null
```

#### 6. 更新 acme.sh

目前由于 acme 协议和 letsencrypt CA 都在频繁的更新, 因此 acme.sh 也经常更新以保持同步.

升级 acme.sh 到最新版 :

```
acme.sh --upgrade
```



## 群晖acme

### 安装

```shell
sudo su
# 按需调整位置
cd ~ 
wget https://github.com/acmesh-official/acme.sh/archive/master.tar.gz
tar xvf master.tar.gz
cd acme.sh-master/
./acme.sh --install --nocron --home /usr/local/share/acme.sh --accountemail "email@gmailcom"
source ~/.profile
```

### 配置CloudFlare DNS

设置两个环境变量，acme.sh将读取这些变量以设置 DNS 记录。

```shell
# 域名-概述-右下角
export CF_Key="MY_SECRET_KEY_SUCH_SECRET"
export CF_Email="myemail@example.com"
```

如果生成了 API 令牌，可以改为设置 CF_Token，而不是使用全局帐户密钥。

```docker
export CF_Token="MY_SECRET_TOKEN_SUCH_SECRET"
export CF_Email="myemail@example.com"
```

### 创建证书

为域名创建证书：

```docker
# These commands assume you are still working in the same terminal and have ran necessary commands described above.

cd /usr/local/share/acme.sh
export CERT_DOMAIN="your-domain"
export CERT_DNS="dns_cf"
./acme.sh --issue --server letsencrypt --home . -d "$CERT_DOMAIN" --dns "$CERT_DNS"
```

### 部署默认证书

（推荐）使用自动创建的临时管理员用户进行部署

```shell
export SYNO_USE_TEMP_ADMIN=1
./acme.sh --deploy --home . -d "$CERT_DOMAIN" --deploy-hook synology_dsm
```

### 配置证书续订

在 DSM 控制面板中，打开“任务计划程序”并为用户定义的脚本创建一个新的计划任务。

常规设置：任务 - UpdateCert。 用户 - root
计划：设置每周续订。例如，每周六上午 7：00。
任务设置：用户定义的脚本：

```docker
# renew certificates 
./acme.sh --cron --home .
```