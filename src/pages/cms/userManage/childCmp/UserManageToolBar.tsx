/*
 * File: UserManageToolBar.tsx
 * Description: 用户管理工具栏
 * Created: 2020-08-16 15:39:30
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { Row, Select, Space } from 'antd'
import { UserGroupInfo } from '../../../../models/UserGroup'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface UserManageToolBarProps {
  onSelectorChange: (value: number) => void;
  selectorItems: UserGroupInfo[];
}

const UserManageToolBar: React.FC<UserManageToolBarProps> = (props) => {

  // 选择器内容被改变
  const onSelectorChange = (value: number) => {
    props.onSelectorChange(value)
  }

  // local
  const localContext = useContext(LocalContext)

  // 渲染选择器
  const renderOptions = () => {
    return props.selectorItems.map(res => {
      return (
        <Select.Option value={res.id.toString()} key={res.id}>
          {res.description}
        </Select.Option>
      )
    })
  }

  return (
    <Row>
      <Space style={{
        paddingBottom: 20
      }}>
        {localContext.user.userTypes}
        <Select
          defaultValue={-1}
          placeholder={localContext.user.chooseUserType}
          style={{
            minWidth: 160
          }}
          onChange={onSelectorChange}>
          <Select.Option key={'all'} value={-1}>
            {localContext.user.totalUser}
          </Select.Option>
          {renderOptions()}
        </Select>
      </Space>
    </Row>
  )
}

export default UserManageToolBar
