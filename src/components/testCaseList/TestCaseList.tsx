/*
 * File: TestCaseList.tsx
 * Description: 测试点列表
 * Created: 2020-9-8 22:51:04
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {JudgeResultForSingleTestCase} from "../../models/submission";
import {Button, Col, Divider, Row} from "antd";
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
      <div className={style.list_item_description}>
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
    <div>
      {
        props.testCases.map((item, index) => {
          return (
            <div>
              <Row align={"middle"}>
                <Col span={2}>
                  <ConditionTag
                    isEntire={false}
                    condition={item.message || ""}
                    detail={null}/>
                </Col>
                <Col span={18}>
                  <Row>
                    <div
                      className={style.test_case_title}>
                      {`测试点${index}`}
                    </div>
                  </Row>
                  <Row>
                    {renderListItemDescription(item)}
                  </Row>
                </Col>
                <Col span={4}>
                  <Button
                    className={style.download_button}
                    icon={<DownloadOutlined/>}
                    size={"middle"}/>
                </Col>
              </Row>
              <Divider/>
            </div>
          )
        })
      }
    </div>
  )
}

export default TestCaseList;