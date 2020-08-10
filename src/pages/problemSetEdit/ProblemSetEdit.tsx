/*
 * File: ProblemSetEdit.tsx
 * Description: 题目集编辑页面
 * Created: 2020-08-09 22:36:48
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import ProblemSetEditor from "./childCmp/ProblemSetEditor";
import {Problem} from "../../models/problem";
import {getProblemSetProblems} from "../../network/problemSetRequest";
import AddProblem from "./childCmp/AddProblem";

interface ProblemSetEditProps {

}

const ProblemSetEdit: React.FunctionComponent<ProblemSetEditProps & RouteComponentProps> = (props) => {
  // 题目集内的problem
  const [problemSetProblems, setProblemSetProblems] = useState<Problem[]>([]);
  const [addProblemModalVisiable, setAddProblemModalVisiable] = useState<boolean>(false);
  const params: any = props.match.params;
  const problemSetId: number = params.id;

  useEffect(() => {
    getProblemSetProblems(problemSetId)
      .then(res => {
        setProblemSetProblems(res.data.items);
      })
  }, [problemSetId])

  // 获取problems
  return (
    <div>
      <ProblemSetEditor
        problems={problemSetProblems} {...props}
        onProblemAdd={() => setAddProblemModalVisiable(true)}/>
      <AddProblem
        problems={problemSetProblems}
        isVisiable={addProblemModalVisiable}/>
    </div>
  )
}

export default ProblemSetEdit;