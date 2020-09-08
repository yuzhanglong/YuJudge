/*
 * File: TestCaseList.tsx
 * Description: 测试点列表
 * Created: 2020-9-8 22:51:04
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {JudgeResultForSingleTestCase} from "../../models/submission";
import {Button, Col, List, Row} from "antd";
import ConditionTag from "../conditionTag/ConditionTag";
import style from "./testCaseList.module.scss";
import {ClockCircleOutlined, CodeOutlined, DownloadOutlined} from "@ant-design/icons";

interface TestCaseListProps {
  testCases: JudgeResultForSingleTestCase[];
}

const TestCaseList: React.FunctionComponent<TestCaseListProps> = (props) => {

  // 渲染列表描述
  const renderListItemDescription = (testCase: JudgeResultForSingleTestCase) => {
    return (
      <div>
        <Row>
          <Col style={{
            marginRight: 20
          }}>
            <ClockCircleOutlined/> 时间消耗: {testCase.cpuTimeCost || testCase.realTimeCost} ms
          </Col>
          <Col>
            <CodeOutlined/> 内存消耗: {testCase.memoryCost} kb
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <List
      pagination={false}
      itemLayout="horizontal"
      dataSource={props.testCases}
      renderItem={(item: JudgeResultForSingleTestCase, index: number) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <ConditionTag
                isEntire={false}
                condition={item.message || ""}
                detail={null}/>
            }
            title={
              <div
                className={style.test_case_title}>
                {`测试点${index}`}
              </div>
            }
            description={renderListItemDescription(item)}
          />
          <Button
            className={style.download_button}
            icon={<DownloadOutlined/>}
            size={"middle"}/>
        </List.Item>
      )}
    />
  )
}

export default TestCaseList;