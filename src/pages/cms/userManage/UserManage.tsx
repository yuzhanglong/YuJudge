/*
 * File: UserManage.tsx
 * Description: 用户相关后台管理页面
 * Created: 2020-08-16 12:50:52
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Button, Card, message, Modal} from "antd";
import UserTable from "../../../components/userTable/UserTable";
import {allocateUserUserGroup, createUser, deleteUser, getUsers} from "../../../network/userRequest";
import {UsePaginationState} from "../../../hooks/pagination";
import {UsersPaginationRequest} from "../../../models/pagination";
import {PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_USER_MANAGE} from "../../../config/config";
import {UserInfo} from "../../../models/user";
import {BaseResponse} from "../../../models/common";
import {ExclamationCircleOutlined, PlusOutlined} from "@ant-design/icons";
import UserManageToolBar from "./childCmp/UserManageToolBar";
import {UserGroupInfo} from "../../../models/UserGroup";
import {getUserGroups} from "../../../network/userGroupRequest";
import CreateUserModal from "./childCmp/CreateUserModal";
import AllocateUserGroupsModal from "./childCmp/AllocateUserGroupsModal";

interface UserManageProps {

}

const UserManage: React.FunctionComponent<UserManageProps> = () => {
  // 用户分页对象
  const usersPaginationState = UsePaginationState<UsersPaginationRequest>(PAGE_BEGIN - 1, getUsers);

  // 可供选择的用户组
  const [userGroupItems, setUserGroupItems] = useState<UserGroupInfo[]>([]);

  // 当前用户组id
  const [activeUserGroup, setActiveUserGroup] = useState<number | null>(null);

  // 创建用户对话框
  const [isCreateUserModalVisible, setIsCreateUserModalVisible] = useState<boolean>(false);

  // 当前选中用户
  const [activeUser, setActiveUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    getUserInfo(PAGE_BEGIN - 1, activeUserGroup);
    getAndSetUserGroup();
    // eslint-disable-next-line
  }, []);

  // 获取可供选择的用户组
  const getAndSetUserGroup = () => {
    getUserGroups()
      .then(res => {
        setUserGroupItems(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // 获取用户信息
  const getUserInfo = (start: number, group: number | null) => {
    let requestBody: UsersPaginationRequest = {
      start: start,
      count: SINGLE_PAGE_SIZE_IN_USER_MANAGE,
      group: group
    };

    usersPaginationState.changeCurrentPage(requestBody)
      .catch((err: BaseResponse) => {
        console.log(err);
      });
  }

  // 渲染表单操作项目
  const renderUserOperations = (content: any) => {
    return (
      <div>
        <Button type={"link"} onClick={() => setActiveUser(content)}>
          分配用户组
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
            getUserInfo(PAGE_BEGIN - 1, activeUserGroup);
          })
          .catch((err: BaseResponse) => {
            message.error(err.message);
          })
      }
    })
  }

  // 渲染添加用户按钮
  const renderAddUserButton = () => {
    return (
      <Button
        onClick={() => setIsCreateUserModalVisible(true)}
        type={"primary"}
        icon={<PlusOutlined/>}>
        创建用户
      </Button>
    )
  }

  // 创建用户按钮被单击
  const onSelectorChange = (data: number) => {
    setActiveUserGroup(data < 0 ? null : data);
    getUserInfo(PAGE_BEGIN - 1, data < 0 ? null : data);
  }

  // 创建用户
  const createUserConfirm = (n: string, p: string) => {
    createUser(n, p)
      .then(() => {
        message.success("创建用户成功");
        getUserInfo(PAGE_BEGIN - 1, activeUserGroup);
      })
      .catch((err: BaseResponse) => {
        message.error(err.message);
      })
  }

  // 为用户分配用户组
  const allocateUserGroups = (userGroupsIds: string[]) => {
    if (activeUser) {
      allocateUserUserGroup(activeUser.id, userGroupsIds)
        .then(() => {
          message.success("分配成功~");
          setActiveUser(null);
          getUserInfo(PAGE_BEGIN - 1, activeUserGroup);
        })
        .catch(() => {
          message.error("分配失败");
        });
    }
  }

  return (
    <Card title={"用户管理"} extra={renderAddUserButton()}>
      <UserManageToolBar
        onSelectorChange={onSelectorChange}
        selectorItems={userGroupItems}/>
      <UserTable
        onPageChange={(page: number) => getUserInfo(page - 1, activeUserGroup)}
        showScope
        showEmail
        isLoading={usersPaginationState.isLoading}
        pagination={usersPaginationState.paginationInfo}
        userInfo={usersPaginationState.items}
        showRanking={false}
        operations={renderUserOperations}/>
      <CreateUserModal
        isVisible={isCreateUserModalVisible}
        onClose={() => setIsCreateUserModalVisible(false)}
        onCreateConfirm={createUserConfirm}/>
      {
        activeUser &&
        <AllocateUserGroupsModal
          onConfirm={(res) => allocateUserGroups(res)}
          onCancel={() => setActiveUser(null)}
          isVisible={true}
          userInfo={activeUser}
          totalUserGroups={userGroupItems}/>
      }
    </Card>
  )
}

export default UserManage;