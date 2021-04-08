/*
 * File: BasicInfo.tsx
 * Description: 判题机详情页面基本信息
 * Created: 2020-8-18 16:26:07
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { Descriptions, Tag } from 'antd'
import { timestampToDateTime } from '../../../../utils/dateTime'
import { JudgeHostInfo } from '../../../../models/judgeHost'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface BasicInfoProps {
  judgeHostInfo: JudgeHostInfo;
}

const BasicInfo: React.FC<BasicInfoProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)

  return (
    <Descriptions bordered>
      <Descriptions.Item label={localContext.judgeHost.id}>
        {props.judgeHostInfo.id}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.judgeHost.address}>
        {props.judgeHostInfo.baseUrl}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.judgeHost.port}>
        {props.judgeHostInfo?.condition.port}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.judgeHost.createTime}>
        {timestampToDateTime(props.judgeHostInfo?.createTime)}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.judgeHost.cpuCoreSize}>
        {props.judgeHostInfo?.condition.maxWorkingAmount}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.judgeHost.version}>
        <Tag color={'geekblue'}>
          {props.judgeHostInfo.condition.version}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item label={localContext.judgeHost.saveDir} span={3}>
        {props.judgeHostInfo?.condition.resolutionPath}
      </Descriptions.Item>
      <Descriptions.Item label={localContext.judgeHost.scriptSaveDir} span={3}>
        {props.judgeHostInfo?.condition.scriptPath}
      </Descriptions.Item>
    </Descriptions>
  )
}

export default BasicInfo
