/*
 * File: ProblemManage.tsx
 * Description: problem管理页面
 * Created: 2020-08-05 18:26:51
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useEffect, useState} from "react";
import ProblemTable from "../../components/problemTable/ProblemTable";
import {RouteComponentProps} from "react-router-dom";
import {getProblems} from "../../network/problemRequests";
import {BaseResponse} from "../../models/common";
import {PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE} from "../../config/config";
import {message} from "antd";


const ProblemManage: React.FunctionComponent<RouteComponentProps> = (props) => {
  // 表格展示的问题
  const [problems, setProblems] = useState([]);
  // 总页数
  const [totalPage, setTotalPage] = useState(PAGE_BEGIN);


  useEffect(() => {
    getProblemsData(0, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE);
  }, [])

  // 跳转编辑界面
  const gotoEditProblem = (problemId: number) => {
    props.history.push(`/cms/problem_manage/problems/edit/${problemId}`)
  }

  // 请求problem数据
  const getProblemsData = (start: number, count: number) => {
    getProblems(start, count)
      .then((res: BaseResponse) => {
        setProblems(res.data.items);
        setTotalPage(res.data.totalPage);
      })
      .catch(() => {
        message.error("获取问题失败");
      })
  }

  // 页码发生改变，请求新的数据
  const onPageChange = (page: number) => {
    getProblemsData(page - 1, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE);
  }

  return (
    <ProblemTable
      onProblemEdit={gotoEditProblem}
      problems={problems}
      totalPage={totalPage}
      onPageChange={onPageChange}/>
  )
}

export default ProblemManage;