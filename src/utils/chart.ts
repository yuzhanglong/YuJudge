/*
 * File: chart.ts
 * Description: 图标数据处理相关
 * Created: 2020-9-5 21:35:57
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


// 处理用户的提交信息，将其转变为支持表格渲染的数据结构
import {UserSubmissionCount} from "../models/submission";

export const generateUserSubmissionData = (recentSubmission: UserSubmissionCount[]) => {
  let result = [];
  for (let i = 0; i < recentSubmission.length; i++) {
    let tmp = recentSubmission[i];
    const d = new Date(tmp.time);
    result.push(
      {
        date: d.getMonth() + 1 + "." + d.getDate(),
        amount: tmp.totalAmount,
        type: "通过",
      },
      {
        date: d.getMonth() + 1 + "." + d.getDate(),
        amount: tmp.totalAmount - tmp.acceptAmount,
        type: "未通过",
      },
    )
  }
  return result;
}