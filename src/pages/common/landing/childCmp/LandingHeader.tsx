/*
 * File: LandingHeader.tsx
 * Description: 着陆页头部
 * Created: 2020-08-04 11:20:01
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import style from "../landing.module.scss"
import TweenOne from "rc-tween-one";
import {Col, Row} from "antd";

interface LandingHeaderProps {

}

const LandingHeader: React.FunctionComponent<LandingHeaderProps> = () => {
  return (
    <div className={style.landing_header}>
      <div className={style.landing_header_content}>
        <TweenOne animation={{x: -30, type: 'from', ease: 'easeOutQuad'}}>
          <Row align={"middle"}>
            <Col>
              <img
                src={"http://cdn.yuzzl.top/yu_judge_logo.png"}
                alt="img"
                className={style.landing_logo}/>
            </Col>
            <Col>
              <div className={style.landing_logo_text}>
                YuJudge V1.0
              </div>
            </Col>
          </Row>
        </TweenOne>
      </div>
    </div>
  )
}

export default LandingHeader;

