/*
 * File: NoticeTable.tsx
 * Description: 通知表格
 * Created: 2020-8-26 12:01:21
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {NoticeInfo} from "../../models/notice";
import {Avatar, Col, Row, Table} from "antd";
import {timestampToDateTime} from "../../utils/dateTime";
import style from "./noticeTable.module.scss";
import {NoticePriority} from "../../common/enumerations";
import classNames from "classnames";
import {UserInfo} from "../../models/user";

interface NoticeTableProps {
  notices: NoticeInfo[];
  showHeader?: boolean;
}

const NoticeTable: React.FunctionComponent<NoticeTableProps> = (props) => {

  // 渲染时间相关
  const renderTime = (timeStamp: number) => {
    return (<div>{timestampToDateTime(timeStamp)}</div>);
  }

  // 渲染公告标题
  const renderNoticeTitle = (notice: NoticeInfo) => {
    // 区分类名
    const className = classNames([style.notice_table_title], {
      [style.notice_table_title_common]: notice.priority === NoticePriority.COMMON,
      [style.notice_table_title_important]: notice.priority === NoticePriority.IMPORTANT,
    });
    return (
      <div className={className}>
        {notice.title}
      </div>
    )
  }

  // 渲染作者
  const renderCreator = (user: UserInfo) => {
    return (
      <Row align={"middle"}>
        <Col>
          <div className={style.notice_table_creator}>
            {user.nickname}
          </div>
        </Col>
        <Col>
          <Avatar
            size={"small"}
            src={user.avatar}
            className={style.notice_table_avatar}/>
        </Col>
      </Row>
    )
  }

  return (
    <div>
      <Table
        size={"middle"}
        rowKey={"id"}
        dataSource={props.notices}>
        <Table.Column
          title={"标题"}
          key={"title"}
          render={renderNoticeTitle}/>
        <Table.Column
          title={"作者"}
          dataIndex={"creator"}
          key={"creator"}
          render={renderCreator}/>
        <Table.Column
          title={"发布时间"}
          dataIndex={"createTime"}
          key={"createTime"}
          fixed={"right"}
          width={200}
          render={renderTime}/>
      </Table>
    </div>
  )
}


NoticeTable.defaultProps = {
  showHeader: false,
  notices: []
}

export default NoticeTable;