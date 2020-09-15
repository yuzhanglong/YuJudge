---
title: 快速上手
slug: /
---
## 体验一下DEMO
### 测试网址

点击下面的链接便可访问(建议使用**电脑端**访问以获得最佳体验), 测试用户名为**User**, 密码为**password**，权限为【一般用户】

[测试DEMO](http://oj.yuzzl.top/)

### CodeSandbox

你也可以使用**CodeSandbox**访问，由于网络原因，可能需要等待几秒钟来加载。使用CodeSandbox，你可以轻松修改源代码且无需配置开发环境。

[CodeSandbox版DEMO](https://codesandbox.io/s/adoring-blackburn-ru7kr)

## 部署服务端

项目的部署依赖**docker**、**docker-compose**

### 安装依赖

```shell
yum install -y docker docker-compose  // centos
```

### 获取docker-compose配置文件

```shell
wget https://cdn.jsdelivr.net/gh/yuzhanglong/YuJudge-JudgeServer/deploy/docker-compose-single.yml
```

### 执行部署

```shell
docker compose -f docker-compose-single.yml up -d
```

项目将在大概**二十秒**后在服务器后台正常运行。

部署完成之后，整个项目结构如下所示，可尝试使用数据库管理工具、浏览器访问各个部分，或者去尝试**前端项目**。

![image-20200912212555137](http://cdn.yuzzl.top/single-server.png)

其中，使用浏览器访问服务器的**8081端口**（JudgeServer，主服务器）和**8080端口**（JudgeHost，判题服务器），看到以下内容,  说明部署成功

```json
{
	"code":"00000",
	"message":"Your project is running successfully! O(∩_∩)O",
	"request":null,
	"data":null
}
```



## 部署前端

### 使用CodeSandbox

:::tip 更快地得到体验

如果你对**nodejs**不了解，你可以点击下面链接，使用**CodeSandbox**来在线部署运行。

[CodeSandbox版DEMO](https://codesandbox.io/s/adoring-blackburn-ru7kr)

进入页面后，打开`src/config/config.ts`,  修改**下面的内容**为**你已经部署成功的服务器地址**，保存即可体验。

```typescript
// 服务器的baseUrl
export const BASE_URL: string = "你的服务器地址，不要忘记端口号";
```
:::

### 常规部署
#### 获取源代码
```shell
git clone https://github.com/yuzhanglong/YuJudge
```

#### 生产环境打包

```shell
yarn build
```
将打包好的文件（`build`目录下）上传至服务器/本地代理托管即可。

:::tip 显示白屏
- 项目无法直接通过双击**index.html**在浏览器打开，请上传服务器/本地代理运行。
:::

:::tip 在服务器访问速度慢
可以考虑为你的静态资源使用**cdn**，可以查看【[前端二次开发](/frontend)】板块以获取详细内容。
:::

## 大功告成

进入首页，你将看到以下内容，说明前端项目部署成功，我们已经为你初始化了一名**管理员用户**，用户名为**admin**，密码为**password**，你可以点击**登录**按钮查看项目。

Landing页面
![首页](http://cdn.yuzzl.top/homepage.png)
登录页
![登录页](http://cdn.yuzzl.top/login_page.png)

## 接下来...

[尝试提交](/submission)

[了解项目的文件管理方式](/upload)