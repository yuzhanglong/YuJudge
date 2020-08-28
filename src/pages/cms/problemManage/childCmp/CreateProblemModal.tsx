/*
 * File: CreateProblemModal.tsx
 * Description: 创建问题的对话框
 * Created: 2020-8-28 21:46:40
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Form, Input, Modal} from "antd";

interface CreateProblemModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (name: string) => void;
}

const CreateProblemModal: React.FunctionComponent<CreateProblemModalProps> = (props) => {
  const [form] = Form.useForm();

  const onFormConfirm = () => {
    form.validateFields()
      .then(res => {
        props.onConfirm(res.name);
      })
  }

  return (
    <Modal
      title={"创建一个问题"}
      visible={props.visible}
      onCancel={() => props.onCancel()} onOk={() => onFormConfirm()}>
      <Form form={form}>
        <Form.Item
          label={"名称"}
          name="name"
          rules={[{
            required: true,
            message: "请输入名称"
          }]}>
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateProblemModal;