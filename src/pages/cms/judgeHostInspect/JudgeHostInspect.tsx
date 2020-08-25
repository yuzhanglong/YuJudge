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
import {JudgeHostInfo} from "../../../models/judgeHost";
import {countJudgeHostSubmissionInfo, getJudgeHostInfoById} from "../../../network/judgeHostRequest";
import BasicInfo from "./childCmp/BasicInfo";
import CurrentCondition from "./childCmp/CurrentCondition";
import SubmissionCount from "../../../components/submissionCount/SubmissionCount";
import {SubmissionCountInfo} from "../../../models/submission";
import {getDateRangeMomentArray} from "../../../utils/dateTime";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../config/config";
import moment from "moment";
import RcQueueAnim from "rc-queue-anim";

interface JudgeHostInspectProps {

}

const JudgeHostInspect: React.FunctionComponent<JudgeHostInspectProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const judgeHostId: number = params.judgeHostId;

  // 判题机信息
  const [judgeHostInfo, setJudgeHostInfo] = useState<JudgeHostInfo>({
    active: false, baseUrl: "", condition: {
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

  // 判题机数据统计
  const [judgeHostSubmissionCounts, setJudgeHostSubmissionCounts] = useState<SubmissionCountInfo[]>([]);

  useEffect(() => {
    getJudgeHostInfo(judgeHostId);
    getSubmissionCountsData();
    // eslint-disable-next-line
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

  // 获取判题机提交统计信息
  const getSubmissionCountsData = (begin?: string, end?: string) => {
    let b = begin || moment().subtract(1, 'days').format(DEFAULT_DATE_TIME_FORMAT);
    let e = end || moment().format(DEFAULT_DATE_TIME_FORMAT);
    console.log(moment().format(DEFAULT_DATE_TIME_FORMAT));
    countJudgeHostSubmissionInfo(b, e, params.judgeHostId)
      .then(res => {
        setJudgeHostSubmissionCounts(res.data.items);
      })
  }

  // 获取初始时间
  const initDay = () => {
    let now = new Date();
    let before = new Date();
    before.setDate(now.getDate() - 1);
    return getDateRangeMomentArray(before.getTime(), now.getTime());
  }

  return (
    <Card title={judgeHostInfo ? judgeHostInfo.name : "加载中"} extra={renderCardExtra()}>
      <RcQueueAnim>
        <Card
          key={"basic"}
          title={"基本信息"}
          style={{
            marginBottom: 20
          }}>
          <BasicInfo judgeHostInfo={judgeHostInfo}/>
        </Card>
        <Card
          key={"current-condition"}
          title={"实时状态"}
          style={{
            marginBottom: 20
          }}>
          <CurrentCondition judgeHostInfo={judgeHostInfo}/>
        </Card>
        <Card
          title={"数据统计"}
          key={"data"}>
          <SubmissionCount
            submissionCounts={judgeHostSubmissionCounts}
            initialTimeRange={initDay()}
            onPickerChange={(res) => getSubmissionCountsData(res[0], res[1])}/>
        </Card>
      </RcQueueAnim>
    </Card>
  )
}

export default JudgeHostInspect;