/*
 * File: mainMenu.ts
 * Description: 题目集相关路由表【非cms】
 * Created: 2020-8-20 16:34:19
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {MenuRouterConfig} from "./config";

export const MAIN_MENU: MenuRouterConfig[] = [
  {
    key: "/common",
    component: "ProblemSetLayout",
    title: "题目集",
    path: "/common",
    children: [
      {
        key: "/home",
        component: "Home",
        title: "首页",
        path: "/common/home",
      },
      {
        key: "/profile",
        component: "Profile",
        title: "我的",
        path: "/common/profile",
      },
      {
        key: "/problem_sets",
        component: "ProblemSets",
        title: "题目集概览",
        path: "/common/problem_sets",
      },
      {
        key: "/problem_set/:problemSetId/overview",
        component: "ProblemSetHome",
        title: "题目集概览",
        path: "/common/problem_set/:problemSetId/overview",
      },
      {
        key: "/problem_set/:problemSetId/problems",
        component: "ProblemSetProblems",
        title: "题目一览",
        path: "/common/problem_set/:problemSetId/problems",
      },
      {
        key: "/problem_set/:problemSetId/score_board",
        component: "ScoreBoard",
        title: "记分板",
        path: "/common/problem_set/:problemSetId/score_board",
      },
      {
        key: "/problem_set/:problemSetId/count",
        component: "ProblemSetCount",
        title: "统计",
        path: "/common/problem_set/:problemSetId/count",
      },
      {
        key: "/problem_set/:problemSetId/problem/:problemId",
        component: "ProblemHome",
        title: "问题",
        path: "/common/problem_set/:problemSetId/problem/:problemId",
      },
    ]
  }]