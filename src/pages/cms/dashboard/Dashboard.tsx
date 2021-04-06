/*
 * File: Dashboard.tsx
 * Description: cms首页
 * Created: 2020-08-06 12:07:01
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from 'react';
import HeadCardGroup from './childCmp/HeadCardGroup';
import ChartGroup from './childCmp/ChartGroup';
import TableGroup from './childCmp/TableGroup';
import {getRecentProblems} from '../../../network/problemRequests';
import {
  DEFAULT_DATE_TIME_FORMAT,
  RECENT_ACTIVE_USER_IN_DASHBOARD_AMOUNT,
  RECENT_PROBLEM_IN_DASHBOARD_AMOUNT,
  RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT
} from '../../../config/config';
import {Problem} from '../../../models/problem';
import {getRecentSubmission} from '../../../network/submissionRequest';
import {getActiveUserInfo} from '../../../network/userRequest';
import moment from 'moment';
import {UserSubmissionCount} from '../../../models/submission';
import {UserInfoState} from '../../../hooks/userInfo';
import {GlobalCount} from '../../../models/common';
import {getGlobalCount} from '../../../network/common';
import styles from './dashboard.module.scss';
import RcQueueAnim from 'rc-queue-anim';
import {RouteComponentProps} from 'react-router-dom';

interface DashboardProps {

}

const Dashboard: React.FunctionComponent<DashboardProps & RouteComponentProps> = () => {
  // 最新问题
  const [recentProblems, setRecentProblems] = useState<Problem[]>([]);
  // 近期提交统计
  const [recentSubmissionCount, setRecentSubmissionCount] = useState<UserSubmissionCount[]>([]);
  // 活跃用户
  const [activeUserInfo, setActiveUserInfo] = useState([]);
  // 用户信息
  const userInfoState = UserInfoState();
  // 全局统计
  const [globalCount, setGlobalCount] = useState<GlobalCount>({
    judgeHostAmount: 0,
    problemAmount: 0,
    problemSetAmount: 0,
    submissionAmount: 0,
    userAmount: 0,
    recentSubmission: []
  });

  useEffect(() => {
    getAndSetRecentProblem();
    getAndSetRecentSubmissionCount();
    getAndSetRecentActiveUserInfo();
    getAndSetGlobalCount();
  }, []);

  // 获取最新问题
  const getAndSetRecentProblem = () => {
    getRecentProblems(RECENT_PROBLEM_IN_DASHBOARD_AMOUNT)
      .then(res => {
        setRecentProblems(res.data);
      })
  }

  // 获取最近提交统计信息
  const getAndSetRecentSubmissionCount = () => {
    const end = moment().add(1, 'days').format(DEFAULT_DATE_TIME_FORMAT);
    // 默认提早七天
    const start = moment().add(
      RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT * (-1),
      'days').format(DEFAULT_DATE_TIME_FORMAT);

    getRecentSubmission(start, end)
      .then(res => {
        setRecentSubmissionCount(res.data);
      })
  }

  // 获取最近活跃用户
  const getAndSetRecentActiveUserInfo = () => {
    getActiveUserInfo(RECENT_ACTIVE_USER_IN_DASHBOARD_AMOUNT)
      .then(res => {
        setActiveUserInfo(res.data);
      })
  }

  // 获取全局统计信息
  const getAndSetGlobalCount = () => {
    getGlobalCount()
      .then(res => {
        setGlobalCount(res.data);
      })
  }

  return (
    <div className={styles.dashboard}>
      <RcQueueAnim>
        <div className={styles.dashboard_cards} key={'cards'}>
          <HeadCardGroup globalCount={globalCount}/>
        </div>
        <div className={styles.dashboard_charts} key={'charts'}>
          <ChartGroup
            globalSubmissionCount={globalCount.recentSubmission}
            recentSubmission={recentSubmissionCount}
            userInfo={userInfoState.userInfo}/>
        </div>
        <div className={styles.dashboard_tables} key={'tables'}>
          <TableGroup
            problems={recentProblems}
            userInfo={activeUserInfo}/>
        </div>
      </RcQueueAnim>
    </div>
  )
}

export default Dashboard;