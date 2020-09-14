---
title: 配置项
---

## 前端配置项

以下是前端配置项，你可以按需修改，其中比较重要的配置我们以高亮的形式表示，请**务必修改或者重视**。

```typescript {39-40,24-25,36-37}
/*
 * File: config.js
 * Description: 全局配置相关
 * Created: 2020-7-18
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {BaseResponse} from "../models/common";
import {Empty} from "antd";
import {JudgeConditionEnum, LanguageTypeEnum} from "../common/enumerations";

// logo 路径
export const LOGOS = {
  COMMON: "/logo/logo.svg",
  WITH_TEXT: "/logo/logo-text.svg",
  WITH_TEXT_AND_VERSION: "/logo/logo-text-with-version.svg"
}


// 响应时间阈值
export const TIME_OUT: number = 5000;

// 服务器的baseUrl
export const BASE_URL: string = "http://47.106.202.255:8081";

// 提交界面中单页的数据量
export const SUBMISSION_SINGLE_PAGE_SIZE: number = 15;

// 查看当前提交轮询任务间隔时间，单位为毫秒
export const SUBMISSION_REQUEST_TASK_TIME: number = 4000;

// TOKEN 存储键
export const TOKEN_KEY: string = "token";

// 文件上传baseUrl
export const UPLOAD_SERVER_BASE_URL: string = "http://up-z2.qiniup.com";

// 文件下载路径
export const DOWNLOAD_SERVER_BASE_URL: string = "http://cdn.yuzzl.top";

// 控制台最近题目的数量
export const RECENT_PROBLEM_IN_DASHBOARD_AMOUNT: number = 6;

// 控制台个人近期提交的天数
export const RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT: number = 10;

// 控制台活跃用户个数
export const RECENT_ACTIVE_USER_IN_DASHBOARD_AMOUNT: number = 7;

// 分页表格组件的首页页号
export const PAGE_BEGIN: number = 1;

// problem管理页面表单单页长度
export const SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE = 15;

// 题目集表格单页长度
export const SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE = 10;

// 题目集添加题目时，交互时需要告知用户的内容个数
export const ADD_PROBLEM_MAX_SHOW = 5;

// 用户管理界面每一页的个数
export const SINGLE_PAGE_SIZE_IN_USER_MANAGE = 10;

// 默认日期格式化
export const DEFAULT_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

// 默认日期格式化
export const TIME_LINE_IN_PROBLEM_SET_FORMAT = DEFAULT_DATE_TIME_FORMAT;

// 日期格式化 - 小时
export const DATE_TIME_FORMAT_BY_HOUR = "HH:mm:ss";

// 默认端口
export const JUDGE_HOST_DEFAULT_PORT = 8080;

// 判题机默认url方案
export const JUDGE_HOST_DEFAULT_URL_SCHEME = "http";

// 用户信息键
export const USER_INFO_KEY = "user";

// 默认判题偏好
export const DEFAULT_JUDGE_PREFERENCE = "ACM";

// 全局loadingId
export const LOADING_DOM_ID = "loading";

// 全局loading最小时间，为提高用户体验防止loading一闪而过
export const LOADING_MIN_TIME = 300;

// 无连接响应
export const NO_CONNECTION_RESPONSE: BaseResponse = {
  message: "服务器连接异常",
  config: {},
  data: undefined,
  headers: undefined,
  status: 0,
  statusText: ""
}

// 显示为空的图片
export const EMPTY_IMAGE = Empty.PRESENTED_IMAGE_SIMPLE;

// 权限请求头key名
export const AUTHORIZATION_KEY = "Authorization";

// 默认语言
export const DEFAULT_LANGUAGE = [
  LanguageTypeEnum.C,
  LanguageTypeEnum.C_PLUS_PLUS,
  LanguageTypeEnum.JAVA,
  LanguageTypeEnum.PYTHON
]

// 同时运行的判题个数设置区间
export const JUDGE_NUMBER_SETTINGS_RANGE = [1, 15];

// 判题结果改变可选值
export const JUDGE_RESULT_CHANGE_ALLOW_DATA = [
  JudgeConditionEnum.ACCEPT,
  JudgeConditionEnum.WRONG_ANSWER,
  JudgeConditionEnum.RUNTIME_ERROR,
  JudgeConditionEnum.TIME_LIMIT_EXCEEDED,
  JudgeConditionEnum.MEMORY_LIMIT_EXCEED
];
```

## 服务端部署脚本配置

以下是服务端的部署脚本，你可以按需修改，其中比较重要的配置我们以高亮的形式表示，请**务必修改或者重视**。

```yml {15,18-21,34-36,46}
version: '3'
services:
  judge-server:
    restart: always
    image: registry.cn-shenzhen.aliyuncs.com/coderyzl/judge-server:1.0
    ports:
      - 8081:8081
    depends_on:
      - redis
      - mysql
      - judge-host
    environment:
      REDIS_HOST: redis
      REDIS_PORT: 6379
      JUDGE_SERVER_USER_SECRET: yzl  # 服务器鉴权secret, 务必修改
      MYSQL_URL: jdbc:mysql://mysql:3306/yu-judge?characterEncoding=utf-8&serverTimezone=GMT%2B8
      MYSQL_USER_NAME: root
      MYSQL_PASSWORD: yzl520  # mysql root密码, 务必修改
      QN_ACCESS_KEY: o4fgM7P2lPE已作废yo3Kf55apCubX 
      # 项目使用了七牛云存储服务，每个月有50G免费用量,请自行注册, 这里的值
      QN_SECRET_KEY: YxRkcS8o-GSLM已作废o1ajWuLjeFxFsMo1WKnOvyrLjB8
      QN_BUCKET: yzlyz已作废l123
  judge-host:
    image: registry.cn-shenzhen.aliyuncs.com/coderyzl/judge-host:1.0
    ports:
      - 8080:8080
    volumes:
      - /home/YuJudge/Judge-Host/judgeEnvironment/resolutions:/home/judgeEnvironment/resolutions
      - /home/YuJudge/Judge-Host/judgeEnvironment/submissions:/home/judgeEnvironment/resolutions
    depends_on:
      - redis
    environment:
      REDIS_HOST: redis
      REDIS_PORT: 6379
      JUDGE_HOST_USER_ID: yzl # 判题服务器鉴权id,  务必修改
      JUDGE_HOST_USER_SECRET: yzl # 判题服务器鉴权密码, 务必修改
      JUDGE_HOST_SECRET_KEY: secret # 判题服务器secret, 务必修改
  redis:
    image: redis
    command:
      redis-server --port 6379 --appendonly yes
    volumes:
      - /home/YuJudge/redis:/data
  mysql:
    image: registry.cn-shenzhen.aliyuncs.com/coderyzl/mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: yzl520 # mysql root密码, 务必修改
    ports:
      - 3306:3306
    volumes:
      - /home/YuJudge/mysql:/var/lib/mysql
```

