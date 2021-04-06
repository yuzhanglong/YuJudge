/*
 * File: dataPersistence.ts
 * Description: 项目数据保存工具，例如localstorage相关操作
 * Created: 2020-8-2 15:00
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import {TOKEN_KEY, USER_INFO_KEY} from '../config/config';
import {UserInfo} from '../models/user';


// 清空localstorage
export const clearStorage = () => {
  window.localStorage.clear();
}

// 保存用户代码，其中key为problem对应的id，value为代码内容
export const saveCode = (problemId: string, code: string) => {
  window.localStorage.setItem(problemId, code);
}

// 通过problemId，获取用户保存的代码
export const getCodeFromStorage = (problemId: string): string | null => {
  return window.localStorage.getItem(problemId);
}

// 存储token
export const setToken = (token: string) => {
  window.localStorage.setItem(TOKEN_KEY, token);
}

// 获取token
export const getTokenFromStorage = () => {
  return window.localStorage.getItem(TOKEN_KEY);
}

// 保存用户信息，一般在用户登录之后
export const saveUserInfo = (userInfo: UserInfo) => {
  const jsonData = JSON.stringify(userInfo);
  window.localStorage.setItem(USER_INFO_KEY, jsonData);
}

// 获取用户信息
export const getUserInfoFromStorage = (): UserInfo | null => {
  const data = window.localStorage.getItem(USER_INFO_KEY);
  return data ? JSON.parse(data) : null;
}