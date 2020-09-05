/*
 * File: ProfileCount.tsx
 * Description: 个人信息统计
 * Created: 2020-9-5 15:15:19
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Card, Empty, Row} from "antd";
import style from "../profile.module.scss";
import ColumnChart from "../../../../components/charts/ColumnChart";
import {EMPTY_IMAGE} from "../../../../config/config";
import {UserJudgeResultCount, UserSubmissionCount} from "../../../../models/submissionInfo";
import JudgeResultCount from "../../../../components/judgeResultCount/JudgeResultCount";
import {BulbTwoTone, DashOutlined, FileTextTwoTone, PieChartTwoTone, SmileTwoTone} from "@ant-design/icons";
import RcQueueAnim from "rc-queue-anim";
import CommonTitle from "../../../../components/commonTitle/CommonTitle";
import {ProblemCountItem} from "../../../../models/problem";
import ProblemItems from "../../../../components/userTag/childCmp/ProblemItems";
import {generateUserSubmissionData} from "../../../../utils/chart";

interface ProfileCountProps {
  recentSubmission: UserSubmissionCount[];
  userJudgeResultCount: UserJudgeResultCount[];
  acCount: ProblemCountItem[];
  triedCount: ProblemCountItem[];
}

const ProfileCount: React.FunctionComponent<ProfileCountProps> = (props) => {
  // 检测是否为空
  const checkRecentSubmissionIsEmpty = () => {
    for (let i = 0; i < props.recentSubmission.length; i++) {
      if (props.recentSubmission[i].totalAmount !== 0) {
        console.log(props.recentSubmission[i]);
        return false;
      }
    }
    return true;
  }


  return (
    <RcQueueAnim>
      <div key={"profile_group_item_1"}>
        <Row className={style.profile_group_item}>
          <Card
            title={<CommonTitle title={"已通过"} icon={<SmileTwoTone/>}/>}
            className={style.profile_user_have_pass}
            extra={
              <DashOutlined/>
            }>
            {
              props.acCount.length ?
                <ProblemItems items={props.acCount}/> :
                <Empty image={EMPTY_IMAGE}></Empty>
            }
          </Card>
          <Card
            title={<CommonTitle title={"尝试过"} icon={<BulbTwoTone/>}/>}
            className={style.profile_user_have_tried}
            extra={
              <DashOutlined/>
            }>
            {props.triedCount.length ?
              <ProblemItems items={props.triedCount}/> :
              <Empty image={EMPTY_IMAGE}></Empty>}
          </Card>
        </Row>
      </div>
      <div key={"profile_group_item_2"}>
        <Row>
          <Card
            title={<CommonTitle title={"近期提交"} icon={<FileTextTwoTone/>}/>}
            className={style.profile_recent_submission}
            extra={
              <DashOutlined/>
            }>
            {
              !checkRecentSubmissionIsEmpty() ?
                <ColumnChart
                  height={220}
                  isStack
                  stackField={"type"}
                  xKey={"date"}
                  yKey={"amount"}
                  yKeyDesc={"提交数"}
                  data={generateUserSubmissionData(props.recentSubmission)}/> :
                <Empty image={EMPTY_IMAGE}/>
            }
          </Card>
          <Card
            title={<CommonTitle title={"判题统计"} icon={<PieChartTwoTone/>}/>}
            className={style.profile_recent_judge_result_count}
            extra={<DashOutlined/>}>
            {
              props.userJudgeResultCount.length ?
                <JudgeResultCount resultCounts={props.userJudgeResultCount}/> :
                <Empty image={EMPTY_IMAGE}/>
            }
          </Card>
        </Row>
      </div>
    </RcQueueAnim>
  )
}

export default ProfileCount;