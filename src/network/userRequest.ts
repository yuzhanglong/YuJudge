/*
 * File: userRequest.ts
 * Description: 用户相关请求接口封装
 * Created: 2020-08-04 18:47:20
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import request from './interceptor';
import {LoginFormData, RegisterFormData} from '../models/user';
import {UsersPaginationRequest} from '../models/pagination';


// 获取验证码相关信息
export const getCheckCodeInfo = () => {
  return request.get(
    '/user/get_check_code'
  )
}


// 用户登录
export const login = (loginFormData: LoginFormData) => {
  return request.post(
    '/user/login',
    loginFormData
  )
}

// 用户注册
export const register = (registerFormData: RegisterFormData) => {
  return request.post(
    '/user/register',
    registerFormData
  )
}

// 获取活跃用户
export const getActiveUserInfo = (userAmount: number) => {
  return request.get(
    '/user/get_active_user',
    {
      params: {
        amount: userAmount
      },
      headers: {
        loading: true
      }
    }
  )
}

// 获取用户信息
export const getUserInfo = (uid: number | null = null) => {
  return request.get(
    '/user/user_info',
    {
      params: {
        uid: uid
      },
      headers: {
        loading: true
      }
    }
  )
}

// 分页获取多个用户信息
export const getUsers = (params: UsersPaginationRequest) => {
  return request.get(
    '/user/get_users',
    {
      params: {
        start: params.start,
        count: params.count,
        group: params.group
      }
    }
  )
}

// 删除用户
export const deleteUser = (userId: number) => {
  return request.delete(
    '/user/delete_user/' + userId
  )
}

// 创建用户
export const createUser = (nickname: string, password: string) => {
  return request.post(
    '/user/user',
    {
      nickname: nickname,
      password: password
    }
  );
}

// 分配用户组
export const allocateUserUserGroup = (userId: number, userGroupIds: string[]) => {
  return request.put(
    '/user/user_user_groups',
    {
      userId: userId,
      userGroupIds: userGroupIds
    }
  );
}

// 编辑用户
export const editUser = (uid: number, nickname: string, password: string) => {
  return request.put(
    '/user/user/' + uid,
    {
      nickname: nickname,
      password: password
    }
  );
}