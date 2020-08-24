/*
 * File: UserTable.tsx
 * Description: 用户信息表格
 * Created: 2020-08-07 21:21:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {UserInfo} from "../../models/user";
import {Badge, Table, Tag} from "antd";
import Column from "antd/lib/table/Column";
import {RankingColorEnum} from "../../common/enumerations";
import {TablePaginationConfig} from "antd/lib/table/interface";
import {Pagination} from "../../models/pagination";
import {UserGroupInfo} from "../../models/UserGroup";

interface UserTableProps {
  userInfo: UserInfo[];
  pagination?: Pagination;
  showRanking?: boolean;
  operations?: (props: any) => React.ReactNode;
  showScope?: boolean;
  showEmail?: boolean;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
}

const UserTable: React.FunctionComponent<UserTableProps> = (props) => {

  // 渲染用户排名相关信息
  const renderUserRanking = (index: number) => {
    const rankingstyle: React.CSSProperties = {
      backgroundColor: getRanking(index + 1)
    }
    return (
      <div>
        <Badge
          count={index + 1}
          style={rankingstyle}/>
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

  // 渲染操作列
  const renderOperations = (content: any) => {
    return (
      <div>
        {props.operations ? props.operations(content) : null}
      </div>
    )
  }

  // 分页配置
  const paginationProp: TablePaginationConfig = {
    total: (props.pagination?.totalPage || 1) * (props.pagination?.count || 10),
    defaultPageSize: props.pagination?.count || 10
  }

  // 渲染身份信息
  const renderUserGroups = (content: UserGroupInfo[]) => {
    return content.map(res => {
      return (
        <Tag color="geekblue" key={res.id}>
          {res.description}
        </Tag>
      )
    })
  }

  // 页码改变
  const onPageChange = (event: TablePaginationConfig) => {
    if (props.onPageChange && event.current) {
      props.onPageChange(event.current);
    }
  }

  return (
    <Table
      dataSource={props.userInfo}
      rowKey={"nickname"}
      pagination={props.pagination ? paginationProp : false}
      onChange={(e: TablePaginationConfig) => onPageChange(e)}>
      {
        props.showRanking && <Column
          title={"排名"}
          render={(value: any, record: any, index: number) => renderUserRanking(index)}/>
      }
      <Column
        title={"用户名"}
        dataIndex={"nickname"}/>
      {
        props.showScope &&
        <Column
          title={"所在用户组"}
          dataIndex={"userGroups"}
          render={renderUserGroups}/>
      }
      {
        props.showEmail &&
        <Column
          title={"邮箱"}
          dataIndex={"email"}/>
      }
      {
        props.showRanking &&
        <Column
          title={"提交数"}
          dataIndex={"submissionAmount"}/>
      }
      {
        props.showRanking &&
        <Column
          title={"AC数"}
          dataIndex={"acAmount"}/>
      }
      {
        props.operations &&
        <Column
          width={300}
          align={"center"}
          title={"操作"}
          render={renderOperations}/>
      }
    </Table>
  )
}

UserTable.defaultProps = {
  showRanking: true,
  showScope: false,
  showEmail: false,
  isLoading: false
}

export default UserTable;