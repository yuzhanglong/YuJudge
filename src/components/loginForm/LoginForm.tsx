/*
 * File: LoginForm.tsx
 * Description: 登录页面表单
 * Created: 2020-08-04 18:07:22
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Button, Form, Input} from "antd";
import {UserOutlined, LockOutlined, CheckCircleOutlined} from "@ant-design/icons/lib/icons";

interface LoginFormProps {
  onConfirm?: (val: any) => void;
  validateRequired?: boolean;
  checkCode?: string;
}

const LoginForm: React.FunctionComponent<LoginFormProps> = (props) => {

  const [form] = Form.useForm();

  // 登录按钮被按下
  const onLoginConfirmed = (values: any) => {
    if (props.onConfirm) {
      props.onConfirm(values);
    }
  }


  return (
    <Form
      name="login-form"
      layout="inline"
      form={form}
      onFinish={onLoginConfirmed}>
      <Form.Item
        rules={[{required: props.validateRequired, message: '请输入用户名!'}]}
        name="nickname">
        <Input
          prefix={<UserOutlined/>}

          placeholder="请输入用户名"/>
      </Form.Item>

      <Form.Item
        rules={[{required: props.validateRequired, message: '请输入密码!'}]}
        name="password">
        <Input
          prefix={<LockOutlined/>}
          type="password"
          placeholder="请输入密码"
        />
      </Form.Item>

      {props.checkCode && <Form.Item
        rules={[{required: props.validateRequired, message: '请输入验证码!'}]}
        name="checkCodeContent">
        <Input
          prefix={<CheckCircleOutlined/>}
          placeholder="请输入验证码"
        />
      </Form.Item>}

      <Form.Item
        shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit">
            登录
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

LoginForm.defaultProps = {
  validateRequired: false
}

export default LoginForm;