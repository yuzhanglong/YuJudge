/*
 * File: enumerations.ts
 * Description: 项目枚举数据
 * Created: 2020-8-2 20:58
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

// 判题状态
export enum JudgeConditionEnum {
  PENDING = "PENDING",
  ACCEPT = "ACCEPT",
  WRONG_ANSWER = "WRONG_ANSWER",
  COMPILE_ERROR = "COMPILE_ERROR",
  MEMORY_LIMIT_EXCEED = "MEMORY_LIMIT_EXCEED",
  TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED",
  WAITING = "WAITING",
  SEGMENTATION_FAULT = "SEGMENTATION_FAULT",
  RUNTIME_ERROR = "RUNTIME_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR"
}

// 语言类型
export enum LanguageTypeEnum {
  C = "C",
  C_PLUS_PLUS = "C_PLUS_PLUS",
  JAVA = "JAVA",
  PYTHON = "PYTHON",
}

// problemHome页面左侧导航的key
export enum ProblemHoneTabKeyEnum {
  PROBLEM = "problem",
  SOLUTION = "solutions",
  SUBMISSION = "submission",
}

// 排名颜色
export enum RankingColorEnum {
  RANKING_FIRST = "#f5222d",
  RANKING_SECOND = "#ff7a45",
  RANKING_THIRD = "#ffa940",
  RANKING_DEFAULT = "#8c8c8c"
}


// 判题状态
export enum ProblemSetConditionEnum {
  // 运行中
  RUNNING = "RUNNING",

  // 已截止,
  CLOSED = "CLOSED",

  // 未开始
  NOT_STARTED = "NOT_STARTED"
}


// 公告优先级
export enum NoticePriority {
  IMPORTANT = "IMPORTANT",
  COMMON = "COMMON",
}