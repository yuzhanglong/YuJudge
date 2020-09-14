/*
 * File: Landing.tsx
 * Description: 项目着陆页
 * Created: 2020-08-04 23:32:33
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import {RouteComponentProps} from "react-router-dom";
import LandingHeader from "./childCmp/LandingHeader";
import MainPart from "./childCmp/MainPart";
import Feature from "./childCmp/Feature";
import Footer from "./childCmp/LandingFooter";
import style from "./landing.module.scss"
import {getTokenFromStorage} from "../../../utils/dataPersistence";
import {message} from "antd";

interface LandingProps {

}

const Landing: React.FunctionComponent<LandingProps & RouteComponentProps> = (props) => {
  // 前往首页
  const goHome = () => {
    if (getTokenFromStorage() == null) {
      message.info("请登录");
      gotoRegister();
      return;
    }
    props.history.push("/common/home");
  }

  // 前往注册/登录
  const gotoRegister = () => {
    props.history.push("/login");
  }
  return (
    <div className={style.landing_page}>
      <div className={style.landing}>
        <div className={style.landing_item}>
          <LandingHeader></LandingHeader>
        </div>
        <div className={style.landing_item}>
          <MainPart
            mainButtonText={"首页"}
            subButtonText={"登录"}
            onMainButtonClick={() => goHome()}
            onSubButtonClick={() => gotoRegister()}>
          </MainPart>
        </div>
        <div className={style.landing_item}>
          <Feature></Feature>
        </div>
        <div className={style.landing_item_footer}>
          <Footer></Footer>
        </div>
      </div>
    </div>

  )
}

export default Landing;