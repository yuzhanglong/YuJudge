/*
 * File: ProblemSetDescription.tsx
 * Description: 题目集信息展示
 * Created: 2020-08-12 11:23:40
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Badge, Descriptions} from "antd";
import {timestampToDateTime} from "../../../../utils/dateTime";
import {ProblemSet} from "../../../../models/problemSet";
import {PROGRAM_LANGUAGE_NAME} from "../../../../common/programLanguage";
import {ProblemSetConditionEnum} from "../../../../common/enumerations";

interface ProblemSetDescriptionProps {
  problemSetInfo: ProblemSet;
}

const ProblemSetDescription: React.FunctionComponent<ProblemSetDescriptionProps> = (props) => {

  // 获取允许的编程语言信息
  const getAllowedLanguageInfo = (languages: string[]) => {
    let res = "";
    const len = languages.length;
    for (let i = 0; i < len; i++) {
      res = res + PROGRAM_LANGUAGE_NAME[languages[i]];
      if (i < len - 1) {
        res += " / ";
      }
    }
    return res;
  }

  // 获取题目集状态
  const getProblemSetCondition = (condition: string | undefined) => {
    switch (condition) {
      case ProblemSetConditionEnum.RUNNING:
        return "进行中";
      case ProblemSetConditionEnum.CLOSED:
        return "已关闭";
      default:
        return "未开始";
    }
  }

  return (
    <Descriptions bordered column={4} size={"middle"}>
      <Descriptions.Item label="题目集名称" span={2}>
        {props.problemSetInfo.name}
      </Descriptions.Item>
      <Descriptions.Item label="创建者" span={2}>
        {props.problemSetInfo.creator?.nickname}
      </Descriptions.Item>
      <Descriptions.Item label="开始时间" span={2}>
        {timestampToDateTime(props.problemSetInfo.startTime || 0)}
      </Descriptions.Item>
      <Descriptions.Item label="截止时间" span={2}>
        {timestampToDateTime(props.problemSetInfo.deadline || 0)}
      </Descriptions.Item>
      <Descriptions.Item label="题目集状态" span={4}>
        <Badge status="processing" text={getProblemSetCondition(props.problemSetInfo.condition)}/>
      </Descriptions.Item>
      <Descriptions.Item label="判题偏好" span={2}>
        {props.problemSetInfo.judgePreference}
      </Descriptions.Item>
      <Descriptions.Item label="语言限制" span={2}>
        {getAllowedLanguageInfo(props.problemSetInfo.allowedLanguage || [])}
      </Descriptions.Item>
      <Descriptions.Item label="题目集描述">
        {props.problemSetInfo.description}
      </Descriptions.Item>
    </Descriptions>
  )
}


export default ProblemSetDescription;