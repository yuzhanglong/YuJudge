---
title: 快速开始
slug: /
---
## 部署服务端

项目的部署依赖**docker**、**docker-compose**

### 安装依赖

```shell
yum install -y docker docker-compose  // centos
```

### 获取docker-compose配置文件

```shell
wget http://cdn.yuzzl.top/docker-compose-single.yml
```

### 执行部署

```shell
docker compose -f docker-compose-single.yml up -d 
```

项目将在大概**十几秒**后在服务器后台正常运行。

部署完成之后，整个项目结构如下所示，尝试访问这些端口，或者去部署**前端项目**。

![image-20200912212555137](http://cdn.yuzzl.top/single-server.png)

其中，使用浏览器访问服务器的**8081端口**（JudgeServer，判题服务器），看到以下内容,  说明部署成功

```json
{
	"code":"00000",
	"message":"Your project is running successfully! O(∩_∩)O",
	"request":null,
	"data":null
}
```



## 部署前端



## 大功告成

进入首页，你将看到以下内容，说明前端项目部署成功，我们已经为你初始化了一名**管理员用户**，用户名为**admin**，密码为**yzl**，你可以点击登录按钮以查看项目。

