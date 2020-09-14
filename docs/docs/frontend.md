---
title: 针对前端的二次开发
---

## 了解大致目录结构

只选取了项目的主体部分，细节目录结构全部略去。

```
YuJudge                                                            
├─ config                                       // 项目打包构建(例如webpack)的一些配置
├─ docs                                         // 项目文档
├─ help                                         // 帮助
├─ public                                       // 公共文件
│  ├─ logo                                      // 项目logo, 可以直接修改
├─ scripts                                      // 包的依赖管理文件
├─ src                                          // 源代码
│  ├─ App.tsx                                   // 项目入口
│  ├─ common                                    // 公共文件，例如一些枚举等
│  ├─ components                                // 公共组件包，独立于页面
│  ├─ config                                    // 全局配置
│  ├─ hooks                                     // 自定义hooks
│  ├─ index.scss                                // 样式入口
│  ├─ layout                                    // 项目布局
│  │  ├─ cms                                    // cms页面布局
│  │  ├─ common                                 // 常规页面布局
│  ├─ models                                    // 业务模型
│  ├─ network                                   // 网络请求
│  ├─ pages                                     // 页面(组件)
│  │  ├─ cms                                    // 后台管理所有页面
│  │  ├─ common                                 // 所有的一般性页面
│  │  ├─ index.scss                             // 页面样式出口
│  │  └─ index.tsx                              // 页面路由出口
│  ├─ router                                    // 全局路由配置
│  ├─ store                                     // 状态管理(暂未使用)
│  ├─ styles                                    // 公共样式
│  └─ utils                                     // 工具相关
```

## 当前项目的一些规范

### 总述

- 文件夹、文件名统一采用驼峰法命名，**特例: 组件名称以大写字母开头。**
- 常量全部使用大写字母加下划线的形式。
- 组件/页面的基本目录结构如下所示, 页面分类存放于`page`目录下，组件存放于`components`目录下

```
│  ├─ component           // 组件名称
│  │  ├─ childCmp         // 依赖的子组件文件夹，一般为该组件特有，如果具有公共性则另起一个组件文件夹
│  │  ├─ component.module.scss  // 组件样式
│  │  └─ Component.tsx          // 组件名称
```

- css 基于scss，采用 **CSS Modules**的方式编写，具体规范如下：

  - 无论是组件或者页面，如果需要样式，则在其目录下新建`组件名 + module.scss`文件，导入时统一使用**import style from "./xxxxx.module.scss;**
  - 一个独立的组件/页面最多一个css文件，防止混乱。
- 项目统一使用函数式组件，全面使用Hooks
- 组件内部的代码编写顺序（自上而下）
  - 注释（作者信息）
  - 常量
  - hooks
  - 业务逻辑
  - tsx代码

### 路由

项目的路由配置在`router`文件夹下, 其中单个路由的配置如下所示。

```typescript
// 目录路由配置
export interface MenuRouterConfig {
  key: string;
  path: string;
  title: string;
  icon?: string;
  component?: string;
  query?: string;
  isAuthRequired?: boolean;
  children?: MenuRouterConfig[];
  isShowInMenu?: boolean;
}
```

你只需要将要新增页面的相关信息添加至**路由表**中（ps.路由表文件名分版块表示，在router目录下）, 例如:

```typescript
export const CMS_USERS_MENU: MenuRouterConfig = {
  key: "/cms/users",
  title: "用户&用户组",
  path: "/cms/users",
  icon: "UserOutlined",
  isShowInMenu: true,
  children: [
    // 添加内容开始
    {
      key: "/cms/users/user_manage",
      component: "UserManage",
      title: "用户管理",
      path: "/cms/users/user_manage",
      isShowInMenu: true
    }
  ]
  // 添加内容结束
};
```

这表示把**UserManage**这个页面写入路由表中，隶属于用户/用户组的**子路由**，你可以通过`/cms/users/user_manage`访问之。

最后，不要忘记在页面出口注册一下页面:

```typescript {30,42}
/*
 * File: MyRouter.tsx
 * Description: 路由组件出口
 * Created: 2020-7-19 19:12:23
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


// 路由图标
import {
  DashboardOutlined,
  ... 省略若干项
} from "@ant-design/icons";


// 懒加载封装
import loadable from "../utils/loadable";

import Common from "../layout/common/Common";


// 待开发
import Solution from "./common/solution/Solution";
... 省略若干项

// cms 界面
const Dashboard = loadable(import('./cms/dashboard/Dashboard'));
... 省略若干项
const UserManage = loadable(import('./cms/userManage/UserManage'));


// 一般界面
const ProblemHome = loadable(import("./common/problemHome/ProblemHome"));
... 省略若干项


// 导出
export default {
  ProblemManage: ProblemManage,
  ... 省略若干项
  UserManage: UserManage,
} as any;
```



:::tip

loadable包裹的Import表示这个页面实行**路由懒加载**，即在需要的时候进行加载,  加快app首次加载速度。

:::

### 网络请求

网络请求使用**axios**, 并对每一个请求进行二次封装，按照**请求路径**进行文件区分，例如：

```typescript
// judgeHostRequest.ts

// 获取所有的判题机信息
export const getJudgeHostsInfo = () => {
  return request.get(
    "/judge_host/get_judge_hosts_info",
  )
}

// XXXComponent.tsx
getJudgeHostsInfo()
    .then(() => {
    	//DO SOMETHING
	})
    .catch(() => {
    	//DO SOMETHING
    })
```



### 分页

本项目的分页对象如下:

```typescript
// 基础分页请求体
export interface PaginationRequest {
  start: number; // 页码
  count: number; // 每一页的数目
}
```

如果有额外的分页请求体，可以继承自本分页对象,  例如：

```typescript
// 题目集分页请求体
export interface xxxPaginationRequest extends PaginationRequest {
  limit: boolean;
  search: string | null;
}
```

在需要分页请求的页面调用`UsePaginationState`

```typescript
 const xxxPagination = UsePaginationState<xxxPaginationRequest>(PAGE_BEGIN - 1, 分页请求方法);
```
`UsePaginationState`提供了以下方法，你可以轻松获取它们，无需再处理数据。

```typescript
xxxPagination.changeCurrentPage() // 改变页码
xxxPagination.items // 数组，为当前页数据内容
xxxPagination.paginationInfo // 对象，包括以下内容：
  items: [],    // 数组，为数据内容
  count: 0,     // 每页个数
  page: 0,      // 页码
  total: 0,     // 总条目数
  totalPage: 0  // 总页码数
```





## 调试与部署

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

:::tip 显示白屏

- 项目无法直接通过双击**index.html**在浏览器打开，请上传服务器/本地代理运行。
- 如果使用了带外链的生产环境打包，可能是静态文件没有上传成功，可以通过浏览器的开发者工具查看。

:::