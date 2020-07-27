/*
 * File: problem.ts
 * Description: problem
 * Created: 2020-7-19 18:02
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


/**
 * @author yuzhanglong
 * @description 问题problem 类型
 * @date 2020-7-23 22:55
 */
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

/**
 * @author yuzhanglong
 * @description problem的测试样例
 * @date 2020-7-23 22:56
 */
export interface ProblemTestCase {
  id?: number;
  stdIn?: string;
  expectedStdOut?: string;
  description?: string;
}


/**
 * @author yuzhanglong
 * @description 问题限制
 * @date 2020-7-23 22:56
 */
export interface ProblemLimitation {
  timeLimit?: number;
  memoryLimit?: number;
  cpuTimeLimit?: number;
  outputLimit?: number;
  allowedLanguage: string[];
}