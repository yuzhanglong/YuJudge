/*
 * File: CurrentCondition.tsx
 * Description: 判题机实时状态信息组件
 * Created: 2020-8-18 16:36:48
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { Descriptions } from 'antd'
import { JudgeHostInfo } from '../../../../models/judgeHost'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface CurrentConditionProps {
  judgeHostInfo: JudgeHostInfo;
}

const CurrentCondition: React.FC<CurrentConditionProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)

  return (
    <Descriptions bordered>
      <Descriptions.Item label={localContext.problem.connection}>
        {props.judgeHostInfo.condition ? localContext.problem.connectSuccess : localContext.problem.connectFail}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.problem.cpuCost}>
        {props.judgeHostInfo.condition.cpuCostPercentage + '%'}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.problem.memoryCost}>
        {props.judgeHostInfo.condition.memoryCostPercentage + '%'}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.problem.currentJudgeAmount}>
        {props.judgeHostInfo.condition.workingAmount}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.problem.currentQueueSize}>
        {props.judgeHostInfo.condition.queueAmount}
      </Descriptions.Item>
    </Descriptions>
  )
}

export default CurrentCondition
