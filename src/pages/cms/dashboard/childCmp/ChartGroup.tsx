/*
 * File: ChartGroup.tsx
 * Description: 控制台的数据展示界面
 * Created: 2020-08-06 14:12:16
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react';
import {Card, Col, Empty, Row} from 'antd';
import {DashOutlined} from '@ant-design/icons';
import ColumnChart from '../../../../components/charts/ColumnChart';
import {UserInfo} from '../../../../models/user';
import {SubmissionCountInfo, UserSubmissionCount} from '../../../../models/submission';
import SubmissionCount from '../../../../components/submissionCount/SubmissionCount';
import style from '../dashboard.module.scss';
import {EMPTY_IMAGE} from '../../../../config/config';
import {generateUserSubmissionData} from '../../../../utils/chart';

interface ChartGroupProps {
  recentSubmission: UserSubmissionCount[];
  userInfo: UserInfo | null;
  globalSubmissionCount: SubmissionCountInfo[];
}

const ChartGroup: React.FunctionComponent<ChartGroupProps> = (props) => {

  // 检测是否为空
  const checkRecentSubmissionIsEmpty = () => {
    for (let i = 0; i < props.recentSubmission.length; i++) {
      if (props.recentSubmission[i].totalAmount !== 0) {
        return false;
      }
    }
    return true;
  }


  return (
    <div>
      <Row justify={'space-between'} gutter={25}>
        <Col span={8}>
          <Card
            hoverable
            type="inner"
            title="近七日提交"
            extra={
              <DashOutlined/>
            }>
            <div
              className={checkRecentSubmissionIsEmpty() ? style.dashboard_charts_item_empty : style.dashboard_charts_item}>
              {
                !checkRecentSubmissionIsEmpty() ?
                  <ColumnChart
                    isStack
                    stackField={'type'}
                    xKey={'date'}
                    yKey={'amount'}
                    yKeyDesc={'提交数'}
                    data={generateUserSubmissionData(props.recentSubmission)}/>
                  : <Empty image={EMPTY_IMAGE} className={style.dashboard_charts_item_empty_image}/>
              }
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <Card
            type="inner"
            title="全站24小时提交"
            hoverable
            extra={
              <DashOutlined/>
            }>
            <div className={style.dashboard_charts_item}>
              {
                <SubmissionCount
                  submissionCounts={props.globalSubmissionCount}
                  showPicker={false}/>
              }
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ChartGroup;