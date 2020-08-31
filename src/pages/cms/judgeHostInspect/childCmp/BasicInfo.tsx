/*
 * File: BasicInfo.tsx
 * Description: 判题机详情页面基本信息
 * Created: 2020-8-18 16:26:07
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Descriptions, Tag} from "antd";
import {getIpAddress} from "../../../../utils/regex";
import {timestampToDateTime} from "../../../../utils/dateTime";
import {JudgeHostInfo} from "../../../../models/judgeHost";

interface BasicInfoProps {
  judgeHostInfo: JudgeHostInfo;
}

const BasicInfo: React.FunctionComponent<BasicInfoProps> = (props) => {
  return (
    <Descriptions bordered>
      <Descriptions.Item label="地址">
        {getIpAddress(props.judgeHostInfo.baseUrl)}
      </Descriptions.Item>
      <Descriptions.Item label="端口号">
        {props.judgeHostInfo?.condition.port}
      </Descriptions.Item>
      <Descriptions.Item label="创建时间">
        {timestampToDateTime(props.judgeHostInfo?.createTime)}
      </Descriptions.Item>
      <Descriptions.Item label="CPU核心数">
        {props.judgeHostInfo?.condition.maxWorkingAmount}
      </Descriptions.Item>
      <Descriptions.Item label="判题机版本">
        <Tag color={"geekblue"}>DEVELOP</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="工作目录">
        {props.judgeHostInfo?.condition.workPath}
      </Descriptions.Item>
      <Descriptions.Item label="解决方案存放目录" span={3}>
        {props.judgeHostInfo?.condition.resolutionPath}
      </Descriptions.Item>
      <Descriptions.Item label="判题脚本存放目录" span={3}>
        {props.judgeHostInfo?.condition.scriptPath}
      </Descriptions.Item>
    </Descriptions>
  )
}

export default BasicInfo;