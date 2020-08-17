/*
 * File: cmsProblemMenu.ts
 * Description: 后台管理系统题目集相关路由表
 * Created: 2020-08-16 16:49:36
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {MenuRouterConfig} from "./config";

export const CMS_PROBLEM_AND_PROBLEM_SET_MENU: MenuRouterConfig = {
  key: "/cms/problem_manage",
  title: "题目&题目集",
  path: "/cms/problem_manage",
  icon: "ProfileOutlined",
  isShowInMenu: true,
  children: [
    {
      key: "/cms/problem_manage/problems",
      component: "ProblemManage",
      title: "题目管理",
      path: "/cms/problem_manage",
      isShowInMenu: true
    },
    {
      key: "/cms/problem_manage/problem_sets",
      component: "ProblemSetManage",
      title: "题目集管理",
      path: "/cms/problem_manage/problem_sets",
      isShowInMenu: true
    },
    {
      key: "/cms/problem_manage/problems/edit",
      component: "ProblemEdit",
      title: "题目编辑",
      path: "/cms/problem_manage/problems/edit/:id",
      isShowInMenu: false
    },
    {
      key: "/cms/problem_manage/problem_sets/edit",
      component: "ProblemSetEdit",
      title: "题目集编辑",
      path: "/cms/problem_manage/problem_sets/edit/:id",
      isShowInMenu: false
    }
  ]
}