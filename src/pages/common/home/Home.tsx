/*
 * File: Home.tsx
 * Description: 首页
 * Created: 2020-8-24 13:56:46
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useEffect, useState} from "react";
import {Card, message, Table} from "antd";
import style from "./home.module.scss";
import {UsePaginationState} from "../../../hooks/pagination";
import {PAGE_BEGIN, RECENT_ACTIVE_USER_IN_DASHBOARD_AMOUNT} from "../../../config/config";
import {getNotices} from "../../../network/noticeRequest";
import {NoticePaginationRequest} from "../../../models/pagination";
import NoticeTable from "../../../components/noticeTable/NoticeTable";
import QuickStart from "./childCmp/QuickStart";
import {RouteComponentProps} from "react-router-dom";
import UserTable from "../../../components/userTable/UserTable";
import {getActiveUserInfo} from "../../../network/userRequest";


interface HomeProps {

}

const Home: React.FunctionComponent<HomeProps & RouteComponentProps> = (props) => {
  useEffect(() => {
    getAndSetNotice(PAGE_BEGIN - 1);
    getAndSetRecentActiveUserInfo();
    // eslint-disable-next-line
  }, []);

  // 分页状态
  const noticePaginationState = UsePaginationState<NoticePaginationRequest>(PAGE_BEGIN - 1, getNotices);

  // 活跃用户
  const [activeUserInfo, setActiveUserInfo] = useState([]);

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


  return (
    <div className={style.home}>
      <div className={style.home_content}>
        <div className={style.home_content_main}>
          <Card title={"公告"} className={style.home_content_item}>
            <NoticeTable notices={noticePaginationState.items}/>
          </Card>

          <Card title={"最近更新"} className={style.home_content_item}>
            <Table></Table>
          </Card>

        </div>
        <div className={style.home_content_side}>
          <Card title={"每日一句"} className={style.home_content_side_item}>
            HAHAHAHA
          </Card>

          <Card title={"快速开始"} className={style.home_content_side_item}>
            <QuickStart onSearch={() => {
            }}/>
          </Card>

          <Card title={"活跃用户"} className={style.home_content_side_item}>
            <UserTable userInfo={activeUserInfo} tableSize={"middle"}/>
          </Card>


        </div>
      </div>
    </div>
  )
}

export default Home;