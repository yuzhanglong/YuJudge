/*
 * File: userRequest.ts
 * Description: 用户相关请求接口封装
 * Created: 2020-08-04 18:47:20
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import request, {REQUEST_TYPES} from "./request";
import {LoginFormData, RegisterFormData} from "../models/user";
import {getToken} from "../utils/dataPersistence";
import {UsersPaginationRequest} from "../models/pagination";


// 获取验证码相关信息
export const getCheckCodeInfo = () => {
  return request.get(
    "/user/get_check_code",
    {
      method: REQUEST_TYPES.GET
    }
  )
}


// 用户登录
export const login = (loginFormData: LoginFormData) => {
  return request.post(
    "/user/login",
    loginFormData,
    {
      method: REQUEST_TYPES.POST
    }
  )
}

// 用户注册
export const register = (registerFormData: RegisterFormData) => {
  return request.post(
    "/user/register",
    registerFormData,
    {
      method: REQUEST_TYPES.POST
    }
  )
}

// 获取活跃用户
export const getActiveUserInfo = (userAmount: number) => {
  return request.get(
    "/user/get_active_user",
    {
      headers: {
        Authorization: getToken()
      },
      params: {
        amount: userAmount
      }
    }
  )
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get(
    "/user/get_user_info",
    {
      headers: {
        Authorization: getToken()
      },
    }
  )
}

// 分页获取多个用户信息
export const getUsers = (params: UsersPaginationRequest) => {
  return request.get(
    "/user/get_users",
    {
      headers: {
        Authorization: getToken()
      },
      params: {
        start: params.start,
        count: params.count
      }
    }
  )
}

// 删除用户
export const deleteUser = (userId: number) => {
  return request.delete(
    "/user/delete_user/" + userId,
    {
      headers: {
        Authorization: getToken()
      }
    }
  )
}