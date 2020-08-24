/*
 * File: ChartGroup.tsx
 * Description: 控制台的数据展示界面
 * Created: 2020-08-06 14:12:16
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Card, Col, Row} from "antd";
import {DashOutlined} from "@ant-design/icons/lib";
import ColumnChart from "../../../components/charts/ColumnChart";
import {UserInfo} from "../../../models/user";
import {SubmissionCountInfo, UserSubmissionCount} from "../../../models/submission";
import SubmissionCount from "../../../components/submissionCount/SubmissionCount";

interface ChartGroupProps {
  recentSubmission: UserSubmissionCount[];
  userInfo: UserInfo | null;
  globalSubmissionCount: SubmissionCountInfo[];
}

const ChartGroup: React.FunctionComponent<ChartGroupProps> = (props) => {

  // 处理用户的提交信息，将其转变为支持表格渲染的数据结构
  const generateUserSubmissionData = () => {
    let result = [];
    for (let i = 0; i < props.recentSubmission.length; i++) {
      let tmp = props.recentSubmission[i];
      const d = new Date(tmp.time);
      result.push(
        {
          date: d.getMonth() + 1 + "." + d.getDate(),
          amount: tmp.totalAmount,
          type: "通过",
        },
        {
          date: d.getMonth() + 1 + "." + d.getDate(),
          amount: tmp.totalAmount - tmp.acceptAmount,
          type: "未通过",
        },
      )
    }
    return result;
  }


  return (
    <div>
      <Row justify={"space-between"} gutter={25}>
        <Col span={8}>
          <Card
            hoverable
            type="inner"
            title="近七日提交"
            extra={
              <DashOutlined/>
            }>
            <div className={"chart-wrap"}>
              <ColumnChart
                isStack
                stackField={"type"}
                xKey={"date"}
                yKey={"amount"}
                yKeyDesc={"提交数"}
                data={generateUserSubmissionData()}/>
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <Card
            type="inner"
            title="全站24小时提交"
            hoverable
            extra={
              <DashOutlined/>
            }>
            <div className={"chart-wrap"}>
              <SubmissionCount
                submissionCounts={props.globalSubmissionCount}
                showPicker={false}/>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ChartGroup;