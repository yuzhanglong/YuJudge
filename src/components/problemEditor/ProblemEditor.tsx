import React from "react";
import {Card, Button} from "antd";
import TestCaseGroup from "./childCmp/testCaseGroup";
import {Problem, ProblemTestCase} from "../../models/problem";
import LimitationForm from "./childCmp/limitationForm";
import BasicInfoForm from "./childCmp/basicInfoForm";
import DangerZoneForm from "./childCmp/dangerZoneForm";

interface ProblemEditorProps {
  problem: Problem;
  solutions: ProblemTestCase[];
  onSolutionAdd?: () => void;
}

const ProblemEditor: React.FunctionComponent<ProblemEditorProps> = (props) => {
  console.log(props.problem);
  return (
    <>
      <Card title="问题编辑">
        <Card
          type="inner"
          style={{marginTop: 10}}
          title={<div className={"cms-problem-editor-part"}>基本信息</div>}>
          <BasicInfoForm problem={props.problem}></BasicInfoForm>
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
          <TestCaseGroup testCases={props.solutions}></TestCaseGroup>
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