/*
 * File: Home.tsx
 * Description: 首页
 * Created: 2020-8-24 13:56:46
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useEffect, useState} from 'react';
import {message} from 'antd';
import style from './home.module.scss';
import {UsePaginationState} from '../../../hooks/pagination';
import {
  PAGE_BEGIN,
  RECENT_ACTIVE_USER_IN_DASHBOARD_AMOUNT,
  RECENT_PROBLEM_IN_DASHBOARD_AMOUNT
} from '../../../config/config';
import {getNotices} from '../../../network/noticeRequest';
import {NoticePaginationRequest} from '../../../models/pagination';
import {RouteComponentProps} from 'react-router-dom';
import {getActiveUserInfo} from '../../../network/userRequest';
import {getRecentProblems} from '../../../network/problemRequests';
import {Problem} from '../../../models/problem';
import {getDailyWord} from '../../../network/common';
import {DailyWord} from '../../../models/common';
import SideItem from './childCmp/SideItem';
import HomeContent from './childCmp/HomeContent';


interface HomeProps {

}

const Home: React.FunctionComponent<HomeProps & RouteComponentProps> = () => {

  // 分页状态
  const noticePaginationState = UsePaginationState<NoticePaginationRequest>(PAGE_BEGIN - 1, getNotices);

  // 活跃用户
  const [activeUserInfo, setActiveUserInfo] = useState([]);

  // 近期问题
  const [recentProblems, setRecentProblems] = useState<Problem[]>([]);

  // 每日一句
  const [dailyWord, setDailyWord] = useState<DailyWord>();


  useEffect(() => {
    getAndSetNotice(PAGE_BEGIN - 1);
    getAndSetRecentActiveUserInfo();
    getAndSetRecentProblem();
    getAndSetDailyWord();
    // eslint-disable-next-line
  }, []);


  // 获取通知
  const getAndSetNotice = (start: number) => {
    noticePaginationState
      .changeCurrentPage({start: start, count: 5})
      .catch(() => {
        message.error('获取公告失败');
      })
  }

  // 获取最近活跃用户
  const getAndSetRecentActiveUserInfo = () => {
    getActiveUserInfo(RECENT_ACTIVE_USER_IN_DASHBOARD_AMOUNT)
      .then(res => {
        setActiveUserInfo(res.data);
      })
  }

  // 获取最近问题
  const getAndSetRecentProblem = () => {
    getRecentProblems(RECENT_PROBLEM_IN_DASHBOARD_AMOUNT)
      .then(res => {
        setRecentProblems(res.data);
      })
  }

  // 每日一句
  const getAndSetDailyWord = () => {
    getDailyWord()
      .then(res => {
        setDailyWord(res.data);
      })
  }


  return (
    <div className={style.home}>
      <div className={style.home_content}>
        <div className={style.home_content_main}>
          <HomeContent notices={noticePaginationState.items} problems={recentProblems}/>
        </div>
        <div className={style.home_content_side}>
          <SideItem activeUserInfo={activeUserInfo} dailyWord={dailyWord}/>
        </div>
      </div>
    </div>
  )
}

export default Home;