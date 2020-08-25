/*
 * File: BasicInfoEditor.tsx
 * Description: 题目集基本信息编辑表单组件
 * Created: 2020-08-15 18:21:00
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect} from "react";
import {Button, DatePicker, Form, Input} from "antd";
import {ProblemSet} from "../../../../models/problemSet";
import {getDateRangeMomentArray} from "../../../../utils/dateTime";

interface BasicInfoEditorProps {
  problemSet: ProblemSet;
  onEditConfirm: (value: any) => void;
}

const BasicInfoEditor: React.FunctionComponent<BasicInfoEditorProps> = (props) => {
  console.log(props.problemSet);
  const [form] = Form.useForm();

  // 表单初始化
  useEffect(() => {
    form.setFieldsValue({
      name: props.problemSet.name,
      description: props.problemSet.description,
      timeRange: getDateRangeMomentArray(
        props.problemSet.startTime || 0,
        props.problemSet.deadline || 0
      )
    });
  }, [form, props.problemSet]);

  // 表单确认
  const onFormFinish = (data: any) => {
    props.onEditConfirm(data);
  }

  return (
    <Form form={form} labelAlign={"left"} onFinish={onFormFinish}>
      <Form.Item
        label="题目名称"
        name={"name"}>
        <Input/>
      </Form.Item>
      <Form.Item
        label="时间限制"
        name={"timeRange"}>
        <DatePicker.RangePicker showTime/>
      </Form.Item>
      <Form.Item
        label="内容描述"
        name={"description"}>
        <Input.TextArea/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          保存修改
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BasicInfoEditor;