/*
 * File: enumerations.ts
 * Description: 项目枚举数据
 * Created: 2020-8-2 20:58
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

/**
 * @author yuzhanglong
 * @description 判题状态
 * @date 2020-8-2 8:49
 */
export enum JudgeConditionEnum {
  PENDING = "PENDING",
  ACCEPT = "ACCEPT",
  WRONG_ANSWER = "WRONG_ANSWER",
  COMPILE_ERROR = "COMPILE_ERROR",
  MEMORY_LIMIT_EXCEED = "MEMORY_LIMIT_EXCEED",
  TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED",
  WAITING = "WAITING",
  SEGMENTATION_FAULT = "SEGMENTATION_FAULT",
  RUNTIME_ERROR = "RUNTIME_ERROR"
}

/**
 * @author yuzhanglong
 * @description 语言类型
 * @date 2020-8-1
 */
export enum LanguageTypeEnum {
  C = "C",
  C_PLUS_PLUS = "C_PLUS_PLUS",
  JAVA = "JAVA",
  PYTHON = "PYTHON",
}