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
    return Promise.reject('Two password entries are not the same');
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
            rules={[{required: props.validateRequired, message: 'please input user name'}]}
            name="nickname">
            <Input
              prefix={<UserOutlined/>}
              placeholder="please enter user name"/>
          </Form.Item>

          <Form.Item
            rules={[{required: props.validateRequired, message: 'please input password'}]}
            name="password">
            <Input
              prefix={<LockOutlined/>}
              type="password"
              placeholder="Please enter the password"
            />
          </Form.Item>

          <Form.Item
            rules={
              [
                {required: props.validateRequired, message: 'please enter the password again!'},
                {
                  required: true,
                  message: 'Two password entries are not the same!',
                  validator: samePasswordValidator
                }
              ]
            }
            name="passwordAgain">
            <Input
              prefix={<LockOutlined/>}
              type="password"
              placeholder="Please re-enter the password"
            />
          </Form.Item>


          {
            <Form.Item>
              <Row>
                <Col span={15}>
                  <Form.Item
                    className={style.check_code_form_item}
                    rules={[{required: props.validateRequired, message: 'please enter verification code!'}]}
                    name="checkCodeContent">
                    <Input
                      prefix={<CheckCircleOutlined/>}
                      placeholder="please enter verification code"
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
                register
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </RcQueueAnim>
  )
}

export default RegisterForm;
