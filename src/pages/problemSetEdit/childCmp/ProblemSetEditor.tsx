/*
 * File: ProblemSetEditor.tsx
 * Description: 题目集编辑器
 * Created: 2020-08-09 23:12:29
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Button, Card, Divider} from "antd";
import ProblemTable from "../../../components/problemTable/ProblemTable";
import {Problem} from "../../../models/problem";
import {RouteComponentProps} from "react-router-dom";
import EditorTip from "../../../components/editorTip/editorTip";

interface ProblemSetEditorProps {
  problems: Problem[];
  onProblemAdd: () => void;
}

const ProblemSetEditor: React.FunctionComponent<ProblemSetEditorProps & RouteComponentProps> = (props) => {

  // 跳转编辑界面
  const gotoEditProblem = (problemId: number) => {
    props.history.push(`/cms/problem_manage/problems/edit/${problemId}`)
  }

  return (
    <Card title={"题目集编辑"}>
      <Card
        type="inner"
        style={{marginTop: 10}}
        title={<div className={"cms-problem-editor-part"}>基本信息</div>}>
      </Card>
      <Card
        type="inner"
        style={{marginTop: 10}}
        title={<div className={"cms-problem-editor-part"}>拥有的题目</div>}
        extra={
          <Button type={"link"} onClick={() => props.onProblemAdd()}>
            添加已有问题
          </Button>
        }>
        <ProblemTable problems={props.problems} onProblemEdit={gotoEditProblem}/>

      </Card>
      <Card
        type="inner"
        style={{marginTop: 10}}
        title={<div className={"cms-problem-editor-part-danger"}>危险项</div>}>
        <EditorTip
          title={"删除这个题目集"}
          content={"此操作不可恢复，注意: 与它相关联的题目不会被删除"}
          className={"cms-problem-item-begin"}>
          <Button danger>
            删除
          </Button>
        </EditorTip>
      </Card>
    </Card>
  )
}

export default ProblemSetEditor;