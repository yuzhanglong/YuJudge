/*
 * File: request.ts
 * Description: 请求总配置，最终返回一个request对象
 * Created: 2020-7-18 18:00:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import axios from 'axios';
import {TIME_OUT, BASE_URL} from "../config/config";

export enum REQUEST_TYPES {
  GET = "get",
  POST = "post",
  DELETE = "delete",
}

const request = axios.create({
  timeout: TIME_OUT,
  baseURL: BASE_URL
})

axios.interceptors.request.use(config => {
  // TODO:
  //  1.发送网络请求时，在页面中添加一个loading组件作为动画
  //  2.某些网络请求要求用户必须登录，可以在请求中判断是否携带了token，没有携带token直接跳转到login页面
  //  3.对某些请求参数进行序列化
  return config;
}, err => {
  return err;
})

request.interceptors.response.use(response => {
  return response.data;
}, err => {
  return Promise.reject(err.response.data);
})

export default request;
