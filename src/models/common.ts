/*
 * File: common.ts
 * Description: 一般项业务模型
 * Created: 2020-7-22 22:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {AxiosResponse} from "axios";

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