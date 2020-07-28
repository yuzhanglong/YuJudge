import React, {useEffect, useState} from "react";
import ProblemEditor from "../../components/problemEditor/ProblemEditor";
import {RouteComponentProps} from "react-router-dom";
import {createSolution, getProblemDetailedById, getSolutionByProblemId} from "../../network/problemRequests";
import {Problem, ProblemTestCase} from "../../models/problem";
import {Modal, Upload, Button, message, Row, Col, Input} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import {UploadProps} from "antd/es/upload";

interface ProblemEditProps {

}

enum UPLOADER {
  STD_IN,
  STD_OUT
}

const ProblemEdit: React.FunctionComponent<ProblemEditProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const problemId: number = params.id;

  let defaultCase: ProblemTestCase = {
    stdIn: "",
    expectedStdOut: "",
    description: "desc"
  };

  const [problem, setProblem] = useState<Problem>({});
  const [solutions, setSolutions] = useState<ProblemTestCase[]>([]);
  const [isShowAddSolutionModal, setIsShowAddSolutionModal] = useState(false);
  const [tmpTestCase, setTmpTestCase] = useState<ProblemTestCase>();


  const getProblemRequiredData = (problemId: number) => {
    return Promise.all([
      getProblemDetailedById(problemId),
      getSolutionByProblemId(problemId)
    ]);
  }

  // 添加一个testcase
  const addTestCase = () => {
    if (problemId && tmpTestCase) {
      createSolution(problemId, tmpTestCase)
        .then(() => {
          message.success(`创建成功！`);
          setIsShowAddSolutionModal(false);
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      message.warn(`请上传输入和输出文件！`);
    }
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
  }, [problemId]);


  const onTestCaseDescriptionChange = (event: any) => {
    event.persist();
    const val = event.target.value;
    let tmp = tmpTestCase;
    if (tmp) {
      tmp.description = val;
      setTmpTestCase(tmp);
    }
  }


  // upload配置
  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  };

  const onUploadConditionChange = (info: any, uploader: UPLOADER) => {
    if (info.file.status === 'done') {
      message.success(`文件上传成功~`);
      let tmp = tmpTestCase ? tmpTestCase : defaultCase;
      const url = info.file.response.url;
      if (uploader === UPLOADER.STD_IN) {
        tmp.stdIn = url;
      } else {
        tmp.expectedStdOut = url;
      }
    } else if (info.file.status === 'error') {
      message.error(`文件上传失败!`);
    }
  }

  return (
    <div className={"problem-edit-page"}>
      <Modal
        title="添加解决方案"
        visible={isShowAddSolutionModal}
        onCancel={() => setIsShowAddSolutionModal(false)}
        onOk={addTestCase}>
        <Row>
          <Col span={4}>
            方案描述
          </Col>
          <Col span={20}>
            <Input onChange={onTestCaseDescriptionChange}></Input>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            标准输入
          </Col>
          <Col span={20}>
            <Upload {...uploadProps}
                    onChange={
                      (info) => onUploadConditionChange(info, UPLOADER.STD_IN)
                    }>
              <Button>
                <UploadOutlined/>
                点击上传
              </Button>
            </Upload>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            期望输出
          </Col>
          <Col span={12}>
            <Upload {...uploadProps}
                    onChange={
                      ((info) => onUploadConditionChange(info, UPLOADER.STD_OUT))
                    }>
              <Button>
                <UploadOutlined/>点击上传
              </Button>
            </Upload>
          </Col>
        </Row>
      </Modal>
      <ProblemEditor solutions={solutions ? solutions : []}
                     problem={problem}
                     onSolutionAdd={onTestCaseWillBeAdded}>
      </ProblemEditor>
    </div>
  )
}

export default ProblemEdit;