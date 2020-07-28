import React, {useEffect, useState} from "react";
import {Col, Layout, message, Row, Menu, Card} from "antd";
import {UnControlled as CodeMirror} from 'react-codemirror2'
import ReactMarkdown from "react-markdown";
import {RouteComponentProps} from "react-router-dom";
import {Problem} from "../../models/problem";
import {getProblemDetailedById} from "../../network/problemRequests";
import LanguageSelector from "./childCmp/LanguageSelector";

interface ProblemProps {

}

const ProblemShow: React.FunctionComponent<ProblemProps & RouteComponentProps> = (props) => {
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
          <Menu.Item key="mail">
            Navigation One
          </Menu.Item>
          <Menu.Item key="app">
            Navigation Two
          </Menu.Item>
          <Menu.Item key="alipay">
            Navigation Three
          </Menu.Item>
        </Menu>
        <Row>
          <Col span={12}>
            <Card>
              <div className={"problem-show-content-wrap"}>
                <ReactMarkdown source={problem.content}></ReactMarkdown>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <div className={"problem-show-code-operation-wrap"}>
                <Row>
                  <LanguageSelector
                    onLanguageChange={(res) => console.warn(res)}
                    allowedLanguage={
                      problem.allowedLanguage ? problem.allowedLanguage : []
                    }/>
                </Row>
              </div>
              <CodeMirror
                value=''
                options={{
                  lineNumbers: true
                }}
                className={"problem-show-code-mirror"}
              />
            </Card>
          </Col>
        </Row>
      </Layout>
    </div>
  )
}

export default ProblemShow;