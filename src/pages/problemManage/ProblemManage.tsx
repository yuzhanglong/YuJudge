/*
 * File: ProblemManage.tsx
 * Description: problem管理页面
 * Created: 2020-08-05 18:26:51
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import ProblemTable from "../../components/problemTable/ProblemTable";
import {RouteComponentProps} from "react-router-dom";


const ProblemManage: React.FunctionComponent<RouteComponentProps> = (props) => {
  // 跳转编辑界面
  const gotoEditProblem = (problemId: number) => {
    props.history.push(`/cms/problem_manage/problems/edit/${problemId}`)
  }

  return (
    <ProblemTable onProblemEdit={gotoEditProblem}/>
  )
}

export default ProblemManage;