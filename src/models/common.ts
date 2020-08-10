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


// 带有分页请求的响应
export interface PaginationResponse extends BaseResponse {
  data: Pagination;
}

// 分页响应的基本信息
export interface Pagination {
  count?: number;
  page?: number;
  total?: number;
  totalPage?: number;
  items?: any;
}

// 上传凭证响应
export interface UploadTokenData {
  uploadToken: string;
}


export interface PaginationRequest {
  start: number;
  count: number;
}

export interface ProblemSetPaginationRequest extends PaginationRequest {
  limit: boolean,
  search: string | null
}