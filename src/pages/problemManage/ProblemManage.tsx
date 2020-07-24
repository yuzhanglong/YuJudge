import React from "react";
import ProblemTable from "../../components/problemTable/problemTable";
import {RouteComponentProps} from "react-router-dom";


/**
 * @author yuzhanglong
 * @description problems的管理界面
 * @date 2020-7-23 18:51
 */

const ProblemManage: React.FunctionComponent<RouteComponentProps> = (props) => {
  // 跳转编辑界面
  const gotoEditProblem = (problemId: number) => {
    props.history.push(`/cms/problem_manage/problems/edit/${problemId}`)
  }

  return (
    <ProblemTable onProblemEdit={gotoEditProblem}></ProblemTable>
  )
}

export default ProblemManage;