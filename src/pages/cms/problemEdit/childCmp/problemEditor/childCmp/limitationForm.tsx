/*
 * File: limitationForm.tsx
 * Description: 题目限制相关表单编辑组件
 * Created: 2020-08-15 15:02:16
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect} from "react";
import {Form, Input, Button, message} from "antd";
import {Problem} from "../../../../../../models/problem";
import {editProblemLimitation} from "../../../../../../network/problemRequests";
import style from "../../../problemEdit.module.scss"

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
        message.success("编辑成功～");
      });
  };

  return (
    <div className={style.problem_edit_limitation_form}>
      <Form form={form} onFinish={onFinish} initialValues={props.problem}>
        <Form.Item label="时间限制" name={"timeLimit"} rules={[
          {required: true, message: "请设置时间限制"}
        ]}>
          <Input placeholder="请设置时间限制" addonAfter={"ms"}/>
        </Form.Item>
        <Form.Item label="内存限制" name={"memoryLimit"} rules={[
          {required: true, message: "请设置内存限制"}
        ]}>
          <Input placeholder="请设置内存限制" addonAfter={"KB"}/>
        </Form.Item>
        <Form.Item label="输出限制" name={"outputLimit"} rules={[
          {required: true, message: "请设置输出限制"}
        ]}>
          <Input placeholder="请设置输出限制" addonAfter={"Byte"}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{marginTop: 13}}>
            更新上述限制
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LimitationForm;