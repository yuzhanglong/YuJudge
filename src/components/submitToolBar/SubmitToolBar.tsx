import React from "react";
import {Button} from "antd";

interface SubmitToolBarProps {
  onSubmit?: () => void;
  onSave?: () => void;
  onClear?: () => void;
  isButtonActive?: boolean;
}


const SubmitToolBar: React.FunctionComponent<SubmitToolBarProps> = (props) => {
  return (
    <div className={"submit-tool-bar"}>
      <div className={"left-button-group"}>
        <Button type={"primary"}
                style={{marginRight: 10}}
                onClick={props.onSubmit}
                disabled={!props.isButtonActive}>
          提交
        </Button>
        <Button onClick={props.onSave}
                disabled={!props.isButtonActive}>
          保存
        </Button>
      </div>
      <div className={"right-button-group"}>
        <Button onClick={props.onClear}
                disabled={!props.isButtonActive}>
          清空
        </Button>
      </div>
    </div>
  )
}

SubmitToolBar.defaultProps = {
  isButtonActive: true
}

export default SubmitToolBar;