/*
 * File: config.ts
 * Description: 全局配置相关
 * Created: 2020-7-18
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

// request的响应时间最大值
import {BaseResponse} from "../models/common";
import {Empty} from "antd";
import {LanguageTypeEnum} from "../common/enumerations";

export const TIME_OUT: number = 5000;

// 服务器的baseUrl
export const BASE_URL: string = "http://localhost:8080";

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
export const RECENT_PROBLEM_IN_DASHBOARD_AMOUNT: number = 8;

// 控制台个人近期提交的天数
export const RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT: number = 10;

// 控制台活跃用户个数
export const RECENT_ACTIVE_USER_IN_DASHBOARD_AMOUNT: number = 7;

// 分页表格组件的首页页号
export const PAGE_BEGIN: number = 1;

// problem管理页面表单单页长度
export const SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE = 10;

// 题目集表格单页长度
export const SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE = 10;

// 题目集添加题目时，交互时需要告知用户的内容个数
export const ADD_PROBLEM_MAX_SHOW = 5;

// 用户管理界面每一页的个数
export const SINGLE_PAGE_SIZE_IN_USER_MANAGE = 10;

// 默认日期格式化
export const DEFAULT_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

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

// 权限请求头键ming
export const AUTHORIZATION_KEY = "Authorization";

// 默认语言
export const DEFAULT_LANGUAGE = [
  LanguageTypeEnum.C,
  LanguageTypeEnum.C_PLUS_PLUS,
  LanguageTypeEnum.JAVA,
  LanguageTypeEnum.PYTHON
]