/*
 * File: cmsMenu.ts
 * Description: 后台管理系统路由表
 * Created: 2020-08-08 20:29:34
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import {MenuRouterConfig} from "./config";
import {CMS_USERS_MENU} from "./cmsUserMenu";
import {CMS_PROBLEM_AND_PROBLEM_SET_MENU} from "./cmsProblemMenu";
import {JUDGE_HOST_MANAGE_MENU} from "./cmsJudgeHostMenu";

export const CMS_MENUS: MenuRouterConfig[] = [
  {
    key: "/cms",
    component: "Dashboard",
    title: "控制台",
    path: "/cms",
    icon: "DashboardOutlined",
    isShowInMenu: true
  },
  CMS_USERS_MENU,
  CMS_PROBLEM_AND_PROBLEM_SET_MENU,
  ...JUDGE_HOST_MANAGE_MENU,
  {
    key: "/cms/settings",
    title: "设置",
    path: "/cms/settings",
    icon: "SettingOutlined",
    isShowInMenu: true
  }
]