/*
 * File: JudgeHostInspect.tsx
 * Description: 单个判题服务器操作页面
 * Created: 2020-08-16 16:43:36
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import {JudgeHostInfo} from "../../../models/judgeHost";
import {
  countJudgeHostSubmissionInfo,
  getJudgeHostInfoById,
} from "../../../network/judgeHostRequest";
import BasicInfo from "./childCmp/BasicInfo";
import CurrentCondition from "./childCmp/CurrentCondition";
import SubmissionCount from "../../../components/submissionCount/SubmissionCount";
import {SubmissionCountInfo} from "../../../models/submission";
import {getDateRangeMomentArray} from "../../../utils/dateTime";
import {DEFAULT_DATE_TIME_FORMAT, EMPTY_IMAGE} from "../../../config/config";
import moment from "moment";
import RcQueueAnim from "rc-queue-anim";
import style from "./judgeHostInspect.module.scss";
import Operations from "./childCmp/Operations";
import {Badge, Card, Empty} from "antd";

interface JudgeHostInspectProps {

}

const JudgeHostInspect: React.FunctionComponent<JudgeHostInspectProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const judgeHostId: number = params.judgeHostId;

  // 判题机信息
  const [judgeHostInfo, setJudgeHostInfo] = useState<JudgeHostInfo>();

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
    return judgeHostInfo?.active ? "运行中" : "已暂停";
  }

  // 获取判题机状态描述颜色
  const getConditionBadgeStatus = () => {
    return judgeHostInfo?.active ? "processing" : "warning";
  }

  // 获取判题机提交统计信息
  const getSubmissionCountsData = (begin?: string, end?: string) => {
    let b = begin || moment().subtract(1, 'days').format(DEFAULT_DATE_TIME_FORMAT);
    let e = end || moment().format(DEFAULT_DATE_TIME_FORMAT);
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
    <Card title={judgeHostInfo?.name}
          extra={renderCardExtra()}>
      <RcQueueAnim>
        <div key={"BasicResult"}>
          <Card
            title={<div className={style.judge_host_edit_item_title}>基本信息</div>}
            className={style.judge_host_inspect_item}>
            {
              judgeHostInfo && judgeHostInfo.condition.version ?
                <BasicInfo judgeHostInfo={judgeHostInfo}/> :
                <Empty image={EMPTY_IMAGE} description={"该判题服务器无连接"}/>
            }
          </Card>
        </div>
        <div key={"current-condition"}>
          <Card
            title={<div className={style.judge_host_edit_item_title}>实时状态</div>}
            style={{
              marginBottom: 20
            }}>
            {
              judgeHostInfo && judgeHostInfo.condition.version ?
                <CurrentCondition judgeHostInfo={judgeHostInfo}/> :
                <Empty image={EMPTY_IMAGE} description={"该判题服务器无连接"}/>
            }
          </Card>
        </div>
        <div key={"data"}>
          <Card
            title={<div className={style.judge_host_edit_item_title}>数据统计</div>}
            className={style.judge_host_inspect_item}>
            <SubmissionCount
              submissionCounts={judgeHostSubmissionCounts}
              initialTimeRange={initDay()}
              onPickerChange={(res) => getSubmissionCountsData(res[0], res[1])}/>
          </Card>
        </div>
        <div key={"operations"}>
          <Card title={<div className={style.judge_host_edit_item_title}>操作</div>}>
            {
              judgeHostInfo ?
                <Operations judgeHostInfo={judgeHostInfo} onReset={() => getJudgeHostInfo(judgeHostId)}/> :
                <Empty image={EMPTY_IMAGE} description={"该判题服务器无连接"}/>
            }
          </Card>
        </div>
      </RcQueueAnim>
    </Card>
  )
}

export default JudgeHostInspect;