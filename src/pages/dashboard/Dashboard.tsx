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
import {RECENT_PROBLEM_IN_DASHBOARD_AMOUNT, RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT} from "../../config/config";
import {Problem} from "../../models/problem";
import {getRecentSubmission} from "../../network/submissionRequest";

interface DashboardProps {

}

const Dashboard: React.FunctionComponent<DashboardProps> = (props) => {
  const [recentProblems, setRecentProblems] = useState<Problem[]>([]);
  const [recentSubmissionCount, setRecentSubmissionCount] = useState([]);

  useEffect(() => {
    getRecentProblem();
    getRecentSubmissionCount();
  }, [])

  // 获取最新问题
  const getRecentProblem = () => {
    getRecentProblems(RECENT_PROBLEM_IN_DASHBOARD_AMOUNT)
      .then(res => {
        setRecentProblems(res.data);
      })
  }

  // 获取最近提交统计信息
  const getRecentSubmissionCount = () => {
    getRecentSubmission(RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT)
      .then(res => {
        setRecentSubmissionCount(res.data);
      })
  }
  return (
    <div className={"dashboard"}>
      <div className={"dashboard-head"}>
        <HeadCardGroup></HeadCardGroup>
      </div>
      <div className={"dashboard-charts"}>
        <ChartGroup recentSubmission={recentSubmissionCount}/>
      </div>
      <div className={"dashboard-tables"}>
        <TableGroup problems={recentProblems}/>
      </div>
    </div>
  )
}

export default Dashboard;