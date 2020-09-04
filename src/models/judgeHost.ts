/*
 * File: judgeHost.ts
 * Description: 判题机相关业务模型
 * Created: 2020-08-16 21:36:52
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

// 判题机信息
export interface JudgeHostInfo {
  id: number;
  active: boolean;
  baseUrl: string;
  name: string;
  condition: JudgeHostCondition;
  createTime: number;
  connection: boolean;
}

// 判题机状态
export interface JudgeHostCondition {
  workPath: string;
  scriptPath: string;
  resolutionPath: string;
  port: number;
  workingAmount: number;
  cpuCoreAmount: number;
  memoryCostPercentage: number;
  cpuCostPercentage: number;
  queueAmount: number;
  maxWorkingAmount: number;
  version: string;
}

// 判题机创建
export interface JudgeHostRequest {
  name: string;
  baseUrl: string;
  port: number;
}