import React from 'react';
import EditorTip from '../../../../../../components/editorTip/editorTip';
import {Button, Divider, message, Modal} from 'antd';
import {Problem} from '../../../../../../models/problem';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {deleteProblem} from '../../../../../../network/problemRequests';

interface DangerZoneFormProps {
  problem: Problem;
}

const DangerZoneForm: React.FunctionComponent<DangerZoneFormProps> = (props) => {

  // 删除按钮被按下
  const onProblemDelete = () => {
    Modal.confirm({
      title: 'Delete confirmation',
      icon: <ExclamationCircleOutlined/>,
      content: 'Are you sure you want to delete this question？',
      onOk() {
        if (props.problem.id) {
          deleteProblem(props.problem.id)
            .then(() => {
              message.success('successfully deleted~');
              window.reactRouter.replace('/cms/problem_manage');
            })
        }
      }
    })
  }

  return (
    <div>
      <EditorTip title={'Clear all submitted data'}
                 content={'Delete all submitted data under this question, and clear statistics such as AC rate at the same time'}>
        <Button danger disabled>
          empty
        </Button>
      </EditorTip>
      <Divider/>
      <EditorTip title={'Delete this question'}
                 content={'All topic information submission statistics will be lost, this operation cannot be restored'}>
        <Button
          danger
          onClick={() => {
            onProblemDelete();
          }}>
          delete
        </Button>
      </EditorTip>
    </div>
  );
}

export default DangerZoneForm;
