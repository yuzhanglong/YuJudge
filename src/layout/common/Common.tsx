/*
 * File: Common.tsx
 * Description: 题目、题目集相关的外部布局，例如顶部的菜单栏
 * Created: 10:53 上午
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Affix, Layout} from "antd";
import CommonMenu from "./childCmp/CommonMenu";
import {RouteComponentProps} from "react-router-dom";
import style from "../layout.module.scss"

interface ProblemLayoutProps {
  children: React.ReactNode;
}

const Common: React.FunctionComponent<ProblemLayoutProps & RouteComponentProps> = (props) => {
  return (
    <Layout>
      <Affix offsetTop={0}>
        <div>
          <CommonMenu {...props}/>
        </div>
      </Affix>
      <div key={"content"} className={style.common_content}>
        <div className={style.common_content_mask}>
          {props.children}
        </div>

      </div>
    </Layout>
  )
}

export default Common;