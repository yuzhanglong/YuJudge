/*
 * File: UserManageToolBar.tsx
 * Description: 用户管理工具栏
 * Created: 2020-08-16 15:39:30
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Row, Select, Space} from "antd";
import {UserScope} from "../../../common/enumerations";

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
            defaultValue={UserScope.ALL_USERS}
            style={{
              width: 120
            }}
            onChange={onSelectorChange}>
            <Select.Option value={UserScope.ALL_USERS}>
              所有用户
            </Select.Option>
            <Select.Option value={UserScope.ADMIN}>
              系统管理员
            </Select.Option>
            <Select.Option value={UserScope.MANAGER}>
              管理员
            </Select.Option>
            <Select.Option value={UserScope.COMMON}>
              一般用户
            </Select.Option>
            <Select.Option value={UserScope.TEMPORARY}>
              临时用户
            </Select.Option>
          </Select>
        </Space>
      </Row>
    </div>
  )
}

export default UserManageToolBar;