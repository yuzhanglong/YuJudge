/*
 * File: FeatureItem.tsx
 * Description: 特性子项
 * Created: 2020-9-1 13:16:22
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react';
import style from '../landing.module.scss';
import {ExperimentTwoTone} from '@ant-design/icons';

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem: React.FunctionComponent<FeatureItemProps> = (props) => {
  return (
    <div className={style.feature_card_wrap}>
      <div className={style.feature_card_icon_wrap}>
        <ExperimentTwoTone/>
      </div>
      <div>
        {props.title}
      </div>
      <div className={style.feature_card_content}>
        {props.description}
      </div>
    </div>
  )
}

export default FeatureItem;