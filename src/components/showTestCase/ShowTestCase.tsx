/*
 * File: ShowTestCase.tsx
 * Description: 展示测试点状态的组件
 * Created: 2020-8-24 13:00:16
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {JudgeResultForSingleTestCase} from "../../models/submission";
import {Tag, Tooltip} from "antd";
import {
  JUDGE_CONDITION_COLORS,
  JUDGE_CONDITION_SIMPLE_NAME,
  JUDGE_CONDITION_TAG_NAMES_CHINESE
} from "../../common/judgeCondition";

interface ShowTestCaseProps {
  // 所有测试样例
  testCases: JudgeResultForSingleTestCase[];
}

const ShowTestCase: React.FunctionComponent<ShowTestCaseProps> = (props) => {

  const renderTestCaseTagTip = (res: JudgeResultForSingleTestCase, index: number) => {
    if (res && res.message) {
      return (
        <div>
          <div>
            {`测试点${index}#`}
          </div>
          <div>
            {`${JUDGE_CONDITION_TAG_NAMES_CHINESE[res.message]}`}
          </div>
        </div>
      )
    }
  }


  // 渲染标签
  const renderTags = () => {
    return props.testCases.map((res, index) => {
      if (res && res.message) {
        return (
          <Tooltip title={renderTestCaseTagTip(res, index)}>
            <Tag key={res.stderrPath} color={JUDGE_CONDITION_COLORS[res.message]}>
              {JUDGE_CONDITION_SIMPLE_NAME[res.message]}
            </Tag>
          </Tooltip>
        )
      } else {
        return null;
      }
    })
  }

  return (
    <div>
      {renderTags()}
    </div>
  )
}

export default ShowTestCase;