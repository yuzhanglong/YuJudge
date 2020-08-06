/*
 * File: HeadCardGroup.tsx
 * Description: 控制台首页卡片区域，用来展示项目的一些整体情况
 * Created: 2020-08-06 13:03:52
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Col, Row} from "antd";
import HeadCardItem from "./HeadCardItem";
import {
  CalculatorTwoTone,
  ContactsTwoTone,
  FileTextTwoTone,
  SettingTwoTone
} from "@ant-design/icons/lib";

interface headCardGroupProps {

}

const HeadCardGroup: React.FunctionComponent<headCardGroupProps> = (props) => {
  return (
    <div>
      <Row justify={"space-between"} gutter={25}>
        <Col span={6}>
          <HeadCardItem
            icon={<CalculatorTwoTone twoToneColor={"#2f54eb"}/>}
            topic={"问题总数"}
            content={"10"}/>
        </Col>
        <Col span={6}>
          <HeadCardItem
            icon={<FileTextTwoTone twoToneColor={"#13c2c2"}/>}
            topic={"提交总数"}
            content={"1025"}/>
        </Col>
        <Col span={6}>
          <HeadCardItem
            icon={<ContactsTwoTone twoToneColor={"#1890ff"}/>}
            topic={"用户人数"}
            content={"50"}/>
        </Col>
        <Col span={6}>
          <HeadCardItem
            icon={
              <SettingTwoTone twoToneColor={"#722ed1"}/>
            }
            topic={"判题核心"}
            content={"2"}/>
        </Col>
      </Row>
    </div>
  )
}

export default HeadCardGroup;