/*
 * File: submission.ts
 * Description: 提交相关的业务模型
 * Created: 2020-7-31 13:35:41
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

export interface Submission {
  problemId?: number;
  codeContent: string;
  language: string;
  judgePreference: string;
  createTime?: number;
  judgeCondition?: string;
  memoryCost?: number;
  timeCost?: number;
}

export interface JudgeResultForSingleTestCase {
  realTimeCost?: number,
  memoryCost?: number,
  cpuTimeCost?: number,
  condition?: number,
  stdinPath?: string,
  stdoutPath?: string,
  stderrPath?: string,
  message?: string;
}

export interface JudgeResult {
  submissionId: number;
  judgeEndTime: number;
  extraInfo: string[];
  judgeResults: JudgeResultForSingleTestCase[];
}

export interface SubmissionDetail extends Submission {
  judgeResult: JudgeResult;
}