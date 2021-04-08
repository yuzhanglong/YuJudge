/*
 * File: CreateUserModal.tsx
 * Description: 用户创建对话框
 * Created: 2020-9-6 18:57:09
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { Form, Input, Modal } from 'antd'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface CreateUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCreateConfirm: (nickname: string, password: string) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = (props) => {
  const [form] = Form.useForm()

  // 用户创建
  const onCreateUser = () => {
    form.validateFields()
      .then(res => {
        props.onCreateConfirm(res.nickname, res.password)
        props.onClose()
      })
  }

  // local
  const localContext = useContext(LocalContext)

  return (
    <Modal
      title={localContext.user.create}
      visible={props.isVisible}
      onCancel={() => props.onClose()}
      onOk={() => onCreateUser()}>
      <Form form={form}>
        <Form.Item
          label={localContext.user.name}
          name='nickname'
          rules={[{
            required: true,
            message: localContext.user.pleaseInputUser
          }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label={localContext.user.password}
          name='password'
          rules={[{
            required: true,
            message: localContext.user.pleaseInputPassword
          }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUserModal
