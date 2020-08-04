/*
 * File: LoginForm.tsx
 * Description: 登录页面表单
 * Created: 2020-08-04 18:07:22
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {UserOutlined, LockOutlined, CheckCircleOutlined} from "@ant-design/icons/lib/icons";
import classNames from "classnames";

interface LoginFormProps {
  onConfirm?: (val: any) => void;
  validateRequired?: boolean;
  checkCode?: string;
  onCheckCodeClick?: () => void;
  className?: string;
}

const LoginForm: React.FunctionComponent<LoginFormProps> = (props) => {

  // 表单数据
  const [form] = Form.useForm();
  const className = classNames(props.className);

  // 登录按钮被按下
  const onLoginConfirmed = (values: any) => {
    if (props.onConfirm) {
      props.onConfirm(values);
    }
  }

  // 验证码被按下
  const onCheckCodeClick = () => {
    if (props.onCheckCodeClick) {
      props.onCheckCodeClick();
    }
  }

  return (
    <Form
      className={className}
      layout="horizontal"
      form={form} size={"large"}
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

      {
        props.checkCode && <Form.Item>
          <Row>
            <Col span={15}>
              <Form.Item
                className={"check-code-form-item"}
                rules={[{required: props.validateRequired, message: '请输入验证码!'}]}
                name="checkCodeContent">
                <Input
                  prefix={<CheckCircleOutlined/>}
                  placeholder="请输入验证码"/>
              </Form.Item>
            </Col>
            <Col span={9}>
              <img
                src={props.checkCode}
                alt={"checkCode"}
                onClick={() => onCheckCodeClick()}/>
            </Col>
          </Row>
        </Form.Item>
      }


      <div className={"check-code-image-wrap"} onClick={() => onCheckCodeClick()}>

      </div>

      <Form.Item
        shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            className={"login-form-button"}>
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