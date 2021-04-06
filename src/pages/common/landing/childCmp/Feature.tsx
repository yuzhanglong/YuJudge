/*
 * File: Feature.tsx
 * Description: landing特性页面
 * Created: 2020-8-31 20:20:43
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from 'react';
import style from '../landing.module.scss'

interface FeatureProps {

}

const Feature: React.FunctionComponent<FeatureProps> = () => {

  return (
    <div className={style.landing_features}>
      <div className={style.landing_features_card_wrap}>
      </div>
    </div>
  )
}

export default Feature;