import React from "react";
import {Card, Button} from "antd";
import {Problem, ProblemTestCase} from "../../models/problem";
import LimitationForm from "./childCmp/limitationForm";
import BasicInfoForm from "./childCmp/basicInfoForm";
import DangerZoneForm from "./childCmp/dangerZoneForm";
import TestCaseTable from "../testCaseTable/TestCaseTable";

interface ProblemEditorProps {
  problem: Problem;
  solutions: ProblemTestCase[];
  onSolutionAdd: () => void;
  onSolutionDelete: (testCaseId: number) => void;
}

const ProblemEditor: React.FunctionComponent<ProblemEditorProps> = (props) => {

  // 渲染测试点表格操作区
  const renderTestCaseTableOperations = (value: ProblemTestCase) => {
    const testCaseId = value.id;
    return (
      <div>
        <Button type={"link"} danger onClick={() => {
          onSolutionDelete(testCaseId)
        }}>
          删除
        </Button>
      </div>
    )
  }

  // 解决方案被删除
  const onSolutionDelete = (value: number | undefined) => {
    if (value) {
      props.onSolutionDelete(value);
    }
  }

  return (
    <>
      <Card title="问题编辑">
        <Card
          type="inner"
          style={{marginTop: 10}}
          title={<div className={"cms-problem-editor-part"}>基本信息</div>}>
          <BasicInfoForm problem={props.problem}/>
        </Card>
        <Card
          type="inner"
          style={{marginTop: 30}}
          title={
            <div className={"cms-problem-editor-part"}>
              提交限制
            </div>
          }>
          <LimitationForm problem={props.problem}></LimitationForm>
        </Card>
        <Card
          style={{marginTop: 30}}
          type="inner"
          title={
            <div className={"cms-problem-editor-part"}>
              测试点
            </div>
          } extra={
          <Button type={"link"} onClick={props.onSolutionAdd}>
            添加测试点
          </Button>
        }>
          <TestCaseTable
            testCases={props.solutions}
            operations={renderTestCaseTableOperations}
            showDownLoadUrlColumn/>
        </Card>
        <Card
          style={{marginTop: 30}}
          type="inner"
          title={
            <div className={"cms-problem-editor-part-danger"}>
              危险项
            </div>
          }>
          <DangerZoneForm problem={props.problem}></DangerZoneForm>
        </Card>
      </Card>
    </>
  );
}

export default ProblemEditor;