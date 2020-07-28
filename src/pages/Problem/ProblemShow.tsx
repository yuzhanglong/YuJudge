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

interface ProblemShowProps {

}

const ProblemShow: React.FunctionComponent<ProblemShowProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const problemId: number = params.id;

  const [problem, setProblem] = useState<Problem>({});

  const getProblemData = (problemId: number) => {
    getProblemDetailedById(problemId)
      .then(res => {
        const p: Problem = res.data;
        setProblem(p);
      })
      .catch(() => {
        message.error("这个问题不存在")
      })
  }

  useEffect(() => {
    getProblemData(problemId);
  }, [problemId]);

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
                    提交记录区域
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
                    onLanguageChange={(res) => console.warn(res)}
                    allowedLanguage={problem.allowedLanguage ? problem.allowedLanguage : []}/>
                </Row>
              </div>
              <CodeMirror
                value=''
                options={{lineNumbers: true}}
                className={"problem-show-code-mirror"}/>
              <div className={"problem-tool-bar-wrap"}>
                <SubmitToolBar></SubmitToolBar>
              </div>
            </Card>
          </Col>
        </Row>
      </Layout>
    </div>
  )
}

export default ProblemShow;