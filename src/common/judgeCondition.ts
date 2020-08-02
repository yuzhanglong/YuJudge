/*
 * File: judgeCondition.ts
 * Description: 判题相关信息的一些配置，
 * 例如标签颜色、展示给用户的文本数据
 * Created: 2020-8-2 9:01
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {JudgeConditionEnum} from "./enumerations";


export const JUDGE_CONDITION_COLORS: { [key: string]: string; } = {
  [JudgeConditionEnum.ACCEPT]: "#52c41a",
  [JudgeConditionEnum.COMPILE_ERROR]: "#9254de",
  [JudgeConditionEnum.WRONG_ANSWER]: "#ff4d4f",
  [JudgeConditionEnum.MEMORY_LIMIT_EXCEED]: "#2f54eb",
  [JudgeConditionEnum.TIME_LIMIT_EXCEEDED]: "#d4b106",
  [JudgeConditionEnum.PENDING]: "#8c8c8c",
  [JudgeConditionEnum.WAITING]: "#8c8c8c",
  [JudgeConditionEnum.SEGMENTATION_FAULT]: "#08979c"
}

export const JUDGE_CONDITION_TAG_NAMES : { [key: string]: string; } = {
  [JudgeConditionEnum.ACCEPT]: "ACCEPT",
  [JudgeConditionEnum.COMPILE_ERROR]: "COMPILE ERROR",
  [JudgeConditionEnum.WRONG_ANSWER]: "WRONG ANSWER",
  [JudgeConditionEnum.MEMORY_LIMIT_EXCEED]: "MEMORY LIMIT EXCEED",
  [JudgeConditionEnum.TIME_LIMIT_EXCEEDED]: "TIME LIMIT EXCEEDED",
  [JudgeConditionEnum.PENDING]: "PENDING",
  [JudgeConditionEnum.WAITING]: "WAITING",
  [JudgeConditionEnum.SEGMENTATION_FAULT]: "SEGMENTATION FAULT"
}