/*
 * File: UserTable.tsx
 * Description: 用户信息表格
 * Created: 2020-08-07 21:21:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {UserInfo} from "../../models/user";
import {Badge, Table} from "antd";
import Column from "antd/lib/table/Column";
import {RankingColorEnum} from "../../common/enumerations";

interface UserTableProps {
  userInfo: UserInfo[];
  showPagination?: boolean;
  showRanking?: boolean;
}

const UserTable: React.FunctionComponent<UserTableProps> = (props) => {
  // 渲染用户排名相关信息
  const renderUserRanking = (index: number) => {
    const rankingstyle: React.CSSProperties = {
      backgroundColor: getRanking(index + 1)
    }
    return (
      <div>
        <Badge count={index + 1} style={rankingstyle}/>
      </div>
    )
  }

  // 获取排名
  const getRanking = (index: number) => {
    switch (index) {
      case 1:
        return RankingColorEnum.RANKING_FIRST;
      case 2:
        return RankingColorEnum.RANKING_SECOND;
      case 3:
        return RankingColorEnum.RANKING_THIRD;
      default:
        return RankingColorEnum.RANKING_DEFAULT;
    }
  }

  return (
    <Table
      dataSource={props.userInfo}
      rowKey={"nickname"}
      pagination={false}>
      {
        props.showRanking && <Column
          title={"排名"}
          render={(value: any, record: any, index: number) => renderUserRanking(index)}/>
      }
      <Column
        title={"用户名"}
        dataIndex={"nickname"}/>
      <Column
        title={"ac数量"}
        dataIndex={"acAmount"}/>
      <Column
        title={"提交数量"}
        dataIndex={"submissionAmount"}/>
    </Table>
  )
}

UserTable.defaultProps = {
  showPagination: false,
  showRanking: true
}

export default UserTable;