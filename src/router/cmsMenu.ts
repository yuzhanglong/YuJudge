/*
 * File: cmsMenu.ts
 * Description: 后台管理系统路由表
 * Created: 2020-08-08 20:29:34
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import {MenuRouterConfig} from "./config";

export const CMS_MENUS: MenuRouterConfig[] = [
  {
    key: "/cms/dashboard",
    component: "Dashboard",
    title: "控制台",
    path: "/cms/dashboard",
    icon: "DashboardOutlined"
  },
  {
    key: "/cms/users",
    title: "用户管理",
    path: "/cms/users",
    icon: "UserOutlined"
  },
  {
    key: "/cms/problem_manage",
    title: "题目&题目集",
    path: "/cms/problem_manage",
    icon: "ProfileOutlined",
    children: [
      {
        key: "/cms/problem_manage/problems",
        component: "ProblemManage",
        title: "题目管理",
        path: "/cms/problem_manage",
      },
      {
        key: "/cms/problem_manage/problem_sets",
        component: "ProblemSetManage",
        title: "题目集管理",
        path: "/cms/problem_manage/problem_sets",
      },
      {
        key: "/cms/problem_manage/problems/edit",
        component: "ProblemEdit",
        title: "题目编辑",
        path: "/cms/problem_manage/problems/edit/:id",
      }
    ]
  },
  {
    key: "/cms/judge_server",
    title: "判题机管理",
    path: "/cms/judge_server",
    icon: "CloudServerOutlined"
  },
  {
    key: "/cms/settings",
    title: "设置",
    path: "/cms/settings",
    icon: "SettingOutlined"
  }
]