/*
 * File: ProblemLayout.tsx
 * Description: 问题页面的布局
 * Created: 2020-8-26 14:51:13
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import {getProblemDetailedById} from "../../network/problemRequests";
import {message} from "antd";
import {Problem} from "../../models/problem";

interface ProblemProps {

}

const ProblemLayout: React.FunctionComponent<ProblemProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const problemId: number = params.problemId;
  const problemSetId: number = params.problemSetId;

  // 当前problem
  const [problem, setProblem] = useState<Problem>({});

  // 获取问题数据
  const getProblemData = (problemId: number) => {
    getProblemDetailedById(problemId)
      .then(res => {
        const p: Problem = res.data;
        setProblem(p);
      })
      .catch(() => {
        message.error("这个问题不存在");
      })
  }


  return (
    <div>

    </div>
  )
}

export default ProblemLayout;