/*
 * File: interceptor.ts
 * Description: 请求拦截
 * Created: 2020-8-31 12:29:01
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

// 请求数量
import {removeLoading, showLoading} from '../utils/dom';
import request from './request';
import {AUTHORIZATION_KEY, LOADING_MIN_TIME, NO_CONNECTION_RESPONSE} from '../config/config';
import {clearStorage, getTokenFromStorage} from '../utils/dataPersistence';
import {BAD_TOKEN, NO_TOKEN, USER_GROUP_FORBIDDEN} from '../config/code';
import {message} from 'antd';

let requestCount = 0;

// 拒绝哨兵，防止权限问题被驳回时弹出重复的窗口
let isRefuse = false;


// 加载loading
const loading = () => {
  if (requestCount === 0) {
    showLoading();
    requestCount++;
  }
}

// 删除loading
const deleteLoading = () => {
  requestCount--;
  if (requestCount <= 0) {
    requestCount = 0;
    setTimeout(() => {
      removeLoading();
    }, LOADING_MIN_TIME);
  }
}

// 重置拒绝哨兵
const resetRefuseCondition = () => {
  isRefuse = true;
  setTimeout(() => {
    isRefuse = false;
  }, 4000);
}


request.interceptors.request.use(config => {
  if (config.headers.loading) {
    loading();
  }
  // 添加权限请求头
  config.headers[AUTHORIZATION_KEY] = getTokenFromStorage();
  return config;
}, err => {
  return Promise.reject(err);
})

request.interceptors.response.use(response => {
  deleteLoading();
  return response.data;
}, err => {
  deleteLoading();
  if (err.response) {
    const code = err.response.data.code;
    if ((code === NO_TOKEN || code === BAD_TOKEN) && !isRefuse) {
      message.error('登录信息已经过期, 请重新登录');
      clearStorage();
      window.reactRouter.push('/result/403');
      resetRefuseCondition();
    }
    if (code === USER_GROUP_FORBIDDEN && !isRefuse) {
      message.error('您所在的用户组禁止访问');
      resetRefuseCondition();
    }
  }
  return Promise.reject(err.response ? err.response.data : NO_CONNECTION_RESPONSE);
})

export default request;