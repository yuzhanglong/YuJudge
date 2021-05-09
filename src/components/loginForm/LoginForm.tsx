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
            rules={[{required: props.validateRequired, message: 'please enter user name!'}]}
            name="nickname">
            <Input
              prefix={<UserOutlined/>}
              placeholder="please enter user name"/>
          </Form.Item>

          <Form.Item
            rules={[{required: props.validateRequired, message: 'please enter the password!'}]}
            name="password">
            <Input
              prefix={<LockOutlined/>}
              type="password"
              placeholder="Please enter the password"
            />
          </Form.Item>

          {
            <Form.Item>
              <Row>
                <Col span={14}>
                  <Form.Item
                    className={style.check_code_form_item}
                    rules={[{required: props.validateRequired, message: 'please enter verification code!'}]}
                    name="checkCodeContent">
                    <Input
                      prefix={<CheckCircleOutlined/>}
                      placeholder="enter verification code"/>
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
                log in
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
