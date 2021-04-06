/*
 * File: ProblemSetHome.tsx
 * Description: 题目集概览界面
 * Created: 2020-08-11 13:38:53
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from 'react';
import {Button, Card, message} from 'antd';
import {RouteComponentProps} from 'react-router-dom';
import {ProblemSet} from '../../../models/problemSet';
import {getProblemSetInfo} from '../../../network/problemSetRequest';
import style from './problemSetHome.module.scss'
import ProblemSetDescription from './childCmp/ProblemSetDescription';
import RcQueueAnim from 'rc-queue-anim';
import {BaseResponse} from '../../../models/common';
import {goToResult} from '../../../utils/route';
import {ResultPageParam} from '../../../common/enumerations';

interface ProblemSetHomeProps {

}

const ProblemSetHome: React.FunctionComponent<ProblemSetHomeProps & RouteComponentProps> = (props) => {

  const params: any = props.match.params;
  const problemSetId: number = params.problemSetId;

  // 题目集基本信息
  const [problemSetInfo, setProblemSetInfo] = useState<ProblemSet>();


  useEffect(() => {
    getProblemSetData(problemSetId);
    // eslint-disable-next-line
  }, [problemSetId]);


  // 获取题目集信息
  const getProblemSetData = (problemSetId: number) => {
    getProblemSetInfo(problemSetId)
      .then(res => {
        setProblemSetInfo(res.data);
      })
      .catch((err: BaseResponse) => {
        message.error(err.message);
        goToResult(ResultPageParam.PROBLEM_SET_FORBIDDEN);
      })
  }

  // 查看问题按钮被单击
  const onOverViewProblemsButtonClick = () => {
    props.history.push(`/common/problem_set/${problemSetId}/problems`);
  }


  return (
    <RcQueueAnim>
      {problemSetInfo && <div className={style.problem_set_home} key={'problem-set-home'}>
        <div className={style.problem_set_home_content}>
          <Card title={'题目集概况'} headStyle={{textAlign: 'center'}}>
            <div className={style.problem_set_home_body}>
              <div className={style.problem_set_home_description}>
                <ProblemSetDescription
                  problemSetInfo={problemSetInfo}/>
              </div>
              <div>
                <Button
                  onClick={onOverViewProblemsButtonClick}
                  type={'primary'}
                  className={style.see_problems_button}>
                  查看问题
                </Button>
              </div>
            </div>
          </Card>
        </div>

      </div>}
    </RcQueueAnim>
  )
}

export default ProblemSetHome;