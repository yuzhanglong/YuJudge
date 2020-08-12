/*
 * File: ProblemSetHome.tsx
 * Description: 题目集概览界面
 * Created: 2020-08-11 13:38:53
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Button, Card} from "antd";
import {RouteComponentProps} from "react-router-dom";
import {ProblemSet} from "../../models/problemSet";
import {getProblemSetInfo} from "../../network/problemSetRequest";

import ProblemSetDescription from "./childCmp/ProblemSetDescription";

interface ProblemSetHomeProps {

}

const ProblemSetHome: React.FunctionComponent<ProblemSetHomeProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const problemSetId: number = params.problemSetId;

  useEffect(() => {
    getProblemSetData();
  }, []);

  // 题目集基本信息
  const [problemSetInfo, setProblemSetInfo] = useState<ProblemSet>({
    createTime: 0,
    creator: undefined,
    deadline: 0,
    description: "",
    name: "",
    startTime: 0,
    allowedLanguage: [],
    judgePreference: "ACM"
  });

  // 获取题目集信息
  const getProblemSetData = () => {
    getProblemSetInfo(problemSetId)
      .then(res => {
        setProblemSetInfo(res.data);
      });
  }

  // 查看问题按钮被单击
  const onOverViewProblemsButtonClick = () => {
    props.history.push(`/problem_set/${problemSetId}/problems`);
  }

  return (
    <div className={"problem-set-home"}>
      <Card
        title={"题目集概况"}
        headStyle={{
          textAlign: "center"
        }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <ProblemSetDescription problemSetInfo={problemSetInfo}/>
          <div>
            <Button
              onClick={onOverViewProblemsButtonClick}
              type={"primary"}
              style={{
                marginTop: 20
              }}>
              查看问题
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProblemSetHome;