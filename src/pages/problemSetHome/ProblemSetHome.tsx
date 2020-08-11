/*
 * File: ProblemSetHome.tsx
 * Description: 题目集概览界面
 * Created: 2020-08-11 13:38:53
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Badge, Card, Descriptions} from "antd";

interface ProblemSetHomeProps {

}

const ProblemSetHome: React.FunctionComponent<ProblemSetHomeProps> = (props) => {
  return (
    <div className={"problem-set-home"}>
      <Card title={"题目集概况"} headStyle={{textAlign: "center"}}>
        <Descriptions bordered>
          <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
          <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
          <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
          <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
          <Descriptions.Item label="Usage Time" span={2}>
            2019-04-24 18:00:00
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Badge status="processing" text="Running"/>
          </Descriptions.Item>
          <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
          <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
          <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
          <Descriptions.Item label="Config Info">
            Data disk type: MongoDB
            <br/>
            Database version: 3.4
            <br/>
            Package: dds.mongo.mid
            <br/>
            Storage space: 10 GB
            <br/>
            Replication factor: 3
            <br/>
            Region: East China 1<br/>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

export default ProblemSetHome;