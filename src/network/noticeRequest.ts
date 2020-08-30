/*
 * File: noticeRequest.ts
 * Description: 公告相关接口的封装
 * Created: 2020-8-26 11:18:04
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import request from "./request";
import {NoticePaginationRequest} from "../models/pagination";

// 通过id来获取problem的基本信息
export const getNotices = (requestBody: NoticePaginationRequest) => {
  return request.get(
    "/notice/get_notices"
  )
}

