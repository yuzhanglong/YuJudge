/*
 * File: problemSetProblems.tsx
 * Description: 题目集中的题目展示页面
 * 在此页面中，用户可以预览当前题目集下所有的题目
 * Created: 2020-08-11 13:26:33
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect} from 'react';
import {UsePaginationState} from '../../../hooks/pagination';
import {ProblemSetProblemPaginationRequest} from '../../../models/pagination';
import {PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE} from '../../../config/config';
import {getProblemSetProblems} from '../../../network/problemSetRequest';
import {Button, Card, message} from 'antd';
import {RouteComponentProps} from 'react-router-dom';
import ProblemTable from '../../../components/problemTable/ProblemTable';
import RcQueueAnim from 'rc-queue-anim';
import style from './problemSetProblem.module.scss';
import {BaseResponse} from '../../../models/common';
import {goToResult} from '../../../utils/route';
import {ResultPageParam} from '../../../common/enumerations';

interface ProblemSetProblemsProps {

}

const ProblemSetProblems: React.FunctionComponent<ProblemSetProblemsProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;

  const problemSetProblemPagination = UsePaginationState<ProblemSetProblemPaginationRequest>(PAGE_BEGIN - 1, getProblemSetProblems);

  useEffect(() => {
    getProblemSetProblemData(params.problemSetId, PAGE_BEGIN - 1);
    // eslint-disable-next-line
  }, [params.problemSetId]);


  // 获取题目集所有题目
  const getProblemSetProblemData = (problemSetId: number, start: number) => {
    problemSetProblemPagination
      .changeCurrentPage({
        start: start,
        count: SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE,
        problemSetId: problemSetId
      })
      .catch((err: BaseResponse) => {
        message.error(err.message);
        goToResult(ResultPageParam.PROBLEM_SET_FORBIDDEN);
      })
  }

  // 跳转到某个problem
  const onGotoProblemButtonClick = (content: any) => {
    const problemId = content.id;
    props.history.push(`/common/problem_set/${params.problemSetId}/problem/${problemId}`);
  }

  return (
    <RcQueueAnim>
      <div className={style.problem_set_problem} key={'problem-set-home'}>
        <div className={style.problem_set_problem_content}>
          <Card
            title={'所有题目'}
            headStyle={{textAlign: 'center'}}>
            <div className={style.problem_set_problem_body}>
              <ProblemTable
              isLoading={problemSetProblemPagination.isLoading}
              problems={problemSetProblemPagination.items}
              isShowOperations
              showEditButton={false}
              onPageChange={(val: number) => getProblemSetProblemData(params.problemSetId, val - 1)}
              totalPage={problemSetProblemPagination.paginationInfo.totalPage}
              otherOperations={(content: any) => {
                return (
                  <Button
                    type={'link'}
                    onClick={() => onGotoProblemButtonClick(content)}>
                    前往
                  </Button>
                )
              }}>
            </ProblemTable>
            </div>
          </Card>
        </div>
      </div>
    </RcQueueAnim>
  )
}

export default ProblemSetProblems;