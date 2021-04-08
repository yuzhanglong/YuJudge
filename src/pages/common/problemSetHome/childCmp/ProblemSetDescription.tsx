/*
 * File: ProblemSetDescription.tsx
 * Description: 题目集信息展示
 * Created: 2020-08-12 11:23:40
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { Badge, Descriptions } from 'antd'
import { timestampToDateTime } from '../../../../utils/dateTime'
import { ProblemSet } from '../../../../models/problemSet'
import { PROGRAM_LANGUAGE_NAME } from '../../../../common/programLanguage'
import { ProblemSetConditionEnum } from '../../../../common/enumerations'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface ProblemSetDescriptionProps {
  problemSetInfo: ProblemSet;
}

const ProblemSetDescription: React.FunctionComponent<ProblemSetDescriptionProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)

  // 获取允许的编程语言信息
  const getAllowedLanguageInfo = (languages: string[]) => {
    let res = ''
    const len = languages.length
    for (let i = 0; i < len; i++) {
      res = res + PROGRAM_LANGUAGE_NAME[languages[i]]
      if (i < len - 1) {
        res += ' / '
      }
    }
    return res
  }

  // 获取题目集状态
  const getProblemSetCondition = (condition: string | undefined) => {
    switch (condition) {
      case ProblemSetConditionEnum.RUNNING:
        return localContext.problemSet.action
      case ProblemSetConditionEnum.CLOSED:
        return localContext.problemSet.started
      default:
        return localContext.problemSet.wait
    }
  }

  // 获取题目集状态
  const getProblemSetConditionStatus = (condition: string | undefined) => {
    switch (condition) {
      case ProblemSetConditionEnum.RUNNING:
        return 'processing'
      case ProblemSetConditionEnum.CLOSED:
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Descriptions bordered column={4} size={'middle'}>
      <Descriptions.Item label={localContext.problemSet.name} span={2}>
        {props.problemSetInfo.name}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.problemSet.author} span={2}>
        {props.problemSetInfo.creator?.nickname}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.startTime} span={2}>
        {timestampToDateTime(props.problemSetInfo.startTime || 0)}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.deadline} span={2}>
        {timestampToDateTime(props.problemSetInfo.deadline || 0)}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.problemSet.condition} span={2}>
        <Badge
          status={getProblemSetConditionStatus(props.problemSetInfo.condition)}
          text={getProblemSetCondition(props.problemSetInfo.condition)} />
      </Descriptions.Item>
      <Descriptions.Item label={localContext.problemSet.isPublic} span={2}>
        {props.problemSetInfo ? localContext.yes : localContext.no}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.problemSet.preference} span={2}>
        {props.problemSetInfo.judgePreference}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.problemSet.languageSupport} span={2}>
        {getAllowedLanguageInfo(props.problemSetInfo.allowedLanguage || [])}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.problemSet.desc}>
        {props.problemSetInfo.description}
      </Descriptions.Item>
    </Descriptions>
  )
}


export default ProblemSetDescription
