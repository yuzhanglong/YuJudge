/*
 * File: judgeCondition.ts
 * Description: 判题相关信息的一些配置，
 * 例如标签颜色、展示给用户的文本数据
 * Created: 2020-8-2 9:01
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {JudgeConditionEnum} from './enumerations';


export const JUDGE_CONDITION_COLORS: { [key: string]: string; } = {
  [JudgeConditionEnum.ACCEPT]: '#52c41a',
  [JudgeConditionEnum.COMPILE_ERROR]: '#9254de',
  [JudgeConditionEnum.WRONG_ANSWER]: '#ff4d4f',
  [JudgeConditionEnum.MEMORY_LIMIT_EXCEED]: '#2f54eb',
  [JudgeConditionEnum.TIME_LIMIT_EXCEEDED]: '#d4b106',
  [JudgeConditionEnum.PENDING]: '#8c8c8c',
  [JudgeConditionEnum.WAITING]: '#8c8c8c',
  [JudgeConditionEnum.SEGMENTATION_FAULT]: '#08979c',
  [JudgeConditionEnum.RUNTIME_ERROR]: '#2347d2',
  [JudgeConditionEnum.UNKNOWN_ERROR]: '#391085',
  [JudgeConditionEnum.OUTPUT_LIMIT_EXCEED]: '#d4b106'
}

export const JUDGE_CONDITION_TAG_NAMES: { [key: string]: string; } = {
  [JudgeConditionEnum.ACCEPT]: 'ACCEPT',
  [JudgeConditionEnum.COMPILE_ERROR]: 'COMPILE ERROR',
  [JudgeConditionEnum.WRONG_ANSWER]: 'WRONG ANSWER',
  [JudgeConditionEnum.MEMORY_LIMIT_EXCEED]: 'MEMORY LIMIT EXCEED',
  [JudgeConditionEnum.TIME_LIMIT_EXCEEDED]: 'TIME LIMIT EXCEEDED',
  [JudgeConditionEnum.PENDING]: 'PENDING',
  [JudgeConditionEnum.WAITING]: 'WAITING',
  [JudgeConditionEnum.SEGMENTATION_FAULT]: 'SEGMENTATION FAULT',
  [JudgeConditionEnum.RUNTIME_ERROR]: 'RUNTIME ERROR',
  [JudgeConditionEnum.UNKNOWN_ERROR]: 'UNKNOWN ERROR',
  [JudgeConditionEnum.OUTPUT_LIMIT_EXCEED]: 'OUTPUT LIMIT EXCEED'
}


export const JUDGE_CONDITION_TAG_NAMES_CHINESE: { [key: string]: string; } = {
  [JudgeConditionEnum.ACCEPT]: 'accept',
  [JudgeConditionEnum.COMPILE_ERROR]: 'compile error',
  [JudgeConditionEnum.WRONG_ANSWER]: 'wrong answer',
  [JudgeConditionEnum.MEMORY_LIMIT_EXCEED]: 'memory exceed',
  [JudgeConditionEnum.TIME_LIMIT_EXCEEDED]: 'time exceed',
  [JudgeConditionEnum.SEGMENTATION_FAULT]: 'segmentation fault',
  [JudgeConditionEnum.RUNTIME_ERROR]: 'runtime error',
  [JudgeConditionEnum.UNKNOWN_ERROR]: 'unknown error',
  [JudgeConditionEnum.OUTPUT_LIMIT_EXCEED]: 'output error'
}


export const JUDGE_CONDITION_SIMPLE_NAME: { [key: string]: string; } = {
  [JudgeConditionEnum.ACCEPT]: 'AC',
  [JudgeConditionEnum.COMPILE_ERROR]: 'CE',
  [JudgeConditionEnum.WRONG_ANSWER]: 'WA',
  [JudgeConditionEnum.MEMORY_LIMIT_EXCEED]: 'MLE',
  [JudgeConditionEnum.TIME_LIMIT_EXCEEDED]: 'TLE',
  [JudgeConditionEnum.SEGMENTATION_FAULT]: 'SF',
  [JudgeConditionEnum.RUNTIME_ERROR]: 'RE',
  [JudgeConditionEnum.UNKNOWN_ERROR]: 'UKE',
  [JudgeConditionEnum.OUTPUT_LIMIT_EXCEED]: 'OLE'
}
