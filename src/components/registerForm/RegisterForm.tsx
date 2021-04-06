/*
 * File: RegisterForm.tsx
 * Description: 注册表单组件
 * Created: 2020-08-04 20:23:28
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react';
import {Button, Col, Form, Input, Row} from 'antd';
import {CheckCircleOutlined, LockOutlined, UserOutlined} from '@ant-design/icons';
import classNames from 'classnames';
import style from './registerForm.module.scss';
import RcQueueAnim from 'rc-queue-anim';

interface registerFormProps {
  onConfirm?: (val: any) => void;
  validateRequired?: boolean;
  checkCode?: string;
  onCheckCodeClick?: () => void;
  className?: string;
}

const RegisterForm: React.FunctionComponent<registerFormProps> = (props) => {

  const [form] = Form.useForm();
  const className = classNames(props.className);


  // 注册按钮被按下
  const onRegisterConfirmed = (values: any) => {
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

  // 验证两次密码输入是否相同
  const isPasswordSame = (): boolean => {
    const p1 = form.getFieldValue('password');
    const p2 = form.getFieldValue('passwordAgain');
    return p1 === p2;
  }

  // 两次密码是否相同的验证器
  const samePasswordValidator = (): Promise<void> => {
    if (isPasswordSame()) {
      return Promise.resolve();
    }
    return Promise.reject('两次密码输入不相同');
  }

  return (
    <RcQueueAnim>
      <div key={'register-form'}>
        <Form
          className={className}
          layout="horizontal"
          form={form}
          size={'large'}
          onFinish={onRegisterConfirmed}>
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

          <Form.Item
            rules={
              [
                {required: props.validateRequired, message: '请重复输入一遍密码!'},
                {
                  required: true,
                  message: '两次密码输入不相同!',
                  validator: samePasswordValidator
                }
              ]
            }
            name="passwordAgain">
            <Input
              prefix={<LockOutlined/>}
              type="password"
              placeholder="请重复输入密码"
            />
          </Form.Item>


          {
            <Form.Item>
              <Row>
                <Col span={15}>
                  <Form.Item
                    className={style.check_code_form_item}
                    rules={[{required: props.validateRequired, message: '请输入验证码!'}]}
                    name="checkCodeContent">
                    <Input
                      prefix={<CheckCircleOutlined/>}
                      placeholder="请输入验证码"
                    />
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

          <Form.Item
            shouldUpdate={true}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                className={style.register_form_button}>
                注册
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </RcQueueAnim>
  )
}

export default RegisterForm;