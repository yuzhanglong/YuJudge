import React from 'react';
import {Button} from 'antd';

interface SubmitToolBarProps {
  onSubmit?: () => void;
  onSave?: () => void;
  onClear?: () => void;
  isButtonActive?: boolean;
}


const SubmitToolBar: React.FunctionComponent<SubmitToolBarProps> = (props) => {
  return (
    <div style={{display: 'flex'}}>
      <div>
        <Button
          type={'primary'}
          style={{marginRight: 10}}
          onClick={props.onSubmit}
          disabled={!props.isButtonActive}>
          提交
        </Button>
      </div>
      <div>
        <Button
          onClick={props.onClear}
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