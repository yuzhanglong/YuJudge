/*
 * File: Operations.tsx
 * Description: 判题机操作集合
 * Created: 2020-8-31 16:25:43
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from 'react';
import EditorTip from '../../../../components/editorTip/editorTip';
import {Button, Divider, message, Modal} from 'antd';
import {JudgeHostInfo} from '../../../../models/judgeHost';
import {deleteJudgeHost, resetJudgeHostCondition} from '../../../../network/judgeHostRequest';
import {ExclamationCircleOutlined} from '@ant-design/icons';

interface OperationsProps {
  judgeHostInfo: JudgeHostInfo;
  onReset: () => void;
}

const Operations: React.FunctionComponent<OperationsProps> = (props) => {

  // 关闭/打开判题机
  const resetJudgeHost = () => {
    resetJudgeHostCondition(props.judgeHostInfo.id)
      .then(() => {
        props.onReset();
        message.success('Successfully modify the state of the judging machine');
      })
  }

  // 移除判题机
  const removeJudgeHost = () => {
    Modal.confirm({
      title: 'Delete confirmation',
      icon: <ExclamationCircleOutlined/>,
      content: 'Are you sure you want to delete this test machine？',
      onOk() {
        deleteJudgeHost(props.judgeHostInfo.id).then(() => {
          message.success('successfully deleted');
          // 路由回切
          window.reactRouter.replace('/cms/judge_hosts');
        })
      }
    })
  }

  return (
    <div>
      <EditorTip
        title={`${props.judgeHostInfo.active ? 'close' : 'open'}The question server`}
        content={`${props.judgeHostInfo.active ? 'This judgement server will no longer accept any tasks until restarted' : 'Allow the judgement server to accept tasks'}`}>
        <Button
          type={!props.judgeHostInfo.active ? 'primary' : 'default'}
          danger={props.judgeHostInfo.active}
          onClick={() => resetJudgeHost()}>
          {props.judgeHostInfo.active ? 'close' : 'turn on'}
        </Button>
      </EditorTip>
      <Divider/>
      <EditorTip title={'Delete this judgement server'}
                 content={'Note: This operation cannot be restored'}>
        <Button danger onClick={() => removeJudgeHost()}>delete</Button>
      </EditorTip>
    </div>
  )
}

export default Operations;
