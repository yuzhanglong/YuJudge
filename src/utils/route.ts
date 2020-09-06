/*
 * File: route.ts
 * Description: 路由工具类
 * Created: 2020-9-6 11:43:36
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import {ResultPageParam} from "../common/enumerations";

// 前往结果页
export const goToResult = (route: ResultPageParam) => {
  window.reactRouter.replace("/result/" + route);
}