/*
 * File: LimitationForm.tsx
 * Description: 题目限制相关表单编辑组件
 * Created: 2020-08-15 15:02:16
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect} from 'react';
import {Form, Input, Button, message} from 'antd';
import {Problem} from '../../../../../../models/problem';
import {editProblemLimitation} from '../../../../../../network/problemRequests';
import style from '../../../problemEdit.module.scss'

interface LimitationFormProps {
  onConfirmed?: () => void;
  problem: Problem;
}

const LimitationForm: React.FunctionComponent<LimitationFormProps> = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(props.problem);
  }, [form, props.problem]);

  // 提交按钮被点击，最好是把值抛到父组件再执行请求，保证组件独立性
  const onFinish = (values: Problem) => {
    values.id = props.problem.id;
    editProblemLimitation(values)
      .then(() => {
        message.success('EditSuccessfully～');
      });
  };

  return (
    <div className={style.problem_edit_limitation_form}>
      <Form form={form} onFinish={onFinish} initialValues={props.problem}>
        <Form.Item label="time limit" name={'timeLimit'} rules={[
          {required: true, message: 'Please set a time limit'}
        ]}>
          <Input placeholder="please set a time limit" addonAfter={'ms'}/>
        </Form.Item>
        <Form.Item label="Memory limit" name={'memoryLimit'} rules={[
          {required: true, message: 'Please set memory limit'}
        ]}>
          <Input placeholder="Please set memory limit" addonAfter={'KB'}/>
        </Form.Item>
        <Form.Item label="Output limit" name={'outputLimit'} rules={[
          {required: true, message: 'Please set output limit'}
        ]}>
          <Input placeholder="Please set output limit" addonAfter={'Byte'}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{marginTop: 13}}>
            Update the above restrictions
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LimitationForm;
