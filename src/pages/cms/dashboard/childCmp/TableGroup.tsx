/*
 * File: TableGroup.tsx
 * Description: 控制台表格
 * Created: 2020-08-06 14:31:46
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import {DashOutlined} from '@ant-design/icons';
import {Card, Col, Row} from 'antd';
import {Problem} from '../../../../models/problem';
import ProblemTable from '../../../../components/problemTable/ProblemTable';
import UserTable from '../../../../components/userTable/UserTable';
import {UserInfo} from '../../../../models/user';
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface DashboardTableGroupProps {
  problems: Problem[];
  userInfo: UserInfo[];
}

const TableGroup: React.FunctionComponent<DashboardTableGroupProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)

  return (
    <div>
      <Row gutter={25}>
        <Col span={16}>
          <Card
            type="inner"
            title={localContext.dashBoard.recentProblem}
            hoverable
            extra={
              <DashOutlined/>
            }>
            <div>
              <ProblemTable
                problems={props.problems}
                tableSize={'middle'}
                isShowOperations={false}
                isShowProblemOrder={false}
                showPagination={false}/>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            hoverable
            type="inner"
            title={localContext.dashBoard.activeUser}
            extra={
              <DashOutlined/>
            }>
            <div>
              <UserTable
                userInfo={props.userInfo}
                showRanking
                userNameCanClick={true}/>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default TableGroup;
