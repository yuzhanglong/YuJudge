/*
 * File: ProblemManage.tsx
 * Description: problem管理页面
 * Created: 2020-08-05 18:26:51
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, { useContext, useEffect, useState } from 'react'
import ProblemTable from '../../../components/problemTable/ProblemTable'
import { RouteComponentProps } from 'react-router-dom'
import { createProblem, getProblems } from '../../../network/problemRequests'
import { PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE } from '../../../config/config'
import { UsePaginationState } from '../../../hooks/pagination'
import { ProblemPaginationRequest } from '../../../models/pagination'
import { Button, Card, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import CreateProblemModal from './childCmp/CreateProblemModal'
import { BaseResponse } from '../../../models/common'
import RcQueueAnim from 'rc-queue-anim'
import { LocalContext } from '../../../components/localContext/LocalContext'


const ProblemManage: React.FunctionComponent<RouteComponentProps> = (props) => {
  // 分页对象
  const problemPagination = UsePaginationState<ProblemPaginationRequest>(PAGE_BEGIN - 1, getProblems)

  // 新建问题的对话框
  const [createButtonModalVisible, setCreateButtonModalVisible] = useState(false)

  // local
  const localContext = useContext(LocalContext)

  useEffect(() => {
    getProblemsData(0, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE, null)
    // eslint-disable-next-line
  }, [])

  // 跳转编辑界面
  const gotoEditProblem = (problemId: number) => {
    props.history.push(`/cms/problem_manage/problems/edit/${problemId}`)
  }

  // 请求problem数据
  const getProblemsData = (start: number, count: number, search: string | null) => {
    const params: ProblemPaginationRequest = {
      start: start,
      count: count,
      search: search
    }
    problemPagination.changeCurrentPage(params)
      .catch((err) => {
        message.error(err.message)
      })
  }

  // 页码发生改变，请求新的数据
  const onPageChange = (page: number) => {
    getProblemsData(page - 1, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE, null)
  }

  // 渲染创建功能按钮
  const renderCreateProblemButton = () => {
    return (
      <Button
        onClick={() => setCreateButtonModalVisible(true)}
        type={'primary'}
        icon={<PlusOutlined />}>
        {localContext.problemManage.createProblem}
      </Button>
    )
  }

  // 提交创建问题表单
  const createProblemConfirm = (name: string) => {
    createProblem(name)
      .then(() => {
        message.success(localContext.judgeHost.createSuccess)
        setCreateButtonModalVisible(false)
        getProblemsData(0, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE, null)
      })
      .catch((err: BaseResponse) => {
        message.error(err.message)
      })
  }

  return (
    <RcQueueAnim>
      <div key={'problem_manage'}>
        <Card
          title={localContext.problemManage.baseCard}
          extra={renderCreateProblemButton()}>
          <CreateProblemModal
            onConfirm={(name) => createProblemConfirm(name)}
            visible={createButtonModalVisible}
            onCancel={() => setCreateButtonModalVisible(false)} />
          <ProblemTable
            isShowProblemOrder={false}
            onProblemEdit={gotoEditProblem}
            problems={problemPagination.items}
            totalPage={problemPagination.paginationInfo.totalPage}
            onPageChange={onPageChange} />
        </Card>
      </div>
    </RcQueueAnim>
  )
}

export default ProblemManage
