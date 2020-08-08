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
import LineChart from "../../../components/charts/LineChart";
import ColumnChart from "../../../components/charts/ColumnChart";
import PieChart from "../../../components/charts/PieChart";
import {UserInfo} from "../../../models/user";

interface ChartGroupProps {
  recentSubmission: any[];
  userInfo: UserInfo;
}

const ChartGroup: React.FunctionComponent<ChartGroupProps> = (props) => {

  // 处理用户的提交信息，将其转变为支持表格渲染的数据结构
  const generateUserSubmissionData = () => {
    return props.recentSubmission.map((res) => {
      const d = new Date(res.time);
      return {
        date: d.getMonth() + 1 + "." + d.getDate(),
        totalAmount: res.totalAmount,
        acAmount: res.acAmount
      }
    })
  }

  // 处理userInfo数据，将其转变为支持pieChart渲染的数据结构
  const generateUserInfoDataForPieChart = (userInfo: UserInfo) => {
    if (!userInfo) {
      return [];
    }
    return [
      {
        type: 'AC',
        value: userInfo.acAmount,
      },
      {
        type: 'WA',
        value: userInfo.submissionAmount - userInfo.acAmount,
      }
    ]
  }

  // 渲染饼图yanse
  const renderPieChartColor = (e: string) => {
    if (e === "AC") {
      return "#52c41a"
    } else {
      return "#fa541c"
    }
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
                xKey={"date"}
                xKeyDesc={"日期"}
                yKey={"totalAmount"}
                yKeyDesc={"提交数"}
                data={generateUserSubmissionData()}/>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            type="inner"
            title="全站24小时提交"
            hoverable
            extra={
              <DashOutlined/>
            }>
            <div className={"chart-wrap"}>
              <LineChart></LineChart>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            hoverable
            type="inner"
            title="个人数据"
            extra={
              <DashOutlined/>
            }>
            <div className={"chart-wrap"}>
              <PieChart data={generateUserInfoDataForPieChart(props.userInfo)}
                        colorRender={renderPieChartColor}/>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ChartGroup;