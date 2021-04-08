/*
 * File: CreateProblemModal.tsx
 * Description: 创建问题的对话框
 * Created: 2020-8-28 21:46:40
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { Form, Input, Modal } from 'antd'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface CreateProblemModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (name: string) => void;
}

const CreateProblemModal: React.FunctionComponent<CreateProblemModalProps> = (props) => {
  const [form] = Form.useForm()

  // local
  const localContext = useContext(LocalContext)

  const onFormConfirm = () => {
    form.validateFields()
      .then(res => {
        props.onConfirm(res.name)
      })
  }

  return (
    <Modal
      title={localContext.problemManage.createProblem}
      visible={props.visible}
      onCancel={() => props.onCancel()} onOk={() => onFormConfirm()}>
      <Form form={form}>
        <Form.Item
          label={localContext.name}
          name='name'
          rules={[{
            required: true,
            message: `${localContext.problemManage.inputName}`
          }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateProblemModal
