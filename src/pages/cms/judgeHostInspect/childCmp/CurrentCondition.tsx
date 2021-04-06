/*
 * File: CurrentCondition.tsx
 * Description: 判题机实时状态信息组件
 * Created: 2020-8-18 16:36:48
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react';
import {Descriptions} from 'antd';
import {JudgeHostInfo} from '../../../../models/judgeHost';

interface CurrentConditionProps {
  judgeHostInfo: JudgeHostInfo;
}

const CurrentCondition: React.FunctionComponent<CurrentConditionProps> = (props) => {
  return (
    <Descriptions bordered>
      <Descriptions.Item label="连接状态">
        {props.judgeHostInfo.condition ? '连接成功' : '连接失败'}
      </Descriptions.Item>
      <Descriptions.Item label="CPU占用">
        {props.judgeHostInfo.condition.cpuCostPercentage + '%'}
      </Descriptions.Item>
      <Descriptions.Item label="内存占用">
        {props.judgeHostInfo.condition.memoryCostPercentage + '%'}
      </Descriptions.Item>
      <Descriptions.Item label="当前判题数">
        {props.judgeHostInfo.condition.workingAmount}
      </Descriptions.Item>
      <Descriptions.Item label="当前排队数">
        {props.judgeHostInfo.condition.queueAmount}
      </Descriptions.Item>
    </Descriptions>
  )
}

export default CurrentCondition;