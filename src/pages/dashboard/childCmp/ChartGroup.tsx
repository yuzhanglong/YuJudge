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

interface ChartGroupProps {
  recentSubmission: any[];
}

const ChartGroup: React.FunctionComponent<ChartGroupProps> = (props) => {
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
                yKeyDesc={"提交数"} data={generateUserSubmissionData()}/>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            type="inner"
            title="个人数据"
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
            title="全站24小时提交"
            extra={
              <DashOutlined/>
            }>
            <div className={"chart-wrap"}>
              <LineChart></LineChart>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ChartGroup;