/*
 * File: UserEditModal.tsx
 * Description: 用户编辑
 * Created: 2020-9-13 22:49:06
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect} from 'react';
import {UserInfo} from '../../../../models/user';
import {Form, Input, message, Modal} from 'antd';
import {editUser} from '../../../../network/userRequest';

interface UserEditModalProps {
  userInfo?: UserInfo;
  visible: boolean;
  onCancel: () => void;
}

const UserEditModal: React.FunctionComponent<UserEditModalProps> = (props) => {

  useEffect(() => {
    if (props.userInfo) {
      form.setFieldsValue(props.userInfo);
    }
    // eslint-disable-next-line
  }, [props.userInfo]);

  const [form] = Form.useForm();


  // 确认
  const onConfirm = () => {
    form.validateFields()
      .then(res => {
        if (props.userInfo?.id) return editUser(props.userInfo.id, res.nickname, res.password)
      })
      .then(() => {
        message.success('编辑成功');
        props.onCancel();
      });
  }

  return (
    <Modal
      title={'编辑用户'}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      onOk={() => onConfirm()}>
      <Form form={form}>
        <Form.Item
          label={'用户名'}
          name="nickname"
          rules={[{
            required: true,
            message: '请输入用户名'
          }]}>
          <Input/>
        </Form.Item>
        <Form.Item
          label={'新密码'}
          name="password"
          rules={[{
            required: true,
            message: '请输入密码'
          }]}>
          <Input placeholder={'请输入新密码'}/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserEditModal;