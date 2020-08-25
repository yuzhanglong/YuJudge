/*
 * File: ProblemManage.tsx
 * Description: problem管理页面
 * Created: 2020-08-05 18:26:51
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useEffect} from "react";
import ProblemTable from "../../../components/problemTable/ProblemTable";
import {RouteComponentProps} from "react-router-dom";
import {getProblems} from "../../../network/problemRequests";
import {PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE} from "../../../config/config";
import {UsePaginationState} from "../../../hooks/pagination";
import {ProblemPaginationRequest} from "../../../models/pagination";
import {Card, message} from "antd";


const ProblemManage: React.FunctionComponent<RouteComponentProps> = (props) => {
  // 分页对象
  const problemPagination = UsePaginationState<ProblemPaginationRequest>(PAGE_BEGIN - 1, getProblems)

  useEffect(() => {
    getProblemsData(0, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE, null);
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
    };
    problemPagination.changeCurrentPage(params)
      .catch((err) => {
        message.error(err.message);
      });
  }

  // 页码发生改变，请求新的数据
  const onPageChange = (page: number) => {
    getProblemsData(page - 1, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE, null);
  }

  return (
    <Card title={"题目管理"}>
      <ProblemTable
        onProblemEdit={gotoEditProblem}
        problems={problemPagination.items}
        totalPage={problemPagination.paginationInfo.totalPage}
        onPageChange={onPageChange}/>
    </Card>
  )
}

export default ProblemManage;