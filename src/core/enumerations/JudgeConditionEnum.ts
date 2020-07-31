/*
 * File: JudgeConditionEnum.ts
 * Description: 判题状态的枚举类
 * Created: 2020-7-31 21:39:40
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */
export enum JudgeConditionEnum {
  PENDING = "PENDING",
  ACCEPT = "ACCEPT",
  WRONG_ANSWER = "WRONG_ANSWER",
  COMPILE_ERROR = "COMPILE_ERROR",
  MEMORY_LIMIT_EXCEED = "MEMORY_LIMIT_EXCEED",
  TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED"
}