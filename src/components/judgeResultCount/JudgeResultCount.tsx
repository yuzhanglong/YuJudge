/*
 * File: JudgeResultCount.tsx
 * Description: 判题结果统计，主体是饼图，用来统计各种判题结果
 * Created: 2020-8-21 01:08:42
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import {UserJudgeResultCount} from "../../models/submission";
import PieChart from "../charts/PieChart";
import {JUDGE_CONDITION_TAG_NAMES_CHINESE} from "../../common/judgeCondition";

interface JudgeResultCountProps {
  resultCounts: UserJudgeResultCount[];
}

const JudgeResultCount: React.FunctionComponent<JudgeResultCountProps> = (props) => {

  // 处理图表源数据
  const publishResultCounts = () => {
    return props.resultCounts.map(res => {
      return {
        type: JUDGE_CONDITION_TAG_NAMES_CHINESE[res.type],
        amount: res.amount
      }
    })
  }

  return (
    <PieChart
      data={publishResultCounts()}
      angleField={"amount"}
      colorField={"type"}/>
  )
}
JudgeResultCount.defaultProps = {
  resultCounts: []
}

export default JudgeResultCount;