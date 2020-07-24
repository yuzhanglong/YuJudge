import React from "react";
import {Button, Tag} from "antd";

interface TestCaseOperationProps {
  title: string;
  tagColor: string;
}

const TestCaseOperation: React.FunctionComponent<TestCaseOperationProps> = (props) => {
  return (
    <div className={"cms-problem-editor-test-case-data"}>
      <Tag color={props.tagColor}>
        {props.title}
      </Tag>
      <Button type={"link"}>下载</Button>
      <Button type={"link"}>上传</Button>
    </div>
  )
}

export default TestCaseOperation;