/*
 * File: Problems.tsx
 * Description: 所有题目页面
 * Created: 2020-8-30 22:10:39
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext, useEffect } from 'react'
import { Button, Card, message } from 'antd'
import ProblemTable from '../../../components/problemTable/ProblemTable'
import RcQueueAnim from 'rc-queue-anim'
import { UsePaginationState } from '../../../hooks/pagination'
import { ProblemPaginationRequest } from '../../../models/pagination'
import { PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE } from '../../../config/config'
import { RouteComponentProps } from 'react-router-dom'
import { getProblems } from '../../../network/problemRequests'
import style from './problems.module.scss'
import { LocalContext } from '../../../components/localContext/LocalContext'

interface ProblemsProps {

}

const Problems: React.FunctionComponent<ProblemsProps & RouteComponentProps> = (props) => {
  const problemPagination = UsePaginationState<ProblemPaginationRequest>(PAGE_BEGIN - 1, getProblems)
  // local
  const localContext = useContext(LocalContext)

  useEffect(() => {
    getProblemData(PAGE_BEGIN - 1)
    // eslint-disable-next-line
  }, [])

  // 获取题目集所有题目
  const getProblemData = (start: number) => {
    problemPagination
      .changeCurrentPage({
        search: null,
        start: start,
        count: SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE
      })
      .catch((err) => {
        message.error(err.message)
      })
  }

  // 跳转到某个problem
  const onGotoProblemButtonClick = (content: any) => {
    const problemId = content.id
    props.history.push(`/common/problem/${problemId}`)
  }

  return (
    <RcQueueAnim>
      <div className={style.problems} key={'problem-set-home'}>
        <div className={style.problems_content}>
          <Card
            title={localContext.problem.total}
            headStyle={{ textAlign: 'center' }}>
            <div className={style.problems_table_wrap}>
              <ProblemTable
                tableSize={'middle'}
                isShowProblemOrder={false}
                isLoading={problemPagination.isLoading}
                problems={problemPagination.items}
                isShowOperations
                showEditButton={false}
                onPageChange={(val: number) => getProblemData(val - 1)}
                totalPage={problemPagination.paginationInfo.totalPage}
                otherOperations={(content: any) => {
                  return (
                    <Button
                      type={'link'}
                      onClick={() => onGotoProblemButtonClick(content)}>
                      {localContext.go}
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

export default Problems
