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
import {RECENT_PROBLEM_IN_DASHBOARD_AMOUNT} from "../../config/config";
import {Problem} from "../../models/problem";

interface DashboardProps {

}

const Dashboard: React.FunctionComponent<DashboardProps> = (props) => {
  const [recentProblems, setRecentProblems] = useState<Problem[]>([]);

  useEffect(() => {
    getRecentProblem();
  }, [])

  // 获取最新问题
  const getRecentProblem = () => {
    getRecentProblems(RECENT_PROBLEM_IN_DASHBOARD_AMOUNT)
      .then(res => {
        console.log(res);
        setRecentProblems(res.data);
      })
  }
  return (
    <div className={"dashboard"}>
      <div className={"dashboard-head"}>
        <HeadCardGroup></HeadCardGroup>
      </div>
      <div className={"dashboard-charts"}>
        <ChartGroup></ChartGroup>
      </div>
      <div className={"dashboard-tables"}>
        <TableGroup problems={recentProblems}></TableGroup>
      </div>
    </div>
  )
}

export default Dashboard;