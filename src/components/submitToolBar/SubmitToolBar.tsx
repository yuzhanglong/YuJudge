import React, { useContext } from 'react'
import {Button} from 'antd';
import { LocalContext } from '../localContext/LocalContext'

interface SubmitToolBarProps {
  onSubmit?: () => void;
  onSave?: () => void;
  onClear?: () => void;
  isButtonActive?: boolean;
}


const SubmitToolBar: React.FunctionComponent<SubmitToolBarProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)

  return (
    <div style={{display: 'flex'}}>
      <div>
        <Button
          type={'primary'}
          style={{marginRight: 10}}
          onClick={props.onSubmit}
          disabled={!props.isButtonActive}>
          {localContext.submit}
        </Button>
      </div>
      <div>
        <Button
          onClick={props.onClear}
          disabled={!props.isButtonActive}>
          {localContext.clear}
        </Button>
      </div>
    </div>
  )
}

SubmitToolBar.defaultProps = {
  isButtonActive: true
}

export default SubmitToolBar;
