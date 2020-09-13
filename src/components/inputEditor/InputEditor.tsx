/*
 * File: InputEditor.tsx
 * Description: 简易编辑器，一般用于单个字段的编辑
 * Created: 2020-9-13 22:10:50
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {CheckOutlined, EditOutlined} from "@ant-design/icons";
import style from "./inputEditor.module.scss";
import {Input} from "antd";
import {compiler} from "webpack";

interface InputEditorProps {
  // 绑定值
  value?: string;
  // 确认
  onConfirm?: () => void;
  // 改变
  onChange?: (content: string) => void;
}

const InputEditor: React.FunctionComponent<InputEditorProps> = (props) => {

  // 是否在编辑状态
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // 渲染标题
  const renderTitle = () => {
    if (!isEdit) {
      return (
        <div className={style.input_editor_title}>
          {props.value}
        </div>
      )
    }
    return <Input
      value={props.value}
      className={style.input_editor_input}
      onChange={(event) => onInputChange(event)}/>
  }

  // 改变
  const onInputChange = (event: any) => {
    event.persist();
    if (props.onChange) {
      props.onChange(event.target.value || "");
    }
  }

  // 编辑确认
  const onEditConfirm = () => {
    if (props.onConfirm) {
      props.onConfirm();
    }
    setIsEdit(!isEdit);
  }


  // 渲染图标
  const renderIcon = () => {
    if (isEdit) {
      return <CheckOutlined className={style.input_editor_icon} onClick={() => onEditConfirm()}/>
    }
    return <EditOutlined className={style.input_editor_icon} onClick={() => setIsEdit(!isEdit)}/>
  }

  return (
    <div className={style.input_editor}>
      {renderTitle()}
      {renderIcon()}
    </div>
  )
}

export default InputEditor;