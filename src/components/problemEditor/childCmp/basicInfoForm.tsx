import React from "react";
import {Button, Form, Input} from "antd";
import {Problem} from "../../../models/problem";
import MarkdownEditor from "../../markdownEditor/MarkdownEditor";

interface BasicInfoFormProps {
  problem: Problem;
}

const BasicInfoForm: React.FunctionComponent<BasicInfoFormProps> = (props) => {
  const [form] = Form.useForm();

  const onMarkdownChange = (event: any) => {
    console.log(event);
  }

  const onFinish = (res: any) => {
    console.log(res);
  }


  return (
    <div className={"cms-problem-editor-basic-info-wrap"}>
      <div className={"cms-problem-editor-basic-info-form"}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="题目名称"
            name="name">
            <Input/>
          </Form.Item>
          <Form.Item label="内容">
            <MarkdownEditor onChange={onMarkdownChange}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default BasicInfoForm;