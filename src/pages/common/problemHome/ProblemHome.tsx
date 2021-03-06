/*
 * File: problemHome.tsx
 * Description: 问题首页，包括提交区域、题解区域、代码区等
 * Created: 2020-8-2 9:51
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext, useEffect, useState } from 'react'
import { Card, message } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import { Problem } from '../../../models/problem'
import { getProblemDetailedById } from '../../../network/problemRequests'
import { getProblemSetInfo } from '../../../network/problemSetRequest'
import { ProblemSet } from '../../../models/problemSet'
import style from './problemHome.module.scss'
import RouteSelector from './childCmp/RouteSelector'
import CodeEditor from '../../../components/codeEditor/CodeEditor'
import { Submission } from '../../../models/submission'
import { DEFAULT_JUDGE_PREFERENCE } from '../../../config/config'
import { submitCode } from '../../../network/submissionRequest'
import RcQueueAnim from 'rc-queue-anim'
import { BaseResponse } from '../../../models/common'
import BetterMarkdown from '../../../components/betterMarkdown/BetterMarkdown'
import { LocalContext } from '../../../components/localContext/LocalContext'

interface ProblemShowProps {
  children: React.ReactNode;
}

const ProblemHome: React.FunctionComponent<ProblemShowProps & RouteComponentProps> = (props) => {

  const params: any = props.match.params
  const problemId: number = params.problemId
  const problemSetId: number = params.problemSetId

  // local
  const localContext = useContext(LocalContext)

  // 当前problem
  const [problem, setProblem] = useState<Problem>({})

  // 题目集基本信息
  const [problemSetInfo, setProblemSetInfo] = useState<ProblemSet>()

  useEffect(() => {
    getProblemData(problemId)
    getProblemSetData(problemSetId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId, problemSetId])

  // 提交按钮被按下
  const onSubmit = (language: string, code: string) => {
    const submission: Submission = {
      problemId: problem.id,
      codeContent: code,
      language: language,
      judgePreference: DEFAULT_JUDGE_PREFERENCE,
      problemSetId: params.problemSetId
    }
    // 发送提交请求
    submitCode(submission)
      .then(() => {
        message.success(localContext.problem.submitSuccess)
        if (problemSetId) {
          props.history.push(`/common/problem_set/${problemSetId}/problem/${problemId}/submission`)
        } else {
          props.history.push(`/common/problem/${problemId}/submission`)
        }
      })
      .catch((err: BaseResponse) => {
        message.error(err.message)
      })
  }


  // 获取题目集信息
  const getProblemSetData = (problemSetId: number) => {
    if (problemSetId) {
      getProblemSetInfo(problemSetId)
        .then(res => {
          const problemSet: ProblemSet = res.data
          setProblemSetInfo(problemSet)
        })
    }
  }

  // 获取问题数据
  const getProblemData = (problemId: number) => {
    getProblemDetailedById(problemId)
      .then(res => {
        const p: Problem = res.data
        setProblem(p)
      })
      .catch(() => {
        message.error(localContext.problem.problemNotExist)
        props.history.replace('/result/404')
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
          {`${localContext.problem.timeLimit}: ${problem.timeLimit} ms / ${localContext.problem.memoryLimit}: ${problem.memoryLimit} kb / ${localContext.problem.outputLimit}: ${getOutPutLimit(problem.outputLimit || 0)}`}
        </div>
      </div>
    )
  }

  // 获取输出限制描述
  const getOutPutLimit = (limit: number) => {
    // 大于1mb时
    if (limit > 1048576) {
      return parseInt(String((limit / 1024 / 1024))).toString() + ' MB'
    }
    return limit.toString() + ' Byte'
  }

  // 是否在problem首页
  const isInProblemHome = () => {
    const isInSubmission = props.location.pathname.includes('submission')
    const isInSolution = props.location.pathname.includes('solution')
    return !(isInSolution || isInSubmission)
  }

  return (
    <RcQueueAnim>
      {
        problem &&
        <div className={style.problem_home} key={'problem_home'}>
          <Card>
            <div className={style.problem_home_body}>
              <div className={style.problem_home_title}>
                {problem && renderTitle()}
              </div>
              <div className={style.problem_home_content}>
                <div className={style.problem_home_content_route_selector}>
                  <RouteSelector {...props} />
                </div>
                <div className={style.problem_home_content_body}>
                  <Card className={style.problem_home_content_item}>
                    {isInProblemHome() && <div>{<BetterMarkdown data={problem.content} />}</div>}
                    {!isInProblemHome() && props.children}
                  </Card>
                  {
                    isInProblemHome() &&
                    <Card className={style.problem_home_content_item}>
                      <CodeEditor
                        allowedLanguage={problemSetInfo?.allowedLanguage || []}
                        onSubmit={(l, c) => onSubmit(l, c)} />
                    </Card>
                  }
                </div>
              </div>
            </div>
          </Card>
        </div>
      }
    </RcQueueAnim>

  )
}

export default ProblemHome
