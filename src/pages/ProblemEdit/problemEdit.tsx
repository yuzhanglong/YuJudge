/*
 * File: problemEdit.tsx
 * Description: 问题编辑页面
 * Created: 2020-08-05 18:28:08
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useEffect, useState} from "react";
import ProblemEditor from "../../components/problemEditor/ProblemEditor";
import {RouteComponentProps} from "react-router-dom";
import {getProblemDetailedById, getSolutionByProblemId} from "../../network/problemRequests";
import {Problem, ProblemTestCase} from "../../models/problem";
import {message} from "antd";
import TestCaseModal from "./childCmp/TestCaseModal";
import {getUploadToken} from "../../network/common";
import {UploadTokenData} from "../../models/common";

interface ProblemEditProps {

}


const ProblemEdit: React.FunctionComponent<ProblemEditProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const problemId: number = params.id;


  // 当前问题
  const [problem, setProblem] = useState<Problem>({});
  // 问题的解决方案
  const [solutions, setSolutions] = useState<ProblemTestCase[]>([]);
  // 是否展示添加解决方案的对话框
  const [isShowAddSolutionModal, setIsShowAddSolutionModal] = useState(false);
  // 上传凭证
  const [uploadToken, setUploadToken] = useState<string>("");

  const getProblemRequiredData = (problemId: number) => {
    return Promise.all([
      getProblemDetailedById(problemId),
      getSolutionByProblemId(problemId)
    ]);
  }

  // 准备添加testcase
  const onTestCaseWillBeAdded = () => {
    setIsShowAddSolutionModal(true);
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

    // 获取上传凭证
    getUploadToken()
      .then(res => {
        const resp: UploadTokenData = res.data;
        setUploadToken(resp.uploadToken);
      })
      .catch(() => {
        message.error("获取上传凭证失败");
      })
  }, [problemId]);

  return (
    <div className={"problem-edit-page"}>
      <TestCaseModal
        problemId={problemId}
        onConfirmed={() => setIsShowAddSolutionModal(false)}
        onCancel={() => setIsShowAddSolutionModal(false)}
        isShow={isShowAddSolutionModal}
        uploadToken={uploadToken}/>
      <ProblemEditor
        solutions={solutions ? solutions : []}
        problem={problem}
        onSolutionAdd={onTestCaseWillBeAdded}>
      </ProblemEditor>
    </div>
  )
}

export default ProblemEdit;