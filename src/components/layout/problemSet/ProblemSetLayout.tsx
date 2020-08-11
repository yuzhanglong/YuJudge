/*
 * File: ProblemSetLayout.tsx
 * Description: 题目、题目集相关的外部布局，例如顶部的菜单栏
 * Created: 10:53 上午
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Layout} from "antd";
import CommonMenu from "./childCmp/CommonMenu";
import {RouteComponentProps} from "react-router-dom";

interface ProblemLayoutProps {
  children: React.ReactNode;
}

const ProblemSetLayout: React.FunctionComponent<ProblemLayoutProps & RouteComponentProps> = (props) => {
  return (
    <Layout>
      <CommonMenu {...props}/>
      {props.children}
    </Layout>
  )
}

export default ProblemSetLayout;