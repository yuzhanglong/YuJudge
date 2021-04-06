/*
 * File: common.ts
 * Description: 一般性请求封装
 * Created: 2020-08-05 20:19:19
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import request from './interceptor';

// 获取上传凭证
export const getUploadToken = () => {
  return request.get(
    '/common/upload_token'
  )
}

// 获取全局统计信息
export const getGlobalCount = () => {
  return request.get(
    '/common/get_global_count'
  )
}

// 获取每日一句
export const getDailyWord = () => {
  return request.get(
    '/common/get_daily_word',
    {
      headers: {
        loading: true
      }
    }
  )
}

// 切换验证码验证
export const changeCheckCodeCondition = () => {
  return request.put(
    '/common/check_code_condition',
    {
      headers: {
        loading: true
      }
    }
  )
}

// 获取验证码验证
export const getCheckCodeCondition = () => {
  return request.get(
    '/common/check_code_condition'
  )
}