/*
 * File: common.ts
 * Description: 一般项业务模型
 * Created: 2020-7-22 22:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {AxiosResponse} from "axios";
import {SubmissionCountInfo} from "./submissionInfo";

// 服务端基础响应内容
export interface BaseResponse extends AxiosResponse {
  // 错误码
  code?: string;
  //信息
  message?: string;
  // 请求的url地址
  request?: string | null;
}


// 上传凭证响应
export interface UploadTokenData {
  uploadToken: string;
}

// 全局统计
export interface GlobalCount {
  problemAmount: number;
  problemSetAmount: number;
  submissionAmount: number;
  userAmount: number;
  judgeHostAmount: number;
  recentSubmission: SubmissionCountInfo[];
}

// 每日一句
export interface DailyWord {
  title: string;
  content: string;
}
