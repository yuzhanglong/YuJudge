/*
 * File: request.ts
 * Description: 请求总配置，最终返回一个request对象
 * Created: 2020-7-18 18:00:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import axios from 'axios';
import {TIME_OUT, BASE_URL, LOADING_MIN_TIME} from "../config/config";
import {removeLoading, showLoading} from "../utils/dom";


export enum REQUEST_TYPES {
  GET = "get",
  POST = "post",
  DELETE = "delete",
}

const request = axios.create({
  timeout: TIME_OUT,
  baseURL: BASE_URL
});

let requestCount = 0;


request.interceptors.request.use(config => {
  if (requestCount === 0) {
    showLoading();
    requestCount++;
  }
  return config;
}, err => {
  return Promise.reject(err);
})

request.interceptors.response.use(response => {
  requestCount--;
  if (requestCount <= 0) {
    requestCount = 0;
    setTimeout(() => {
      removeLoading();
    }, LOADING_MIN_TIME);
  }
  return response.data;
}, err => {
  return Promise.reject(err.response.data);
})

export default request;
