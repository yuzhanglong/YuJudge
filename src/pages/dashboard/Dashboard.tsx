/*
 * File: Dashboard.tsx
 * Description: cms首页
 * Created: 2020-08-06 12:07:01
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import HeadCardGroup from "./childCmp/HeadCardGroup";
import ChartGroup from "./childCmp/ChartGroup";
import TableGroup from "./childCmp/TableGroup";
import {getRecentProblems} from "../../network/problemRequests";
import {
  DEFAULT_DATE_TIME_FORMAT,
  RECENT_ACTIVE_USER_IN_DASHBOARD_AMOUNT,
  RECENT_PROBLEM_IN_DASHBOARD_AMOUNT,
  RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT
} from "../../config/config";
import {Problem} from "../../models/problem";
import {getRecentSubmission, getUserJudgeResultCount} from "../../network/submissionRequest";
import {getActiveUserInfo, getUserInfo} from "../../network/userRequest";
import moment from "moment";
import {UserSubmissionCount} from "../../models/submission";
import UserTag from "../../components/userTag/UserTag";

interface DashboardProps {

}

const Dashboard: React.FunctionComponent<DashboardProps> = (props) => {
  // 最新问题
  const [recentProblems, setRecentProblems] = useState<Problem[]>([]);
  // 近期提交统计
  const [recentSubmissionCount, setRecentSubmissionCount] = useState<UserSubmissionCount[]>([]);
  // 活跃用户
  const [activeUserInfo, setActiveUserInfo] = useState([]);
  // 用户信息
  const [userInfo, setUserInfo] = useState();
  // 用户提交统计
  const [userJudgeResultCount, setUserJudgeResultCount] = useState();

  useEffect(() => {
    getRecentProblem();
    getRecentSubmissionCount();
    getRecentActiveUserInfo();
    getUserData();
    getUserJudgeResults();
  }, []);


  // 获取用户信息
  const getUserData = () => {
    getUserInfo().then(res => {
      setUserInfo(res.data);
    })
  }

  // 获取最新问题
  const getRecentProblem = () => {
    getRecentProblems(RECENT_PROBLEM_IN_DASHBOARD_AMOUNT)
      .then(res => {
        setRecentProblems(res.data);
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
        setRecentSubmissionCount(res.data);
      })
  }

  // 获取最近活跃用户
  const getRecentActiveUserInfo = () => {
    getActiveUserInfo(RECENT_ACTIVE_USER_IN_DASHBOARD_AMOUNT)
      .then(res => {
        setActiveUserInfo(res.data);
      })
  }

  // 获取判题结果统计信息
  const getUserJudgeResults = () => {
    getUserJudgeResultCount()
      .then(res => {
        setUserJudgeResultCount(res.data);
      })
  }

  return (
    <div className={"dashboard"}>


      <div className={"dashboard-head"}>
        <HeadCardGroup></HeadCardGroup>
      </div>
      <div className={"dashboard-charts"}>
        <ChartGroup
          judgeResultCount={userJudgeResultCount}
          recentSubmission={recentSubmissionCount}
          userInfo={userInfo}/>
      </div>
      <div className={"dashboard-tables"}>
        <TableGroup
          problems={recentProblems}
          userInfo={activeUserInfo}/>
      </div>
    </div>
  )
}

export default Dashboard;