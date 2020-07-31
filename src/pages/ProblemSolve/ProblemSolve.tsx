import React, {useEffect, useState} from "react";
import {Col, Layout, message, Row, Menu, Card, Tabs} from "antd";
import {UnControlled as CodeMirror} from 'react-codemirror2'
import ReactMarkdown from "react-markdown";
import {RouteComponentProps} from "react-router-dom";
import {Problem} from "../../models/problem";
import {getProblemDetailedById} from "../../network/problemRequests";
import LanguageSelector from "./childCmp/LanguageSelector";
import SubmitToolBar from "../../components/submitToolBar/SubmitToolBar";
import {FormOutlined, ExperimentOutlined, OrderedListOutlined} from '@ant-design/icons';
import {getSubmissionByProblemId, submitCode} from "../../network/submissionRequest";
import {Submission} from "../../models/submission";
import SubmissionTable from "./childCmp/SubmissionTable";
import {SUBMISSION_SINGLE_PAGE_SIZE} from "../../config/config";

interface ProblemShowProps {

}

const ProblemSolve: React.FunctionComponent<ProblemShowProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const problemId: number = params.id;


  // 当前problem
  const [problem, setProblem] = useState<Problem>({});
  // 代码内容
  const [codeContent, setCodeContent] = useState("");
  // 语言选择器中活跃的语言
  const [activeLanguage, setActiveLanguage] = useState();
  // 提交表格
  const [submissions, setSubmissions] = useState([]);
  // 总的提交数目
  const [submissionCount, setSubmissionCount] = useState(1);
  // 当前活跃的页码
  const [activePage, setActivePage] = useState(1);
  // 当前轮询任务的id
  const [requestTask, setRequestTask] = useState();


  useEffect(() => {
    getProblemData(problemId);
    getProblemSubmission(problemId, 1);
    renewSubmissionDataTimely(1).then(() => {});
  }, [problemId]);

  const getProblemData = (problemId: number) => {
    getProblemDetailedById(problemId)
      .then(res => {
        const p: Problem = res.data;
        setProblem(p);
      })
      .catch(() => {
        message.error("这个问题不存在");
      })
  }

  const getProblemSubmission = (problemId: number, page: number) => {
    getSubmissionByProblemId(page - 1, SUBMISSION_SINGLE_PAGE_SIZE, problemId)
      .then(res => {
        setSubmissions(res.data.items);
        setSubmissionCount(res.data.total);
      })
      .catch(() => {
        message.error("获取提交内容失败");
      })
  }

  const renewSubmissionDataTimely = (activePage: number) => {
    if (requestTask) {
      window.clearInterval(requestTask);
    }
    return new Promise(() => {
      const id = setInterval(() => {
        getProblemSubmission(problemId, activePage);
      }, 4000)
      setRequestTask(id);
    })
  }


  // 编辑器文字发生改变
  const onEditorChange = (value: string) => {
    setCodeContent(value);
  }

  // 提交按钮被点击
  const onSubmitButtonClick = () => {
    let submission: Submission = {
      problemId: problem.id,
      codeContent: codeContent,
      language: activeLanguage,
      judgePreference: "ACM"
    }
    // 发送提交请求
    submitCode(submission).then(() => {
      message.success("提交成功~");
      // 提交时切回第一页，用户可以立刻查看提交状态
      onPaginationChange(1);
    });
  }

  // 用户切换页码
  const onPaginationChange = (currentPage: number) => {
    setActivePage(currentPage);
    // 立刻刷新一次
    getProblemSubmission(problemId, currentPage);
    renewSubmissionDataTimely(currentPage).then(() => {
    });
  }

  // 清空按钮被点击
  const onClearButtonClick = () => {
    setCodeContent("");
    message.success("代码区已清空~");
  }

  return (
    <div className={"problem-show"}>
      <Layout>
        <Menu mode="horizontal">
          <Menu.Item key="1">
            首页
          </Menu.Item>
          <Menu.Item key="2">
            标签1
          </Menu.Item>
          <Menu.Item key="3">
            标签2
          </Menu.Item>
        </Menu>

        <Row>
          <Col span={12}>
            <Card>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab={<span><FormOutlined/>问题</span>} key="problem">
                  <div className={"problem-show-content-wrap"}>
                    <ReactMarkdown source={problem.content}></ReactMarkdown>
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><ExperimentOutlined/>题解</span>} key="solutions">
                  <div className={"problem-show-content-wrap"}>
                    题解区域
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><OrderedListOutlined/>提交记录</span>} key="submission">
                  <div className={"problem-show-content-wrap"}>
                    <SubmissionTable submissions={submissions}
                                     activePage={activePage}
                                     total={submissionCount}
                                     onPageChange={onPaginationChange}/>
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>

          <Col span={12}>
            <Card>
              <div className={"problem-show-code-operation-wrap"}>
                <Row>
                  <LanguageSelector
                    onLanguageChange={(res) => setActiveLanguage(res)}
                    allowedLanguage={problem.allowedLanguage ? problem.allowedLanguage : []}/>
                </Row>
              </div>
              <CodeMirror
                value={codeContent}
                options={{lineNumbers: true}}
                className={"problem-show-code-mirror"}
                onChange={
                  (editor, data, value) => onEditorChange(value)
                }/>
              <div className={"problem-tool-bar-wrap"}>
                <SubmitToolBar onSubmit={onSubmitButtonClick}
                               onClear={onClearButtonClick}
                               isButtonActive={codeContent !== ""}>
                </SubmitToolBar>
              </div>
            </Card>
          </Col>
        </Row>
      </Layout>
    </div>
  )
}

export default ProblemSolve;