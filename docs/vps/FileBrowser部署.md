# FileBrowser部署

## 安装

```shell
curl -fsSL https://raw.githubusercontent.com/filebrowser/get/master/get.sh | bash
```

## 配置

```shell
mkdir -p /etc/filebrowser
vim /etc/filebrowser/filebrowser.json
```

配置文件内容 `filebrowser.json`

```json
{
  "port": 8080,
  "baseURL": "",
  "address": "",
  "log": "stdout",
  "database": "/etc/filebrowser/filebrowser.db",
  "root": "/path/to/your/root"
}
```

## 配置Systemd服务文件

确保你的Systemd服务文件指向正确的配置路径，编辑`/etc/systemd/system/filebrowser.service`文件：

```shell
ini复制代码[Unit]
Description=Filebrowser
After=syslog.target
After=network.target

[Service]
User=root
ExecStart=/usr/local/bin/filebrowser -c /etc/filebrowser/filebrowser.json
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

### 重载并重新启动服务

重新加载Systemd守护进程并重启Filebrowser服务：

```shell
sudo systemctl daemon-reload
sudo systemctl restart filebrowser
```