/*
 * File: TableGroup.tsx
 * Description: 控制台表格
 * Created: 2020-08-06 14:31:46
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {DashOutlined} from "@ant-design/icons/lib";
import {Card, Col, Row, Table} from "antd";
import {Problem} from "../../../models/problem";
import ProblemTable from "../../../components/problemTable/ProblemTable";

interface DashboardTableGroupProps {
  problems: Problem[];
}

const TableGroup: React.FunctionComponent<DashboardTableGroupProps> = (props) => {
  return (
    <div>
      <Row gutter={25}>
        <Col span={16}>
          <Card
            type="inner"
            title="最新问题"
            hoverable
            extra={
              <DashOutlined/>
            }>
            <div className={"table-wrap"}>
              <ProblemTable
                problems={props.problems}
                tableSize={"small"}
                isShowOperations={false}
                showPagination={false}/>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            hoverable
            type="inner"
            title="活跃用户"
            extra={
              <DashOutlined/>
            }>
            <div className={"table-wrap"}>
              <Table></Table>
            </div>
          </Card>
        </Col>
      </Row>


    </div>
  )
}

export default TableGroup;