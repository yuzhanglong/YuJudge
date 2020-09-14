<p align="center">
  <a href="">
    <img src="http://cdn.yuzzl.top/judge.png">
  </a>
</p>

<p align="center">
  <a href="#快速上手">快速上手</a>&nbsp;|&nbsp;<a href="#调试与部署">调试与部署</a>&nbsp;|&nbsp;<a href="#版本日志">版本日志</a>
</p>


![package-json](https://img.shields.io/github/package-json/v/yuzhanglong/YuJudge)
![react](https://img.shields.io/badge/react-16.13.1-blue?logo=react)
![typescript](https://img.shields.io/badge/typescript-3.7.2-blue?logo=typescript)

### 快速上手

[点击访问](http://docs.yuzzl.top/)

### 在线DEMO

[点击访问](http://oj.yuzzl.top/)

###  调试与部署

项目打包基于**webpack**，当前分支已经运行了`yarn eject`，webpack配置需要开发者自行管理。

webpack配置文件位于`config/webpack`目录之下。

yarn脚本文件位于`script`目录之下。

### 开发环境运行

```shell
yarn start
```

### 生产环境打包

```shell
yarn build
```

### 带外链的生产环境打包

打开`package.json`，修改**http://cdn.yuzzl.top**为你的外链地址。

```json {5}
"scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js",
    "buildWithPrefix": "node scripts/build.js http://cdn.yuzzl.top",
    "upload": "node scripts/upload.js"
}
```

执行

```shell
yarn buildWithPrefix
```

此时打包出来的所有js、css等依赖，均指向你的**外链地址**而不是`build`文件夹的根目录。

### 集成七牛存储服务

如果你使用七牛的云存储服务来保存静态文件的话，你可以试试: 

打开`script/upload.js`, 找到下面内容，按照注释进行修改

```javascript
// 上传凭证以及配置
const ACCESS_KEY = 'o4fgM7P2lPEyo3已经作废FZ7s_NGdo_xJVNDdKf55apCubX';
const SECRET_KEY = 'YxRkcS8o-GSLMo1已经作废ajWuLjeFxFsMo1WKnOvyrLjB8';
// bucket
const options = {
  scope: "yzlyz已经作废l123",
};
// 空间对应的机房
config.zone = uploader.zone.Zone_z2;
```

带外链打包

```shell
yarn buildWithPrefix
```

执行上传脚本

```shell
yarn upload
```
所有css、js等静态文件会被**自动上传至七牛服务器**，你只需要将**index.html**、一些图标文件传上服务器进行托管即可。


### 版本日志

最新版本 `1.0.0`

#### 1.0.0

发布前后端项目至GitHub
