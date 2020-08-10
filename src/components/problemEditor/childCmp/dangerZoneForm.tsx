import React from "react";
import EditorTip from "../../editorTip/editorTip";
import {Button, Divider} from "antd";
import {closeProblem} from "../../../network/problemRequests";
import {Problem} from "../../../models/problem";

interface DangerZoneFormProps {
  problem: Problem;
}

const DangerZoneForm: React.FunctionComponent<DangerZoneFormProps> = (props) => {
  const onProblemClose = () => {
    if (props.problem.id) {
      closeProblem(props.problem.id)
        .then(() => {
          window.location.reload();
        })
    }
  }

  return (
    <div>
      <EditorTip title={"禁用这个问题"} className={"cms-problem-item-begin"}
                 content={
                   "设为禁用状态时，这个问题下将无法提交答案, 当前状态: " + (props.problem.closed ? "已禁用" : "正常")
                 }>
        <Button danger onClick={onProblemClose}>
          {props.problem.closed ? "启用" : "禁用"}
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
    </div>
  );
}

export default DangerZoneForm;