/*
 * File: dataPersistence.ts
 * Description: 项目数据保存工具，例如localstorage相关操作
 * Created: 2020-8-2 15:00
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

// 保存用户代码，其中key为problem对应的id，value为代码内容
import {TOKEN} from "../config/config";

export const saveCode = (problemId: string, code: string) => {
  window.localStorage.setItem(problemId, code);
}

// 通过problemId，获取用户保存的代码
export const getCode = (problemId: string): string | null => {
  return window.localStorage.getItem(problemId);
}

// 存储token
export const setToken = (token: string) => {
  window.localStorage.setItem(TOKEN, token);
}