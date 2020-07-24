import React, {useEffect, useState} from "react";
import ProblemEditor from "../../components/problemEditor/problemEditor";
import {RouteComponentProps} from "react-router-dom";
import {getProblemDetailedById, getSolutionByProblemId} from "../../network/problemRequests";
import {Problem, ProblemTestCase} from "../../models/problem";

interface ProblemEditProps {

}


const ProblemEdit: React.FunctionComponent<ProblemEditProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const problemId: number = params.id;


  const [problem, setProblem] = useState<Problem>({});
  const [solutions, setSolutions] = useState<ProblemTestCase[]>();


  const getProblemRequiredData = (problemId: number) => {
    return Promise.all([
      getProblemDetailedById(problemId),
      getSolutionByProblemId(problemId)
    ]);
  }

  // 添加一个testcase
  const addTestCase = () => {
    let tmp = solutions;
    let myCase: ProblemTestCase = {
      id: new Date().getTime(),
      stdin: "",
      expectedStdOut: "",
      description: "desc"
    };
    if (tmp == null) return;
    tmp.push(myCase);
    setSolutions(tmp);
  }


  useEffect(() => {
    getProblemRequiredData(problemId)
      .then(res => {
        // 更新problems数据
        const p: Problem = res[0].data;
        setProblem(p);

        // 更新解决方案数据
        const solutionList: ProblemTestCase[] = res[1].data;
        setSolutions(solutionList);
      })
  }, [problemId]);

  return (
    <div className={"problem-edit-page"}>
      <ProblemEditor solutions={solutions ? solutions : []}
                     problem={problem} onSolutionAdd={addTestCase}>
      </ProblemEditor>
    </div>

  )
}

export default ProblemEdit;