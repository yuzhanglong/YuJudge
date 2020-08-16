/*
 * File: config.ts
 * Description: 全局配置相关
 * Created: 2020-7-18
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

// request的响应时间最大值
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
export const RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT: number = 7;

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