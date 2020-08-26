/*
 * File: submissionInfo.ts
 * Description: 提交相关的业务模型
 * Created: 2020-7-31 13:35:41
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {JudgeConditionEnum} from "../common/enumerations";
import {UserInfo} from "./user";
import {JudgeHostInfo} from "./judgeHost";

// 一次提交
export interface SubmissionInfo {
  id?: number;
  problemId?: number;
  codeContent: string;
  language: string;
  judgePreference: string;
  createTime?: number;
  judgeCondition?: string;
  memoryCost?: number;
  timeCost?: number;
  problemSetId?: number;
  creator?: UserInfo;
}

// 某次测试样例的判题结果
export interface JudgeResultForSingleTestCase {
  realTimeCost?: number,
  memoryCost?: number,
  cpuTimeCost?: number,
  condition?: JudgeConditionEnum,
  stdinPath?: string,
  stdoutPath?: string,
  stderrPath?: string,
  message?: string;
}

// 判题结果
export interface JudgeResult {
  submissionId: number;
  judgeEndTime: number;
  extraInfo: string[];
  judgeResults: JudgeResultForSingleTestCase[];
}

// 提交细节信息
export interface SubmissionDetail extends SubmissionInfo {
  judgeResult: JudgeResult;
  judgeHost?: JudgeHostInfo;
}

// 记分板单条项目、单题的统计情况
export interface ScoreBoardSolutionInfo {
  problemId: number;
  tryAmount: number;
  isAccepted: boolean;
  timeCost: number;
  isFirstAc: boolean;
}

// 记分板单条项目
export interface ScoreBoardItem {
  solutionInfo: ScoreBoardSolutionInfo[];
  teamInfo: UserInfo;
}

// 记分板内容
export interface ScoreBoardInfo {
  participants: ScoreBoardItem[];
  problemAmount: number;
  frozen: boolean;
}

// 提交统计信息
export interface SubmissionCountInfo {
  time: number;
  hour: number;
  submissionAmount: number;
}

// 用户提交数据统计
export interface UserSubmissionCount {
  acceptAmount: number;
  time: number;
  totalAmount: number;
}

// 用户判题结果统计
export interface UserJudgeResultCount {
  amount: number;
  type: string;
}