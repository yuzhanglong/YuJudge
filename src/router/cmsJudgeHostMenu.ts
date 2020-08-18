/*
 * File: cmsJudgeHostMenu.ts
 * Description: 判题机管理相关路由表
 * Created: 2020-8-18 12:18:13
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {MenuRouterConfig} from "./config";

export const JUDGE_HOST_MANAGE_MENU: MenuRouterConfig[] = [
  {
    key: "/cms/judge_hosts",
    title: "判题机",
    path: "/cms/judge_hosts",
    icon: "CloudServerOutlined",
    component: "JudgeHostManage",
    isShowInMenu: true
  },
  {
    key: "/cms/judge_hosts/inspect/:judgeHostId",
    component: "JudgeHostInspect",
    title: "判题机详情",
    path: "/cms/judge_hosts/inspect/:judgeHostId",
    isShowInMenu: false
  },
]
