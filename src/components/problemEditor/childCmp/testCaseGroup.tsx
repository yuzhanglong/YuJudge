import React from "react";
import {ProblemTestCase} from "../../../models/problem";
import {Card} from "antd";
import TestCaseOperation from "./testCaseOperaion";

interface TestCaseGroupProps {
  testCases: ProblemTestCase[];
}

const TestCaseGroup: React.FunctionComponent<TestCaseGroupProps> = (props) => {
  const renderTestCases = (cases: ProblemTestCase[]) => {
    return (
      <div className={"cms-problem-editor-test-case-card-wrap"}>
        {cases.map((res: ProblemTestCase, index) => {
          return (
            <div key={res.id}>
              <Card size="small"
                    className={"cms-problem-editor-test-case-card"}
                    title={res.description}
                    extra={
                      <div className={"cms-problem-editor-test-case-counter"}>
                        {index + 1 + "#"}
                      </div>
                    }>
                <TestCaseOperation title={"标准输入"}
                                   tagColor={"#2db7f5"}>
                </TestCaseOperation>
                <TestCaseOperation title={"标准输出"}
                                   tagColor={"#87d068"}>
                </TestCaseOperation>
              </Card>
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <div>
      {renderTestCases(props.testCases)}
    </div>
  )
}

export default TestCaseGroup;

