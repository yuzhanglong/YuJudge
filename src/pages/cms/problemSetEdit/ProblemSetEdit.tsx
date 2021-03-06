/*
 * File: ProblemSetEdit.tsx
 * Description: 题目集编辑页面
 * Created: 2020-08-09 22:36:48
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ProblemSetEditor from './childCmp/ProblemSetEditor'
import {
  getProblemSetInfo,
  getProblemSetProblems,
  removeProblemFormProblemSet
} from '../../../network/problemSetRequest'
import AddProblem from './childCmp/AddProblem'
import { UsePaginationState } from '../../../hooks/pagination'
import { PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE } from '../../../config/config'
import { getProblems } from '../../../network/problemRequests'
import { ProblemPaginationRequest, ProblemSetProblemPaginationRequest } from '../../../models/pagination'
import { message } from 'antd'
import { ProblemSet } from '../../../models/problemSet'
import { LocalContext } from '../../../components/localContext/LocalContext'

interface ProblemSetEditProps {

}

const ProblemSetEdit: React.FunctionComponent<ProblemSetEditProps & RouteComponentProps> = (props) => {
  // 当前题目集信息
  const [problemSetInfo, setProblemSetInfo] = useState<ProblemSet>()

  // 题目集problem分页对象
  const problemSetProblemPagination = UsePaginationState<ProblemSetProblemPaginationRequest>(PAGE_BEGIN - 1, getProblemSetProblems)

  // 所有题目的分页对象
  const totalProblemPagination = UsePaginationState<ProblemPaginationRequest>(PAGE_BEGIN - 1, getProblems)

  // 搜索框内容
  const [searchContent, setSearchContent] = useState<string | null>(null)

  // problem对话框是否可见
  const [addProblemModalVisible, setAddProblemModalVisible] = useState<boolean>(false)

  const params: any = props.match.params
  const problemSetId: number = params.id

  // local
  const localContext = useContext(LocalContext)

  useEffect(() => {
    getProblemsData(PAGE_BEGIN - 1, searchContent)
    getProblemSetProblemData(PAGE_BEGIN - 1)
    getProblemSetData()
    // eslint-disable-next-line
  }, [problemSetId])

  // 获取当前题目集信息
  const getProblemSetData = () => {
    getProblemSetInfo(problemSetId)
      .then(res => {
        setProblemSetInfo(res.data)
      })
  }

  // 获取题目信息，用来为题目集添加题目
  const getProblemsData = (start: number, search: string | null) => {
    totalProblemPagination
      .changeCurrentPage({
        start: start,
        count: SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE,
        search: search
      })
      .catch((err) => {
        message.error(err.message)
      })
  }

  // 获取题目集已有题目信息
  const getProblemSetProblemData = (start: number) => {
    problemSetProblemPagination.changeCurrentPage({
      start: start,
      count: SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE,
      problemSetId: problemSetId
    }).catch((err) => {
      message.error(err.message)
    })
  }

  // 搜索确认
  const onSearchConfirm = (value: string) => {
    setSearchContent(value)
    getProblemsData(0, value)
  }

  // 移除按钮被单击
  const onRemoveFormProblemSet = (problemId: number) => {
    removeProblemFormProblemSet(problemSetId, problemId)
      .then(() => {
        message.success(localContext.problemSet.removeSuccess)
        getProblemsData(PAGE_BEGIN - 1, searchContent)
        getProblemSetProblemData(PAGE_BEGIN - 1)
      })
  }


  return (
    <div>
      {
        problemSetInfo &&
        <div>
          <ProblemSetEditor
            {...props}
            problemSet={problemSetInfo}
            onPageChange={(val) => getProblemSetProblemData(val - 1)}
            problemSetProblemsTotalPage={problemSetProblemPagination.paginationInfo.totalPage || 1}
            problems={problemSetProblemPagination.items}
            onProblemAdd={() => setAddProblemModalVisible(true)}
            onRemoveFormProblemSet={onRemoveFormProblemSet} />
          <AddProblem
            onAddSuccess={() => getProblemSetProblemData(PAGE_BEGIN - 1)}
            problemSetId={problemSetId}
            onCancel={() => setAddProblemModalVisible(false)}
            onProblemPageChange={(val: number) => getProblemsData(val - 1, searchContent)}
            totalPage={totalProblemPagination.paginationInfo.totalPage}
            problems={totalProblemPagination.items}
            visible={addProblemModalVisible}
            onSearchConfirm={onSearchConfirm} />
        </div>
      }
    </div>
  )
}

export default ProblemSetEdit
