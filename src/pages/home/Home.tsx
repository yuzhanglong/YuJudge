/*
 * File: Home.tsx
 * Description: 首页
 * Created: 2020-8-24 13:56:46
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useEffect, useState} from "react";
import UserCard from "../../components/userCard/UserCard";
import {UserInfoState} from "../../hooks/userInfo";
import {Affix, Card, Menu, Row, Table} from "antd";
import {getRecentSubmission, getUserJudgeResultCount} from "../../network/submissionRequest";
import JudgeResultCount from "../../components/judgeResultCount/JudgeResultCount";
import {DashOutlined} from "@ant-design/icons/lib";
import ColumnChart from "../../components/charts/ColumnChart";
import {UserSubmissionCount} from "../../models/submission";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT, RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT} from "../../config/config";

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
      <Affix offsetTop={0}>
        <div className={"home-menu"}>
          <Menu mode="horizontal" theme={"dark"}>
            <Menu.Item key="mail">
              Navigation One
            </Menu.Item>
            <Menu.Item key="app">
              Navigation Two
            </Menu.Item>
          </Menu>
        </div>
      </Affix>
      <div className={"home-user-info"} style={{
        position: "fixed",
        top: 66
      }}>
        {userInfoState.userInfo && <UserCard userInfo={userInfoState.userInfo} height={"90vh"}/>}
      </div>

      <div className={"home-content"} style={{
        marginLeft: 260,
        marginTop: 20,
        width: "80vw",
        display: "flex"
      }}>
        <div className={"home-content-public"} style={{
          width: 900,
          marginRight: 15
        }}>
          <Card title={"公告"}>
            <Table></Table>
          </Card>
        </div>
        <div className={"home-content-user"}>
          <Row>
            <Card
              style={{
                width: 350,
                marginBottom: 16
              }}
              hoverable
              type="inner"
              title="提交统计"
              extra={
                <DashOutlined/>
              }>
              <div>
                <JudgeResultCount resultCounts={userJudgeResultCount}/>
              </div>
            </Card>
          </Row>
          <Row>
            <Card
              hoverable
              type="inner"
              title="近七日提交"
              style={{
                width: 350
              }}
              extra={
                <DashOutlined/>
              }>
              <div>
                <ColumnChart
                  isStack
                  stackField={"type"}
                  xKey={"date"}
                  yKey={"amount"}
                  yKeyDesc={"提交数"}
                  data={generateUserSubmissionData()}/>
              </div>
            </Card>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Home;