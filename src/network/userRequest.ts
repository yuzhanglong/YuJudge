/*
 * File: userRequest.ts
 * Description: 用户相关请求接口封装
 * Created: 2020-08-04 18:47:20
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


// 获取验证码相关信息
import request, {REQUEST_TYPES} from "./request";
import {LoginFormData, RegisterFormData} from "../models/user";

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