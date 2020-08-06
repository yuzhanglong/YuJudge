/*
 * File: HeadCardItem.tsx
 * Description: 控制台页面顶部小卡片
 * Created: 2020-08-06 13:10:12
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Card, Col, Row} from "antd";

interface HeadCardItemProps {
  topic: string;
  content: string;
  hoverable?: boolean;
  icon: React.ReactNode;
}

const HeadCardItem: React.FunctionComponent<HeadCardItemProps> = (props) => {
  return (
    <Card hoverable={props.hoverable} bodyStyle={{
      padding: 20
    }}>
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <div className={"head-card-item-icon"}>
            {props.icon}
          </div>
        </Col>
        <Col>
          <Row justify={"end"}>
            <div className={"head-card-item-content"}>
              {props.content}
            </div>
          </Row>
          <Row>
            <div className={"head-card-item-topic"}>
              {props.topic}
            </div>
          </Row>
        </Col>
      </Row>


    </Card>
  )
}

HeadCardItem.defaultProps = {
  hoverable: true
}


export default HeadCardItem;