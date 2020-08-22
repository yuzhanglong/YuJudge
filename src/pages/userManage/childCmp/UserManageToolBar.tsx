/*
 * File: UserManageToolBar.tsx
 * Description: 用户管理工具栏
 * Created: 2020-08-16 15:39:30
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Row, Select, Space} from "antd";

interface UserManageToolBarProps {
  onSelectorChange: (value: string) => void;
}

const UserManageToolBar: React.FunctionComponent<UserManageToolBarProps> = (props) => {

  // 选择器内容被改变
  const onSelectorChange = (value: string) => {
    props.onSelectorChange(value);
  }

  return (
    <div>
      <Row>
        <Space style={{paddingBottom: 20}}>
          筛选用户类型:
          <Select
            placeholder={"选择一个用户类型"}
            style={{
              width: 120
            }}
            onChange={onSelectorChange}>
          </Select>
        </Space>
      </Row>
    </div>
  )
}

export default UserManageToolBar;