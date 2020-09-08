/*
 * File: DescriptionItem.tsx
 * Description: 简单的描述组件
 * Created: 2020-9-8 20:33:18
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import style from "./descriptionItem.module.scss"

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
  labelWidth?: number;
}

const DescriptionItem: React.FunctionComponent<DescriptionItemProps> = (props) => {
  return (
    <div className={style.description_item_wrapper}>
      <p className={style.description_item_label} style={{
        width: props.labelWidth
      }}>
        {props.title}:
      </p>
      {props.content}
    </div>
  )
}

export default DescriptionItem;