import React from "react";
import EditorTip from "../../../../../../components/editorTip/editorTip";
import {Button, Divider, message, Modal} from "antd";
import {Problem} from "../../../../../../models/problem";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {deleteProblem} from "../../../../../../network/problemRequests";

interface DangerZoneFormProps {
  problem: Problem;
}

const DangerZoneForm: React.FunctionComponent<DangerZoneFormProps> = (props) => {

  // 删除按钮被按下
  const onProblemDelete = () => {
    Modal.confirm({
      title: '删除确认',
      icon: <ExclamationCircleOutlined/>,
      content: '您确定要删除这个问题吗？',
      onOk() {
        if (props.problem.id) {
          deleteProblem(props.problem.id)
            .then(() => {
              message.success("删除成功~");
              window.reactRouter.replace("/cms/problem_manage");
            })
        }
      }
    })
  }

  return (
    <div>
      <EditorTip title={"清空所有提交数据"}
                 content={"删除这个问题下的所有提交数据，同时清空AC率等统计信息"}>
        <Button danger disabled>
          清空
        </Button>
      </EditorTip>
      <Divider/>
      <EditorTip title={"删除这个问题"}
                 content={"所有的题目信息/提交统计都会丢失，这个操作不可恢复"}>
        <Button
          danger
          onClick={() => {
            onProblemDelete();
          }}>
          删除
        </Button>
      </EditorTip>
    </div>
  );
}

export default DangerZoneForm;