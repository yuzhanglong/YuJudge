/*
 * File: request.ts
 * Description: 请求总配置，最终返回一个request对象
 * Created: 2020-7-18 18:00:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import axios from 'axios';
import {TIME_OUT, BASE_URL} from "../config/config";


const request = axios.create({
  timeout: TIME_OUT,
  baseURL: BASE_URL
});


export default request;