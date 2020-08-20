/*
 * File: commonProblemSetMenu.ts
 * Description: 题目集相关路由表【非cms】
 * Created: 2020-8-20 16:34:19
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {MenuRouterConfig} from "./config";

export const COMMON_PROBLEM_SET_MENU: MenuRouterConfig = {
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
      key: "/problem_set/:problemSetId/count",
      component: "ProblemSetCount",
      title: "统计",
      path: "/problem_set/:problemSetId/count",
    },
    {
      key: "/problem_set/:problemSetId/problem/:problemId",
      component: "ProblemHome",
      title: "问题",
      path: "/problem_set/:problemSetId/problem/:problemId",
    },
  ]
}