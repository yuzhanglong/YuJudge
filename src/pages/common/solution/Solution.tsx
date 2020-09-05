/*
 * File: Solution.tsx
 * Description: 题解/讨论页面
 * Created: 2020-8-26 14:15:56
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {RouteComponentProps} from "react-router-dom";
import {Card, Empty} from "antd";
import {EMPTY_IMAGE} from "../../../config/config";

interface SolutionProps {

}

const Solution: React.FunctionComponent<SolutionProps & RouteComponentProps> = () => {
  return (
    <Card>
      <Empty description={"题解板块开发中"} image={EMPTY_IMAGE}/>
    </Card>
  )
}

export default Solution;