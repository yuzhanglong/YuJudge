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
        message.success('修改判题机状态成功');
      })
  }

  // 移除判题机
  const removeJudgeHost = () => {
    Modal.confirm({
      title: '删除确认',
      icon: <ExclamationCircleOutlined/>,
      content: '您确定要删除这个判题机吗？',
      onOk() {
        deleteJudgeHost(props.judgeHostInfo.id).then(() => {
          message.success('删除成功');
          // 路由回切
          window.reactRouter.replace('/cms/judge_hosts');
        })
      }
    })
  }

  return (
    <div>
      <EditorTip
        title={`${props.judgeHostInfo.active ? '关闭' : '打开'}这个判题服务器`}
        content={`${props.judgeHostInfo.active ? '这个判题服务器将不再接受任何任务直到重新启动' : '允许判题服务器接受任务'}`}>
        <Button
          type={!props.judgeHostInfo.active ? 'primary' : 'default'}
          danger={props.judgeHostInfo.active}
          onClick={() => resetJudgeHost()}>
          {props.judgeHostInfo.active ? '关闭' : '开启'}
        </Button>
      </EditorTip>
      <Divider></Divider>
      <EditorTip title={'删除这个判题服务器'}
                 content={'注意: 这个操作不可恢复'}>
        <Button danger onClick={() => removeJudgeHost()}>删除</Button>
      </EditorTip>
    </div>
  )
}

export default Operations;