/*
 * File: limitationForm.tsx
 * Description: 题目限制相关表单编辑组件
 * Created: 2020-08-15 15:02:16
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect} from "react";
import {Form, Input, Button, message} from "antd";
import {Problem} from "../../../models/problem";
import {editProblemLimitation} from "../../../network/problemRequests";

interface LimitationFormProps {
  onConfirmed?: () => void;
  problem: Problem;
}

const LimitationForm: React.FunctionComponent<LimitationFormProps> = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(props.problem);
  }, [form, props.problem]);

  const onFinish = (values: Problem) => {
    values.id = props.problem.id;
    editProblemLimitation(values)
      .then(() => {
        message.success("编辑成功～");
      });
  };

  return (
    <div className={"initial-form-wrap"}>
      <Form form={form} onFinish={onFinish} initialValues={props.problem}>
        <Form.Item label="时间限制" name={"timeLimit"}>
          <Input placeholder="请设置时间限制"/>
        </Form.Item>
        <Form.Item label="内存限制" name={"memoryLimit"}>
          <Input placeholder="请设置内存限制"/>
        </Form.Item>
        <Form.Item label="输出限制" name={"outputLimit"}>
          <Input placeholder="请设置输出限制"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            更新上述限制
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LimitationForm;