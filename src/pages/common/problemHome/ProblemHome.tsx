/*
 * File: problemHome.tsx
 * Description: 问题首页，包括提交区域、题解区域、代码区等
 * Created: 2020-8-2 9:51
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Card, message} from "antd";
import {RouteComponentProps} from "react-router-dom";
import {Problem} from "../../../models/problem";
import {getProblemDetailedById} from "../../../network/problemRequests";
import {getProblemSetInfo} from "../../../network/problemSetRequest";
import {ProblemSet} from "../../../models/problemSet";
import style from "./problemHome.module.scss"
import RouteSelector from "./childCmp/RouteSelector";
import CodeEditor from "../../../components/codeEditor/CodeEditor";
import {SubmissionInfo} from "../../../models/submissionInfo";
import {DEFAULT_JUDGE_PREFERENCE} from "../../../config/config";
import {submitCode} from "../../../network/submissionRequest";
import RcQueueAnim from "rc-queue-anim";

interface ProblemShowProps {
  children: React.ReactNode;
}

const ProblemHome: React.FunctionComponent<ProblemShowProps & RouteComponentProps> = (props) => {
  console.log(props);

  const params: any = props.match.params;
  const problemId: number = params.problemId;
  const problemSetId: number = params.problemSetId;


  // 当前problem
  const [problem, setProblem] = useState<Problem>({});

  // 题目集基本信息
  const [problemSetInfo, setProblemSetInfo] = useState<ProblemSet>();

  useEffect(() => {
    getProblemData(problemId);
    getProblemSetData(problemSetId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId, problemSetId]);

  // 提交按钮被按下
  const onSubmit = (language: string, code: string) => {
    const submission: SubmissionInfo = {
      problemId: problem.id,
      codeContent: code,
      language: language,
      judgePreference: DEFAULT_JUDGE_PREFERENCE,
      problemSetId: params.problemSetId
    }
    // 发送提交请求
    submitCode(submission).then(() => {
      message.success("提交成功~");
      if (problemSetId) {
        props.history.push(`/common/problem_set/${problemSetId}/problem/${problemId}/submission`);
      } else {
        props.history.push(`/common/problem/${problemId}/submission`);
      }
    });
  }


  // 获取题目集信息
  const getProblemSetData = (problemSetId: number) => {
    if (problemSetId) {
      getProblemSetInfo(problemSetId)
        .then(res => {
          const problemSet: ProblemSet = res.data;
          setProblemSetInfo(problemSet);
        });
    }
  }

  // 获取问题数据
  const getProblemData = (problemId: number) => {
    getProblemDetailedById(problemId)
      .then(res => {
        const p: Problem = res.data;
        setProblem(p);
      })
      .catch(() => {
        message.error("这个问题不存在");
        props.history.replace("/result/404");
      })
  }

  // 渲染标题
  const renderTitle = () => {
    return (
      <div>
        <div className={style.problem_home_title_problem_name}>
          {problem.name}
        </div>
        <div className={style.problem_home_title_problem_limitation}>
          {`时间限制: ${problem.timeLimit} ms / 内存限制: ${problem.memoryLimit} kb / 输出限制: ${problem.cpuTimeLimit} byte`}
        </div>
      </div>
    )
  }

  // 是否在problem首页
  const isInProblemHome = () => {
    const isInSubmission = props.location.pathname.includes("submission");
    const isInSolution = props.location.pathname.includes("solution");
    return !(isInSolution || isInSubmission);
  }

  return (
    <RcQueueAnim>
      <div className={style.problem_home} key={"problem_home"}>
        <Card>
          <div className={style.problem_home_title}>
            {renderTitle()}
          </div>

          <div className={style.problem_home_content}>
            <div className={style.problem_home_content_route_selector}>
              <RouteSelector/>
            </div>
            <div className={style.problem_home_content_body}>
              <Card className={style.problem_home_content_item}>
                {isInProblemHome() && <div dangerouslySetInnerHTML={{__html: problem.content || ""}}/>}
                {!isInProblemHome() && props.children}
              </Card>
              {
                isInProblemHome() &&
                <Card className={style.problem_home_content_item}>
                  <CodeEditor
                    allowedLanguage={problemSetInfo?.allowedLanguage || []}
                    onSubmit={(l, c) => onSubmit(l, c)}/>
                </Card>
              }
            </div>
          </div>
        </Card>
      </div>
    </RcQueueAnim>

  )
}

export default ProblemHome;