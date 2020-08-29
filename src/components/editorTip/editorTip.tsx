/*
 * File: editorTip.tsx
 * Description: 编辑功能描述小组件
 * Created: 2020-8-25 15:33:26
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import style from "./editorTip.module.scss"

interface EditorTipProps {
  title: string;
  content: string;
  children?: React.ReactNode;
}

const EditorTip: React.FunctionComponent<EditorTipProps> = (props) => {
  return (
    <div className={style.editor_tip}>
      <div>
        <div className={style.editor_tip_item_title}>
          {props.title}
        </div>
        <div className={style.editor_tip_item_description}>
          {props.content}
        </div>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default EditorTip;