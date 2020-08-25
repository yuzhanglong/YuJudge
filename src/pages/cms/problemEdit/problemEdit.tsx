/*
 * File: problemEdit.tsx
 * Description: 问题编辑页面
 * Created: 2020-08-05 18:28:08
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useEffect, useState} from "react";
import ProblemEditor from "./childCmp/problemEditor/ProblemEditor";
import {RouteComponentProps} from "react-router-dom";
import {deleteTestCase, getProblemDetailedById, getSolutionByProblemId} from "../../../network/problemRequests";
import {Problem, ProblemTestCase} from "../../../models/problem";
import {message, Modal} from "antd";
import TestCaseModal from "./childCmp/TestCaseModal";
import {getUploadToken} from "../../../network/common";
import {UploadTokenData} from "../../../models/common";
import {ExclamationCircleOutlined} from "@ant-design/icons/lib";

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

  // problem相关请求的综合，使用promise all 封装
  const getProblemRequiredData = (problemId: number) => {
    return Promise.all([
      getProblemDetailedById(problemId),
      getSolutionByProblemId(problemId)
    ]);
  }

  // 准备添加testCase
  const onTestCaseWillBeAdded = () => {
    setIsShowAddSolutionModal(true);
  }

  // 获取上传凭证
  const getUploadTokenData = () => {
    getUploadToken()
      .then(res => {
        const resp: UploadTokenData = res.data;
        setUploadToken(resp.uploadToken);
      })
      .catch(() => {
        message.error("获取上传凭证失败");
      })
  }

  useEffect(() => {
    initProblemEditEnvironment();
    // eslint-disable-next-line
  }, [problemId]);

  // 初始化页面信息
  const initProblemEditEnvironment = () => {
    getProblemRequiredData(problemId)
      .then(res => {
        // 更新problems数据
        const p: Problem = res[0].data;
        setProblem(p);
        // 更新解决方案数据
        const solutionList: ProblemTestCase[] = res[1].data;
        setSolutions(solutionList);
      })
    getUploadTokenData();
  }

  // 测试样例添加cg
  const onTestCaseAddSuccess = () => {
    setIsShowAddSolutionModal(false);
    window.location.reload();
  }

  // 移除解决方案
  const removeSolution = (value: number) => {
    Modal.confirm({
      title: '删除确认',
      icon: <ExclamationCircleOutlined/>,
      content: '您确定要删除这个测试点吗？',
      onOk() {
        deleteTestCase(value)
          .then(() => {
            message.success("删除成功~");
            // 重新初始化数据
            initProblemEditEnvironment();
          })
      }
    })
  }

  return (
    <div className={"problem-edit-page"}>
      <TestCaseModal
        problemId={problemId}
        onConfirmed={() => onTestCaseAddSuccess()}
        onCancel={() => setIsShowAddSolutionModal(false)}
        isShow={isShowAddSolutionModal}
        uploadToken={uploadToken}/>
      <ProblemEditor
        onSolutionDelete={removeSolution}
        solutions={solutions ? solutions : []}
        problem={problem}
        onSolutionAdd={onTestCaseWillBeAdded}>
      </ProblemEditor>
    </div>
  )
}

export default ProblemEdit;