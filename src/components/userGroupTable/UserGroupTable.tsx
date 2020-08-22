/*
 * File: UserGroupTable.tsx
 * Description: 用户组表格
 * Created: 2020-8-22 15:15:40
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Table} from "antd";
import {UserGroupInfo} from "../../models/UserGroup";
import Column from "antd/lib/table/Column";

interface UserGroupTableProps {
  // 用户组信息列表
  userGroups: UserGroupInfo[];

  // 操作
  operations?: (content: any) => React.ReactNode;
}

const UserGroupTable: React.FunctionComponent<UserGroupTableProps> = (props) => {
  // 渲染操作列
  const renderOperations = (content: any) => {
    return (
      <div>
        {props.operations ? props.operations(content) : null}
      </div>
    )
  }

  return (
    <Table
      dataSource={props.userGroups}
      rowKey={"id"}>
      <Column
        title={"名称"}
        key={"name"}
        dataIndex={"name"}
        width={250}/>
      />
      <Column
        title={"描述"}
        dataIndex={"description"}
        key={"description"}/>
      />
      <Column
        title={"操作"}
        key={"description"}
        align={"center"}
        width={300}
        fixed
        render={renderOperations}/>
      />
    </Table>
  )
}

export default UserGroupTable;