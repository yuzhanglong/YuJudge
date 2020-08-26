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
import RcQueueAnim from "rc-queue-anim";

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
      <div>
        <RcQueueAnim type={"bottom"}>
          <div key={"content"}>
            {props.children}
          </div>
        </RcQueueAnim>
      </div>

    </Layout>
  )
}

export default Common;