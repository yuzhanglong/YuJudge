/*
 * File: pagination.ts
 * Description: 分页请求业务模型
 * Created: 2020-08-10 18:55:09
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import {BaseResponse} from "./common";

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

// 基础分页对象
export interface PaginationRequest {
  start: number;
  count: number;
}

// 题目集分页请求
export interface ProblemSetPaginationRequest extends PaginationRequest {
  limit: boolean,
  search: string | null
}

// 获取题目集中的题目的分页请求
export interface ProblemSetProblemPaginationRequest extends PaginationRequest {
  problemSetId: number;
}

// 题目分页请求
export interface ProblemPaginationRequest extends PaginationRequest {
  search: string | null;
}

// 用户信息分页请求
export interface UsersPaginationRequest extends PaginationRequest {
  scope: string | null;
}