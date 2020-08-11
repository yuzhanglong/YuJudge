/*
 * File: childCmp.ts
 * Description: 一般页面路由表
 * Created: 2020-08-08 20:30:12
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {MenuRouterConfig} from "./config";

export const COMMON_MENUS: MenuRouterConfig[] = [
  {
    key: "/landing",
    component: "Landing",
    title: "用户登录",
    path: "/",
  },
  {
    key: "/login",
    component: "Login",
    title: "用户登录",
    path: "/login",
  },
  {
    key: "/problem_set/:problemSetId",
    component: "ProblemSetLayout",
    title: "题目集",
    path: "/problem_set/:problemSetId",
    children: [
      {
        key: "/problem_set/:problemSetId/overview",
        component: "ProblemSetHome",
        title: "题目集概览",
        path: "/problem_set/:problemSetId/overview",
      },
      {
        key: "/problem_set/:problemSetId/problems",
        component: "ProblemSetProblems",
        title: "题目一览",
        path: "/problem_set/:problemSetId/problems",
      },
      {
        key: "/problem_set/:problemSetId/score_board",
        component: "ScoreBoard",
        title: "记分板",
        path: "/problem_set/:problemSetId/score_board",
      },
      {
        key: "/problem_set/:problemSetId/problem/:problemId",
        component: "ProblemHome",
        title: "问题",
        path: "/problem_set/:problemSetId/problem/:problemId",
      },
    ]
  }
]