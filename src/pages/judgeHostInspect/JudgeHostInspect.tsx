/*
 * File: JudgeHostInspect.tsx
 * Description: 单个判题服务器操作页面
 * Created: 2020-08-16 16:43:36
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Badge, Card} from "antd";
import {RouteComponentProps} from "react-router-dom";
import {JudgeHostInfo} from "../../models/judgeHost";
import {getJudgeHostInfoById} from "../../network/judgeHostRequest";
import BasicInfo from "./childCmp/BasicInfo";
import CurrentCondition from "./childCmp/CurrentCondition";

interface JudgeHostInspectProps {

}

const JudgeHostInspect: React.FunctionComponent<JudgeHostInspectProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const judgeHostId: number = params.judgeHostId;

  const [judgeHostInfo, setJudgeHostInfo] = useState<JudgeHostInfo>({
    active: false, address: "", condition: {
      cpuCoreAmount: 0,
      cpuCostPercentage: 0,
      memoryCostPercentage: 0,
      port: 0,
      queueAmount: 0,
      resolutionPath: "",
      scriptPath: "",
      workPath: "",
      workingAmount: 0
    },
    connection: false,
    createTime: 0,
    id: 0,
    name: ""
  });

  useEffect(() => {
    getJudgeHostInfo(judgeHostId);
  }, [judgeHostId]);

  // 获取并保存判题机相关信息
  const getJudgeHostInfo = (judgeHostId: number) => {
    getJudgeHostInfoById(judgeHostId)
      .then(res => {
        setJudgeHostInfo(res.data);
      })
  }

  // 渲染卡片右侧信息
  const renderCardExtra = () => {
    return (
      <div>
        <Badge
          status={getConditionBadgeStatus()}
          text={getConditionDescription()}/>
      </div>

    )
  }

  // 获取判题机状态描述
  const getConditionDescription = () => {
    if (!judgeHostInfo.connection) {
      return "无连接";
    }
    return judgeHostInfo?.active ? "运行中" : "已暂停";
  }

  // 获取判题机状态描述颜色
  const getConditionBadgeStatus = () => {
    if (!judgeHostInfo.connection) {
      return "error";
    }
    return judgeHostInfo?.active ? "processing" : "warning";
  }

  return (
    <Card title={judgeHostInfo ? judgeHostInfo.name : "加载中"} extra={renderCardExtra()}>
      <Card
        title={"基本信息"}
        style={{
          marginBottom: 20
        }}>
        <BasicInfo judgeHostInfo={judgeHostInfo}/>
      </Card>
      <Card
        title={"实时状态"}
        style={{
          marginBottom: 20
        }}>
        <CurrentCondition judgeHostInfo={judgeHostInfo}/>
      </Card>
      <Card title={"数据统计"}>

      </Card>
    </Card>
  )
}

export default JudgeHostInspect;