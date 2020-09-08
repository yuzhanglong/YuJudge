/*
 * File: ConditionTag.tsx
 * Description: 判题状态标签
 * Created: 2020-9-8 20:44:09
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {JudgeConditionEnum} from "../../common/enumerations";
import classNames from "classnames";
import {Tag} from "antd";
import style from "./conditionTag.module.scss";
import {
  JUDGE_CONDITION_COLORS,
  JUDGE_CONDITION_SIMPLE_NAME,
  JUDGE_CONDITION_TAG_NAMES
} from "../../common/judgeCondition";

interface ConditionTagProps {
  condition: string;
  detail: any;
  isEntire?: boolean;
  onSubmissionTagClick?: (data: any) => void;
}

const ConditionTag: React.FunctionComponent<ConditionTagProps> = (props) => {

  // 获取判题结果标签颜色
  const getJudgeConditionColor = (condition: string) => {
    return JUDGE_CONDITION_COLORS[condition];
  }

  // 获取判题结果标签名称
  const getJudgeConditionTagName = (condition: string) => {
    return props.isEntire ? JUDGE_CONDITION_TAG_NAMES[condition] : JUDGE_CONDITION_SIMPLE_NAME[condition];
  }

  // 渲染判题结果标签
  const isLoading = (props.condition === JudgeConditionEnum.WAITING || props.condition === JudgeConditionEnum.PENDING);

  const className = classNames(style.judge_condition_tag_wrap, {
    [style.judge_condition_tag_wrap_loading]: isLoading
  });

  // 判题状态标签被单击
  const onSeeSubmissionTagClick = (detail: any, condition: string) => {
    const isWaiting = condition === JudgeConditionEnum.WAITING || condition === JudgeConditionEnum.PENDING;
    if (props.onSubmissionTagClick && !isWaiting) {
      props.onSubmissionTagClick(detail);
    }
  }

  return (
    <div>
      <Tag color={getJudgeConditionColor(props.condition)}
           onClick={() => onSeeSubmissionTagClick(props.detail, props.condition)}
           className={className}>
        {getJudgeConditionTagName(props.condition)}
      </Tag>
    </div>
  )
}

ConditionTag.defaultProps = {
  isEntire: true
}

export default ConditionTag;