/*
 * File: childCmp.ts
 * Description: 一般页面路由表
 * Created: 2020-08-08 20:30:12
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {MenuRouterConfig} from "./config";
import {COMMON_PROBLEM_SET_MENU} from "./commonProblemSetMenu";

export const COMMON_MENUS: MenuRouterConfig[] = [
  {
    key: "/landing",
    component: "Landing",
    title: "着陆页",
    path: "/",
  },
  {
    key: "/login",
    component: "Login",
    title: "用户登录",
    path: "/login",
  },
  COMMON_PROBLEM_SET_MENU
]