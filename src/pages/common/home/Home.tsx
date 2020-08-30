/*
 * File: Home.tsx
 * Description: 首页
 * Created: 2020-8-24 13:56:46
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useEffect, useState} from "react";
import {Card, message} from "antd";
import style from "./home.module.scss";
import {UsePaginationState} from "../../../hooks/pagination";
import {
  PAGE_BEGIN,
  RECENT_ACTIVE_USER_IN_DASHBOARD_AMOUNT,
  RECENT_PROBLEM_IN_DASHBOARD_AMOUNT
} from "../../../config/config";
import {getNotices} from "../../../network/noticeRequest";
import {NoticePaginationRequest} from "../../../models/pagination";
import NoticeTable from "../../../components/noticeTable/NoticeTable";
import QuickStart from "./childCmp/QuickStart";
import {RouteComponentProps} from "react-router-dom";
import UserTable from "../../../components/userTable/UserTable";
import {getActiveUserInfo} from "../../../network/userRequest";
import ProblemTable from "../../../components/problemTable/ProblemTable";
import {getRecentProblems} from "../../../network/problemRequests";
import {Problem} from "../../../models/problem";
import RcQueueAnim from "rc-queue-anim";
import {getDailyWord} from "../../../network/common";
import {DailyWord} from "../../../models/common";
import {Meta} from "antd/es/list/Item";


interface HomeProps {

}

const Home: React.FunctionComponent<HomeProps & RouteComponentProps> = (props) => {
  useEffect(() => {
    getAndSetNotice(PAGE_BEGIN - 1);
    getAndSetRecentActiveUserInfo();
    getAndSetRecentProblem();
    getAndSetDailyWord();
    // eslint-disable-next-line
  }, []);

  // 分页状态
  const noticePaginationState = UsePaginationState<NoticePaginationRequest>(PAGE_BEGIN - 1, getNotices);

  // 活跃用户
  const [activeUserInfo, setActiveUserInfo] = useState([]);

  // 近期问题
  const [recentProblems, setRecentProblems] = useState<Problem[]>([]);

  // 每日一句
  const [dailyWord, setDailyWord] = useState<DailyWord>();

  // 获取通知
  const getAndSetNotice = (start: number) => {
    noticePaginationState
      .changeCurrentPage({start: start, count: 5})
      .catch(() => {
        message.error("获取公告失败");
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

  // 搜索按钮被按下
  const onSearch = (problemId: string) => {
    props.history.push(`/common/problem/${problemId}`);
  }


  return (
    <div className={style.home}>
      <div className={style.home_content}>
        <div className={style.home_content_main}>
          <RcQueueAnim>
            <div key={"home_content_item1"}>
              <Card title={"公告"} className={style.home_content_item}>
                <NoticeTable notices={noticePaginationState.items}/>
              </Card>
            </div>

            <div key={"home_content_item2"}>
              <Card title={"最近更新"} className={style.home_content_item}>
                <ProblemTable
                  isShowProblemOrder={false}
                  problems={recentProblems}
                  isShowOperations={false}
                  isShowTags={false}
                  showPagination={false}
                  tableSize={"middle"}/>
              </Card>
            </div>
          </RcQueueAnim>


        </div>
        <div className={style.home_content_side}>
          <RcQueueAnim>
            <div key={"home_content_side_item1"}>
              <Card title={"每日一句"} className={style.home_content_side_item}>
                <Meta title={dailyWord?.title} description={dailyWord?.content}/>
              </Card>
            </div>
            <div key={"home_content_side_item2"}>
              <Card title={"快速开始"} className={style.home_content_side_item}>
                <QuickStart onSearch={(value) => onSearch(value)}/>
              </Card>
            </div>
            <div key={"home_content_side_item3"}>
              <Card title={"活跃用户"} className={style.home_content_side_item}>
                <UserTable userInfo={activeUserInfo} tableSize={"middle"}/>
              </Card>
            </div>
          </RcQueueAnim>
        </div>
      </div>
    </div>
  )
}

export default Home;