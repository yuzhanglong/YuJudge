/*
 * File: HeadCardItem.tsx
 * Description: 控制台页面顶部小卡片
 * Created: 2020-08-06 13:10:12
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Card, Col, Row} from "antd";
import style from "../dashboard.module.scss";

interface HeadCardItemProps {
  topic: string;
  content: string;
  hover?: boolean;
  icon: React.ReactNode;
}

const HeadCardItem: React.FunctionComponent<HeadCardItemProps> = (props) => {
  return (
    <Card hoverable={props.hover} bodyStyle={{
      padding: 20
    }}>
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <div className={style.head_card_item_icon}>
            {props.icon}
          </div>
        </Col>
        <Col>
          <Row justify={"end"}>
            <div className={style.head_card_item_content}>
              {props.content}
            </div>
          </Row>
          <Row>
            <div className={style.head_card_item_topic}>
              {props.topic}
            </div>
          </Row>
        </Col>
      </Row>


    </Card>
  )
}

HeadCardItem.defaultProps = {
  hover: true
}


export default HeadCardItem;