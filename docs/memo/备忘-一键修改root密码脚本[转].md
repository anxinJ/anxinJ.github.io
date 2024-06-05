# 一键脚本
```
wget -q root.sh https://raw.githubusercontent.com/passeway/root/main/root.sh && chmod +x root.sh && ./root.sh
```
## 详细说明
脚本会根据用户选择，生成随机密码或者设置自定义密码，并将其应用于root用户。

脚本会修改SSH服务器的配置文件以允许root用户登录和使用密码进行身份验证，并重启SSH服务以应用更改。

---

[原文](https://www.nodeseek.com/post-114963-1)
