/*
 * File: problem.ts
 * Description: problem
 * Created: 2020-7-19 18:02
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


// 问题类型
export interface Problem {
  id?: number;
  createTime?: number;
  characterTags?: string[];
  name?: string;
  content?: string;
  timeLimit?: number;
  cpuTimeLimit?: number;
  outputLimit?: number;
  allowedLanguage?: string[];
  closed?: boolean;
}


// 问题的测试样例
export interface ProblemTestCase {
  id?: number;
  stdIn?: string | null;
  expectedStdOut?: string | null;
  description?: string;
}


// 问题限制
export interface ProblemLimitation {
  timeLimit?: number;
  memoryLimit?: number;
  cpuTimeLimit?: number;
  outputLimit?: number;
  allowedLanguage: string[];
}