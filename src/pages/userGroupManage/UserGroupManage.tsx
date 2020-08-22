/*
 * File: UserGroupManage.tsx
 * Description: 用户组相关管理页面
 * Created: 2020-08-16 12:51:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Button, Card, message, Modal} from "antd";
import UserGroupTable from "../../components/userGroupTable/UserGroupTable";
import {UserGroupInfo} from "../../models/UserGroup";
import {createUserGroup, deleteUserGroup, editUserGroup, getUserGroups} from "../../network/userGroupRequest";
import {ExclamationCircleOutlined, PlusOutlined} from "@ant-design/icons/lib";
import {BaseResponse} from "../../models/common";
import UserGroupEditModal from "./childCmp/UserGroupEditModal";

interface UserGroupManageProps {

}

const UserGroupManage: React.FunctionComponent<UserGroupManageProps> = (props) => {
  // 用户组信息
  const [userGroups, setUserGroups] = useState<UserGroupInfo[]>([]);

  // 用户组表单是否可视
  const [isUserGroupVisiable, setIsUserGroupVisiable] = useState<boolean>(false);

  // 欲编辑的用户组信息
  const [userGroupInfoToEdit, setUserGroupInfoToEdit] = useState<UserGroupInfo | null>(null);

  useEffect(() => {
    getUserGroupInfo();
  }, []);

  // 获取用户组信息
  const getUserGroupInfo = () => {
    getUserGroups()
      .then(res => {
        setUserGroups(res.data);
      })
      .catch(() => {
      })
  }

  // 渲染操作列
  const renderOperations = (value: any) => {
    return (
      <div>
        <Button type={"link"} onClick={() => onEditButtonClick(value)}>
          编辑
        </Button>
        <Button type={"link"}>
          授权
        </Button>
        <Button type={"link"} danger onClick={() => onUserGroupDelete(value)}>
          删除
        </Button>
      </div>
    )
  }

  // 删除用户组
  const onUserGroupDelete = (value: UserGroupInfo) => {
    console.log(value);
    Modal.confirm({
      title: '删除确认',
      icon: <ExclamationCircleOutlined/>,
      content: '您确定要移除这个用户组吗？',
      onOk() {
        deleteUserGroup(value.id)
          .then(() => {
            message.success("移除用户组成功~");
            getUserGroupInfo();
          })
          .catch((err: BaseResponse) => {
            message.error(err.message);
          })
      }
    })
  }

  // 提交创建用户组的表单
  const onCreateOrEditUserGroupConfirm = (res: UserGroupInfo) => {
    if (!userGroupInfoToEdit) {
      // 创建模式
      createUserGroup(res)
        .then(() => {
          setIsUserGroupVisiable(false);
          getUserGroupInfo();
          message.success("创建成功");
        })
        .catch((err: BaseResponse) => {
          message.error(err.message);
        })
    } else {
      // 编辑模式
      editUserGroup(userGroupInfoToEdit.id, res)
        .then(() => {
          setIsUserGroupVisiable(false);
          getUserGroupInfo();
          message.success("编辑成功");
          // 不要忘记重置回去=
          setUserGroupInfoToEdit(null);
        })
        .catch((err: BaseResponse) => {
          message.error(err.message);
        })
    }
  }

  // 编辑按钮被按下
  const onEditButtonClick = (res: UserGroupInfo) => {
    setUserGroupInfoToEdit(res);
    setIsUserGroupVisiable(true);
  }

  // 编辑对话框被销毁
  const onEditFormDestroy = () => {
    setIsUserGroupVisiable(false);
    setUserGroupInfoToEdit(null);
  }

  return (
    <Card
      title={"用户组信息"}
      extra={
        <Button
          type={"primary"}
          icon={<PlusOutlined/>}
          onClick={() => {
            setIsUserGroupVisiable(true);
          }}>
          创建用户组
        </Button>
      }>
      <UserGroupTable
        userGroups={userGroups}
        operations={renderOperations}/>
      <UserGroupEditModal
        dataToEdit={userGroupInfoToEdit}
        onConfirm={(res: UserGroupInfo) => onCreateOrEditUserGroupConfirm(res)}
        isVisiable={isUserGroupVisiable}
        onCalcel={() => onEditFormDestroy()}/>
    </Card>
  )
}

export default UserGroupManage;