/*
 * File: Home.tsx
 * Description: 首页
 * Created: 2020-8-24 13:56:46
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useEffect, useState} from "react";
import UserCard from "../../../components/userCard/UserCard";
import {UserInfoState} from "../../../hooks/userInfo";
import {Card, Col, Divider, Row, Table} from "antd";
import {getRecentSubmission, getUserJudgeResultCount} from "../../../network/submissionRequest";
import JudgeResultCount from "../../../components/judgeResultCount/JudgeResultCount";
import ColumnChart from "../../../components/charts/ColumnChart";
import {UserSubmissionCount} from "../../../models/submission";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT, RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT} from "../../../config/config";

interface HomeProps {

}

const Home: React.FunctionComponent<HomeProps> = (props) => {
  useEffect(() => {
    getUserJudgeResults();
    getRecentSubmissionCount();
  }, []);

  // 用户信息
  const userInfoState = UserInfoState();
  // 用户提交统计
  const [userJudgeResultCount, setUserJudgeResultCount] = useState();
  // 近期提交
  const [recentSubmission, setRecentSubmission] = useState<UserSubmissionCount[]>([]);

  // 获取判题结果统计信息
  const getUserJudgeResults = () => {
    getUserJudgeResultCount()
      .then(res => {
        setUserJudgeResultCount(res.data);
      })
  }

  // 获取最近提交统计信息
  const getRecentSubmissionCount = () => {
    const end = moment().add(1, "days").format(DEFAULT_DATE_TIME_FORMAT);
    // 默认提早七天
    const start = moment().add(
      RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT * (-1),
      "days").format(DEFAULT_DATE_TIME_FORMAT);

    getRecentSubmission(start, end)
      .then(res => {
        setRecentSubmission(res.data);
      })
  }

  // 处理用户的提交信息，将其转变为支持表格渲染的数据结构
  const generateUserSubmissionData = () => {
    let result = [];
    for (let i = 0; i < recentSubmission.length; i++) {
      let tmp = recentSubmission[i];
      const d = new Date(tmp.time);
      result.push(
        {
          date: d.getMonth() + 1 + "." + d.getDate(),
          amount: tmp.totalAmount,
          type: "通过",
        },
        {
          date: d.getMonth() + 1 + "." + d.getDate(),
          amount: tmp.totalAmount - tmp.acceptAmount,
          type: "未通过",
        },
      )
    }
    return result;
  }


  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh"
      }}>
      <div className={"home-content"} style={{
        marginTop: 20,
        display: "flex",
        justifyContent: "center"
      }}>
        <div
          className={"home-content-public"}
          style={{
            marginRight: 15,
            width: 1000
          }}>
          <Card title={"公告"} style={{
            marginBottom: 20
          }}>
            <Table></Table>
          </Card>
          <Card title={"个人数据"}>
            <Row>
              <Col>
                <div style={{
                  width: 560
                }}>
                  <ColumnChart
                    height={200}
                    isStack
                    stackField={"type"}
                    xKey={"date"}
                    yKey={"amount"}
                    yKeyDesc={"提交数"}
                    data={generateUserSubmissionData()}/>
                </div>
              </Col>
              <Divider type={"vertical"} style={{height: 200}}/>
              <Col>
                <div style={{
                  width: 350
                }}>
                  <JudgeResultCount
                    resultCounts={userJudgeResultCount}/>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
        <div className={"home-content-user"}>
          {userInfoState.userInfo && <UserCard userInfo={userInfoState.userInfo} height={"90vh"}/>}
        </div>
      </div>
    </div>
  )
}

export default Home;