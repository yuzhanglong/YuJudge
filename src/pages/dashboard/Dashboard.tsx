/*
 * File: Dashboard.tsx
 * Description: cms首页
 * Created: 2020-08-06 12:07:01
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import HeadCardGroup from "./childCmp/HeadCardGroup";
import ChartGroup from "./childCmp/ChartGroup";
import TableGroup from "./childCmp/TableGroup";

interface DashboardProps {

}

const Dashboard: React.FunctionComponent<DashboardProps> = (props) => {
  return (
    <div className={"dashboard"}>
      <div className={"dashboard-head"}>
        <HeadCardGroup></HeadCardGroup>
      </div>
      <div className={"dashboard-charts"}>
        <ChartGroup></ChartGroup>
      </div>
      <div className={"dashboard-tables"}>
        <TableGroup></TableGroup>
      </div>
    </div>
  )
}

export default Dashboard;