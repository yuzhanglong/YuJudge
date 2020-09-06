/*
 * File: CreateUserModal.tsx
 * Description: 用户创建对话框
 * Created: 2020-9-6 18:57:09
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Form, Input, Modal} from "antd";

interface CreateUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCreateConfirm: (nickname: string, password: string) => void;
}

const CreateUserModal: React.FunctionComponent<CreateUserModalProps> = (props) => {
  const [form] = Form.useForm();

  // 用户创建
  const onCreateUser = () => {
    form.validateFields()
      .then(res => {
        props.onCreateConfirm(res.nickname, res.password);
        props.onClose();
      })
  }

  return (
    <Modal title={'创建用户'} visible={props.isVisible} onCancel={() => props.onClose()} onOk={() => onCreateUser()}>
      <Form form={form}>
        <Form.Item
          label={"用户名"}
          name="nickname"
          rules={[{
            required: true,
            message: "请输入用户名"
          }]}>
          <Input/>
        </Form.Item>
        <Form.Item
          label={"密码"}
          name="password"
          rules={[{
            required: true,
            message: "请输入密码"
          }]}>
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUserModal;