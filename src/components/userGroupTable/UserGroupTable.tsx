/*
 * File: UserGroupTable.tsx
 * Description: 用户组表格
 * Created: 2020-8-22 15:15:40
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { Table } from 'antd'
import { UserGroupInfo } from '../../models/UserGroup'
import { LocalContext } from '../localContext/LocalContext'

interface UserGroupTableProps {
  // 用户组信息列表
  userGroups: UserGroupInfo[];

  // 操作
  operations?: (content: any) => React.ReactNode;
}

const UserGroupTable: React.FunctionComponent<UserGroupTableProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)

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
      rowKey={'id'}>
      <Table.Column
        title={localContext.userGroup.name}
        key={'name'}
        dataIndex={'name'}
        width={250} />
      />
      <Table.Column
        title={localContext.userGroup.desc}
        dataIndex={'description'}
        key={'description'} />
      />
      <Table.Column
        title={localContext.operation}
        key={'description'}
        align={'center'}
        width={300}
        fixed={'right'}
        render={renderOperations} />
      />
    </Table>
  )
}

export default UserGroupTable
