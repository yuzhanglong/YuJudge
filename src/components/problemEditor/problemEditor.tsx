import React from "react";
import {Card, Button, Divider} from "antd";
import EditorTip from "./childCmp/editorTip";
import TestCaseGroup from "./childCmp/testCaseGroup";
import {Problem, ProblemTestCase} from "../../models/problem";
import LimitationForm from "./childCmp/limitationForm";

interface ProblemEditorProps {
  problem: Problem;
  solutions: ProblemTestCase[];
  onSolutionAdd?: () => void;
}

const ProblemEditor: React.FunctionComponent<ProblemEditorProps> = (props) => {
  return (
    <>
      <Card title="问题编辑">
        <Card
          type="inner"
          style={{marginTop: 10}}
          title={
            <div className={"cms-problem-editor-part"}>
              基本信息
            </div>
          }>
          Inner Card content
        </Card>
        <Card
          type="inner"
          style={{marginTop: 30}}
          title={
            <div className={"cms-problem-editor-part"}>
              提交限制
            </div>
          }>
          <LimitationForm></LimitationForm>
        </Card>
        <Card
          style={{marginTop: 30}}
          type="inner"
          title={
            <div className={"cms-problem-editor-part"}>
              测试点
            </div>
          } extra={<Button type={"link"} onClick={props.onSolutionAdd}>添加测试点</Button>}>
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
          <EditorTip title={"禁用这个问题"} className={"cms-problem-item-begin"}
                     content={"设为禁用状态时，这个问题下将无法提交答案"}>
            <Button danger>
              禁用
            </Button>
          </EditorTip>
          <Divider/>
          <EditorTip title={"清空所有提交数据"}
                     content={"删除这个问题下的所有提交数据，同时清空AC率等统计信息"}>
            <Button danger>
              清空
            </Button>
          </EditorTip>
          <Divider/>
          <EditorTip title={"删除这个问题"}
                     content={"所有的题目信息/提交统计都会丢失，这个操作不可恢复"}>
            <Button danger>
              删除
            </Button>
          </EditorTip>
        </Card>
      </Card>
    </>
  );
}

export default ProblemEditor;