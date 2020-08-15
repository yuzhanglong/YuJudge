/*
 * File: dateTime.ts
 * Description: 时间处理工具
 * Created: 2020/7/21
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import moment from "moment";
import {Moment} from "moment";

export const timestampToDateTime = (timestamp: number): string => {
  let time = new Date(timestamp);
  return time.toLocaleString();
}

// 传入一个开始时间和一个结束时间，转化为一个moment对象数组，用来适配antd的rangePicker
export const getDateRangeMomentArray = (start: number, end: number) => {
  return [
    moment(start),
    moment(end)
  ]
}

// antd的rangePicker的输出转一般数组
export const dateRangeMomentArrayToTimeStampArray = (timeRange: Moment[]) => {
  return [
    timeRange[0].toDate(),
    timeRange[0].toDate()
  ]
}