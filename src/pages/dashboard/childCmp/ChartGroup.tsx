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

interface ChartGroupProps {

}

const ChartGroup: React.FunctionComponent<ChartGroupProps> = (props) => {
  return (
    <div>
      <Row justify={"space-between"} gutter={25}>
        <Col span={8}>
          <Card
            hoverable
            type="inner"
            title="我的提交"
            extra={
              <DashOutlined/>
            }>
            <div className={"chart-wrap"}>

            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            type="inner"
            title="24小时提交"
            hoverable
            extra={
              <DashOutlined/>
            }>
            <div className={"chart-wrap"}>

            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            hoverable
            type="inner"
            title="题目活跃度"
            extra={
              <DashOutlined/>
            }>
            <div className={"chart-wrap"}>

            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ChartGroup;