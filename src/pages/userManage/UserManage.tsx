/*
 * File: UserManage.tsx
 * Description: 用户相关后台管理页面
 * Created: 2020-08-16 12:50:52
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect} from "react";
import {Button, Card, message, Modal} from "antd";
import UserTable from "../../components/userTable/UserTable";
import {deleteUser, getUsers} from "../../network/userRequest";
import {usePaginationState} from "../../hooks/pagination";
import {UsersPaginationRequest} from "../../models/pagination";
import {PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_USER_MANAGE} from "../../config/config";
import {UserInfo} from "../../models/user";
import {BaseResponse} from "../../models/common";
import {ExclamationCircleOutlined} from "@ant-design/icons/lib";

interface UserManageProps {

}

const UserManage: React.FunctionComponent<UserManageProps> = (props) => {
  // 用户分页对象
  const usersPaginations = usePaginationState<UsersPaginationRequest>(PAGE_BEGIN - 1, getUsers);

  useEffect(() => {
    getUserInfo(PAGE_BEGIN - 1);
    // eslint-disable-next-line
  }, []);

  // 获取用户信息
  const getUserInfo = (start: number) => {
    let requestBody: UsersPaginationRequest = {
      start: start,
      count: SINGLE_PAGE_SIZE_IN_USER_MANAGE
    };
    usersPaginations.changeCurrentPage(requestBody)
      .catch((err: BaseResponse) => {
        console.log(err);
      })

  }

  // 渲染表单操作项目
  const renderUserOperations = (content: any) => {
    return (
      <div>
        <Button type={"link"}>
          编辑
        </Button>
        <Button type={"link"} danger onClick={() => onUserRemoveButtonClick(content)}>
          删除
        </Button>
      </div>
    )
  }

  // 用户删除按钮被单击
  const onUserRemoveButtonClick = (content: UserInfo) => {
    const userId = content.id;
    Modal.confirm({
      title: '删除确认',
      icon: <ExclamationCircleOutlined/>,
      content: '您确定要删除这个用户吗？',
      onOk() {
        deleteUser(userId)
          .then(() => {
            message.success("移除用户成功~");
            getUserInfo(PAGE_BEGIN - 1);
          })
          .catch((err: BaseResponse) => {
            message.error(err.message);
          })
      }
    })
  }

  return (
    <Card title={"用户管理"}>
      <UserTable
        onPageChange={(page: number) => getUserInfo(page - 1)}
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