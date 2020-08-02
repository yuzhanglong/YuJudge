/*
 * File: common.ts
 * Description: 一般项业务模型
 * Created: 2020-7-22 22:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {AxiosResponse} from "axios";

/**
 * @author yuzhanglong
 * @description 服务端基础响应内容
 * 包括：
 * code -- 错误码
 * message -- 信息
 * request -- 请求的url地址
 * @date 2020-8-2 8:49
 */
export interface BaseResponse extends AxiosResponse {
  code?: string;
  message?: string;
  request?: string | null;
}


/**
 * @author yuzhanglong
 * @description 带有分页请求的响应
 * @date 2020-8-2 8:49
 */
export interface PaginationResponse extends BaseResponse {
  data: Pagination;
}

/**
 * @author yuzhanglong
 * @description 分页响应的基本信息
 * @date 2020-8-2 8:51
 */
export interface Pagination {
  count?: number;
  page?: number;
  total?: number;
  totalPage?: number;
  items?: any;
}