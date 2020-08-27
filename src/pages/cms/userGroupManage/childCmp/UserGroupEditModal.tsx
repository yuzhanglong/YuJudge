/*
 * File: UserGroupEditModal.tsx
 * Description: 用户组创建/编辑对话框
 * Created: 2020-8-22 18:51:12
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect} from "react";
import {Form, Input, Modal} from "antd";
import {UserGroupInfo} from "../../../../models/UserGroup";

interface UserGroupEditModalProps {
  visible: boolean;
  onConfirm: (res: UserGroupInfo) => void;
  onCancel: () => void;
  dataToEdit?: UserGroupInfo | null;
}

const UserGroupEditModal: React.FunctionComponent<UserGroupEditModalProps> = (props) => {
  const [form] = Form.useForm();

  // 如果传值进来，则必然是编辑模式，需要初始化表单填充
  useEffect(() => {
    if (props.dataToEdit) {
      form.setFieldsValue(props.dataToEdit);
    } else {
      const empty: UserGroupInfo = {
        name: "",
        description: "",
        id: 0
      }
      form.setFieldsValue(empty);
    }
  }, [form, props.dataToEdit])

  const onFormConfirm = () => {
    form.validateFields()
      .then((res: any) => {
        props.onConfirm(res);
      })
      .catch(() => {
      })
  }

  return (
    <Modal
      forceRender
      maskClosable={false}
      title={`${props.dataToEdit ? "编辑用户组" : "创建一个用户组"}`}
      visible={props.visible}
      onCancel={props.onCancel}
      onOk={onFormConfirm}>
      <Form form={form}>
        <Form.Item
          name="name"
          label={"名称"}
          rules={[{
            required: true,
            message: "请输入名称"
          }]}>
          <Input placeholder="输入用户组名称"/>
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: "请输入用户组描述"
          }]}
          name="description"
          label={"描述"}>
          <Input placeholder="输入用户组描述"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserGroupEditModal;