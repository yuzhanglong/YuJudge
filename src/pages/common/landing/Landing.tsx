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

interface LandingProps {

}

const Landing: React.FunctionComponent<LandingProps & RouteComponentProps> = (props) => {
  // 前往登录页面
  const gotoLoginPage = () => {
    props.history.push("/login");
  }

  // 前往注册界面
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
            onMainButtonClick={() => gotoLoginPage()}
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