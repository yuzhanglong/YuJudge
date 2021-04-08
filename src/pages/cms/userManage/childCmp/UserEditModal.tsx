/*
 * File: UserEditModal.tsx
 * Description: 用户编辑
 * Created: 2020-9-13 22:49:06
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext, useEffect } from 'react'
import { UserInfo } from '../../../../models/user'
import { Form, Input, message, Modal } from 'antd'
import { editUser } from '../../../../network/userRequest'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface UserEditModalProps {
  userInfo?: UserInfo;
  visible: boolean;
  onCancel: () => void;
}

const UserEditModal: React.FunctionComponent<UserEditModalProps> = (props) => {

  useEffect(() => {
    if (props.userInfo) {
      form.setFieldsValue(props.userInfo)
    }
    // eslint-disable-next-line
  }, [props.userInfo])

  const [form] = Form.useForm()


  // 确认
  const onConfirm = () => {
    form.validateFields()
      .then(res => {
        if (props.userInfo?.id) return editUser(props.userInfo.id, res.nickname, res.password)
      })
      .then(() => {
        message.success(localContext.user.editSuccess)
        props.onCancel()
      })
  }

  // local
  const localContext = useContext(LocalContext)

  return (
    <Modal
      title={localContext.user.edit}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      onOk={() => onConfirm()}>
      <Form form={form}>
        <Form.Item
          label={localContext.user.name}
          name='nickname'
          rules={[{
            required: true,
            message: `${localContext.user.pleaseInputUser}`
          }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label={localContext.user.newPassword}
          name='password'
          rules={[{
            required: true,
            message: localContext.user.pleaseInputPassword
          }]}>
          <Input
            placeholder={localContext.user.pleaseInputNewPassword} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserEditModal
