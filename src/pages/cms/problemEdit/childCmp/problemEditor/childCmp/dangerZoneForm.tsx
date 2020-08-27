import React from "react";
import EditorTip from "../../../../../../components/editorTip/editorTip";
import {Button, Divider} from "antd";
import {Problem} from "../../../../../../models/problem";

interface DangerZoneFormProps {
  problem: Problem;
}

const DangerZoneForm: React.FunctionComponent<DangerZoneFormProps> = () => {
  return (
    <div>
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