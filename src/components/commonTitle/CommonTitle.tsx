/*
 * File: CommonTitle.tsx
 * Description: 标题组件
 * Created: 2020-9-5 18:30:21
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react';
import style from './commonTitle.module.scss'

interface CommonTitleProps {
  icon?: React.ReactNode;
  title: string;
}

const CommonTitle: React.FunctionComponent<CommonTitleProps> = (props) => {
  return (
    <div className={style.common_title}>
      <div className={style.common_title_icon}>
        {props.icon}
      </div>
      <div className={style.common_title_content}>
        {props.title}
      </div>
    </div>
  )
}

export default CommonTitle;