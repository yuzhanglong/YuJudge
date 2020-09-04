/*
 * File: common.ts
 * Description: 题目集相关业务模型
 * Created: 2020-08-09 13:31:45
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {UserInfo} from "./user";

export interface ProblemSet {
  name?: string;
  description?: string;
  creator?: UserInfo;
  deadline?: number;
  startTime?: number;
  createTime?: number;
  id?: number;
  judgePreference?: string;
  allowedLanguage?: string[];
  condition?: string;
}

// 题目集散点
export interface ProblemSetScatterItem {
  judgeResult: string,
  userNickName: string,
  time: number;
}

// 时间线
export interface ProblemSetTimelineItem {
  creator: UserInfo;
  isFirstAc: boolean;
  acTime: number;
  problemIndex: number;
}