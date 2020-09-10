/*
 * File: basicInfoForm.tsx
 * Description: 题目基本信息表单
 * Created: 2020-8-25 15:43:31
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Button, Form, Input, message} from "antd";
import {Problem} from "../../../../../../models/problem";
import TagGroup from "../../../../../../components/tagGroup/TagGroup";
import {editProblemBasicInfo} from "../../../../../../network/problemRequests";
import style from "../../../problemEdit.module.scss";
import MarkdownEditor from "../../../../../../components/markdownEditor/MarkdownEditor";


interface BasicInfoFormProps {
  problem: Problem;
}

const BasicInfoForm: React.FunctionComponent<BasicInfoFormProps> = (props) => {
  const [form] = Form.useForm();
  // 当前标签
  const [currentTags, setCurrentTags] = useState<string[]>([]);

  // Markdown内容
  const [content, setContent] = useState<string | undefined>("");


  useEffect(() => {
    form.setFieldsValue(props.problem);
    setCurrentTags(props.problem.characterTags || []);
    setContent(props.problem.content);
  }, [form, props.problem]);


  useEffect(() => {

  }, [props.problem])


  // 标签删除
  const onTagRemove = (index: number) => {
    let tmp = [];
    tmp.push(...currentTags);
    tmp.splice(index, 1);
    setCurrentTags(tmp);
  }

  // 保存修改
  const onSaveButtonClick = () => {
    form.validateFields()
      .then(res => {
        let requestBody: Problem = {
          characterTags: currentTags,
          content: content,
          name: res.name,
          id: props.problem.id
        }
        editProblemBasicInfo(requestBody)
          .then(() => {
            message.success("保存成功~");
          });
      })
      .catch(() => {
      })
  }

  return (
    <div className={style.problem_edit_basic_info_wrap}>
      <div className={style.problem_edit_basic_info_form}>
        <Form
          layout={"vertical"}
          form={form}>
          <Form.Item
            label="题目名称"
            name={"name"}>
            <Input/>
          </Form.Item>
          <Form.Item label="题目标签">
            <TagGroup
              initTags={currentTags}
              onTagAdd={(e: string[]) => {
                setCurrentTags(e);
              }}
              onTagRemove={onTagRemove}
              isRefuseLastTagClose/>
          </Form.Item>
        </Form>
      </div>
      <MarkdownEditor
        value={content || ""}
        onValueChange={(v) => setContent(v)}/>
      <Button
        type="primary"
        style={{
          marginTop: 20
        }}
        onClick={() => onSaveButtonClick()}>
        保存修改
      </Button>
    </div>
  );
}

export default BasicInfoForm;