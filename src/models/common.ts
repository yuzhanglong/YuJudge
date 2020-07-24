/*
 * File: common.ts
 * Description: 一般项业务模型
 * Created: 2020-7-22 22:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {AxiosResponse} from "axios";


export interface BaseResponse extends AxiosResponse {
  code?: string;
  message?: string;
  request?: string | null;
}

export interface PaginationResponse extends BaseResponse {
  data: Pagination;
}


export interface Pagination {
  count?: number;
  page?: number;
  total?: number;
  totalPage?: number;
  items?: any;
}