/*
 * File: common.ts
 * Description: 一般性请求封装
 * Created: 2020-08-05 20:19:19
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import request, {REQUEST_TYPES} from "./request";
import {getTokenFromStorage} from "../utils/dataPersistence";

// 获取上传凭证
export const getUploadToken = () => {
  return request.get(
    "/common/upload_token",
    {
      method: REQUEST_TYPES.GET
    }
  )
}

// 获取全局统计信息
export const getGlobalCount = () => {
  return request.get(
    "/common/get_global_count",
    {
      headers: {
        Authorization: getTokenFromStorage()
      }
    }
  )
}


