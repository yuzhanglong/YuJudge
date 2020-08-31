/*
 * File: Feature.tsx
 * Description: landing特性页面
 * Created: 2020-8-31 20:20:43
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import {Card} from "antd";
import {ExperimentTwoTone} from "@ant-design/icons";
import style from "../landing.module.scss"

interface FeatureProps {

}

const Feature: React.FunctionComponent<FeatureProps> = () => {
  const renderCardCover = (
    <div className={style.feature_card_wrap}>
      <div className={style.feature_card_icon_wrap}>
        <ExperimentTwoTone/>
      </div>
      <div>
        Feature
      </div>
      <div className={style.feature_card_content}>
        FeatureFeatureFeature
        Feature FeatureFeature
        FeatureFeature Feature
        FeatureFeaturefhfhtf
      </div>
    </div>

  )
  return (
    <div className={style.landing_features}>
      <div className={style.landing_features_card_wrap}>
        <Card
          hoverable
          style={{width: 280}}>
          {renderCardCover}
        </Card>
        <Card
          hoverable
          style={{width: 280}}>
          {renderCardCover}
        </Card>
        <Card
          hoverable
          style={{width: 280}}>
          {renderCardCover}
        </Card>
        <Card
          hoverable
          style={{width: 280}}>
          {renderCardCover}
        </Card>
      </div>
    </div>
  )
}

export default Feature;