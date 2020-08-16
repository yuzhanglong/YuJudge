/*
 * File: UserManage.tsx
 * Description: 用户相关后台管理页面
 * Created: 2020-08-16 12:50:52
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Button, Card} from "antd";
import UserTable from "../../components/userTable/UserTable";
import {getUsers} from "../../network/userRequest";
import {usePaginationState} from "../../hooks/pagination";
import {UsersPaginationRequest} from "../../models/pagination";
import {PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_USER_MANAGE} from "../../config/config";
import UserManageToolBar from "./childCmp/UserManageToolBar";
import {UserScope} from "../../common/enumerations";

interface UserManageProps {

}

const UserManage: React.FunctionComponent<UserManageProps> = (props) => {
  // 用户分页对象
  const usersPaginations = usePaginationState<UsersPaginationRequest>(PAGE_BEGIN - 1, getUsers);

  // 权限筛选
  const [currentScope, setCurrentScope] = useState<string>(UserScope.ALL_USERS);

  useEffect(() => {
    getUserInfo(PAGE_BEGIN - 1, null);
    // eslint-disable-next-line
  }, []);

  // 获取用户信息
  const getUserInfo = (start: number, scope: string | null) => {
    let requestBody: UsersPaginationRequest = {
      start: start,
      count: SINGLE_PAGE_SIZE_IN_USER_MANAGE,
      scope: scope !== UserScope.ALL_USERS ? scope : null
    };
    console.log(requestBody);
    usersPaginations.changeCurrentPage(requestBody)
      .then(() => {
      })
  }

  // 渲染表单操作项目
  const renderUserOperations = (content: any) => {
    return (
      <div>
        <Button type={"link"}>
          编辑
        </Button>
        <Button type={"link"} danger>
          删除
        </Button>
      </div>
    )
  }

  // 类型筛选选择器被改变
  const onScopeSelectorChange = (value: string) => {
    setCurrentScope(value);
    getUserInfo(PAGE_BEGIN - 1, value);
  }

  return (
    <Card title={"用户管理"}>
      <UserManageToolBar onSelectorChange={onScopeSelectorChange}/>
      <UserTable
        onPageChange={(page: number) => getUserInfo(page - 1, currentScope)}
        showScope
        showEmail
        isLoading={usersPaginations.isLoading}
        pagination={usersPaginations.paginationInfo}
        userInfo={usersPaginations.items}
        showRanking={false}
        operations={renderUserOperations}/>
    </Card>
  )
}

export default UserManage;