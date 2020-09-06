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
import {RankingColorEnum} from "../../common/enumerations";
import {TablePaginationConfig} from "antd/lib/table/interface";
import {Pagination} from "../../models/pagination";
import {UserGroupInfo} from "../../models/UserGroup";
import {SizeType} from "antd/lib/config-provider/SizeContext";

interface UserTableProps {
  userInfo: UserInfo[];
  pagination?: Pagination;
  showRanking?: boolean;
  operations?: (props: any) => React.ReactNode;
  showScope?: boolean;
  showEmail?: boolean;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
  tableSize?: SizeType;
}

const UserTable: React.FunctionComponent<UserTableProps> = (props) => {

  // 渲染用户排名相关信息
  const renderUserRanking = (index: number) => {
    const rankingStyle: React.CSSProperties = {
      backgroundColor: getRanking(index + 1)
    }
    return (
      <div>
        <Badge
          count={index + 1}
          style={rankingStyle}/>
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
    if (!content || !content.length) return "无所在用户组";
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
      size={props.tableSize}
      dataSource={props.userInfo}
      rowKey={"nickname"}
      pagination={props.pagination ? paginationProp : false}
      onChange={(e: TablePaginationConfig) => onPageChange(e)}>
      {
        props.showRanking && <Table.Column
          title={"排名"}
          render={(value: any, record: any, index: number) => renderUserRanking(index)}/>
      }
      <Table.Column
        title={"用户名"}
        dataIndex={"nickname"}/>
      {
        props.showScope &&
        <Table.Column
          title={"所在用户组"}
          dataIndex={"userGroups"}
          render={renderUserGroups}/>
      }
      {
        props.showEmail &&
        <Table.Column
          title={"邮箱"}
          dataIndex={"email"}
          render={(res) => res ? res : "未提供"}/>
      }
      {
        props.showRanking &&
        <Table.Column
          title={"提交数"}
          dataIndex={"submissionAmount"}/>
      }
      {
        props.showRanking &&
        <Table.Column
          title={"AC数"}
          dataIndex={"acAmount"}/>
      }
      {
        props.operations &&
        <Table.Column
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
  isLoading: false,
  tableSize: undefined
}

export default UserTable;