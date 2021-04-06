/*
 * File: LoginForm.tsx
 * Description: 登录页面表单
 * Created: 2020-08-04 18:07:22
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react';
import {Button, Col, Form, Input, Row} from 'antd';
import {UserOutlined, LockOutlined, CheckCircleOutlined} from '@ant-design/icons';
import classNames from 'classnames';
import style from './loginForm.module.scss';
import RcQueueAnim from 'rc-queue-anim';

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
    <RcQueueAnim>
      <div key={'login-form'}>
        <Form
          className={className}
          layout="horizontal"
          form={form} size={'large'}
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
            <Form.Item>
              <Row>
                <Col span={14}>
                  <Form.Item
                    className={style.check_code_form_item}
                    rules={[{required: props.validateRequired, message: '请输入验证码!'}]}
                    name="checkCodeContent">
                    <Input
                      prefix={<CheckCircleOutlined/>}
                      placeholder="请输入验证码"/>
                  </Form.Item>
                </Col>
                <Col span={9}>
                  {props.checkCode && <img
                    src={props.checkCode}
                    alt={'checkCode'}
                    onClick={() => onCheckCodeClick()}/>}
                </Col>
              </Row>
            </Form.Item>
          }


          <div className={'check-code-image-wrap'} onClick={() => onCheckCodeClick()}>

          </div>

          <Form.Item
            shouldUpdate={true}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                className={style.login_form_button}>
                登录
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </RcQueueAnim>
  )
}

LoginForm.defaultProps = {
  validateRequired: false
}

export default LoginForm;