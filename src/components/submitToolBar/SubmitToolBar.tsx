import React from "react";
import {Button} from "antd";

interface SubmitToolBarProps {
  onSubmit?: () => void;
  onSave?: () => void;
  onClear?: () => void;
}


const SubmitToolBar: React.FunctionComponent<SubmitToolBarProps> = (props) => {
  return (
    <div className={"submit-tool-bar"}>
      <div className={"left-button-group"}>
        <Button type={"primary"}
                style={{marginRight: 10}}
                onClick={props.onSubmit}>
          提交
        </Button>
        <Button onClick={props.onSave}>
          保存
        </Button>
      </div>
      <div className={"right-button-group"}>
        <Button onClick={props.onClear}>清空</Button>
      </div>
    </div>
  )
}

export default SubmitToolBar;