import React, {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import {Problem} from "../../../models/problem";
import MarkdownEditor from "../../markdownEditor/MarkdownEditor";
import TagGroup from "../../tagGroup/TagGroup";
import {editProblemBasicInfo} from "../../../network/problemRequests";

interface BasicInfoFormProps {
  problem: Problem;
}

const BasicInfoForm: React.FunctionComponent<BasicInfoFormProps> = (props) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState<string>("");
  const [currentTags, setCurrentTags] = useState<string[]>([]);


  useEffect(() => {
    form.setFieldsValue(props.problem);
    setCurrentTags(props.problem.characterTags || []);
    setContent(props.problem.content || "");
  }, [form, props.problem]);


  // markdown内容被改变
  const onMarkdownChange = (event: any) => {
    setContent(event);
  }

  // 表单确认
  const onFinish = (res: any) => {
    console.log(currentTags);
    console.log(content);
    let requestBody: Problem = {
      characterTags: currentTags,
      content: content,
      name: res.name,
      id: props.problem.id
    }
    editProblemBasicInfo(requestBody)
      .then(res => {
        console.log(res);
      });
  }

  // 标签删除
  const onTagRemove = (index: number) => {
    let tmp = [];
    tmp.push(...currentTags);
    tmp.splice(index, 1);
    setCurrentTags(tmp);
  }

  return (
    <div className={"cms-problem-editor-basic-info-wrap"}>
      <div className={"cms-problem-editor-basic-info-form"}>
        <Form
          layout={"vertical"}
          form={form}
          onFinish={onFinish}>
          <Form.Item
            label="题目名称"
            name={"name"}>
            <Input/>
          </Form.Item>
          <Form.Item
            label="题目内容">
            <MarkdownEditor
              onChange={onMarkdownChange}
              content={props.problem.content}/>
          </Form.Item>
          <Form.Item
            label="题目标签">
            <TagGroup
              initTags={currentTags}
              onTagAdd={(e: string[]) => {
                setCurrentTags(e);
              }}
              onTagRemove={onTagRemove}
              isRefuseLastTagClose/>
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