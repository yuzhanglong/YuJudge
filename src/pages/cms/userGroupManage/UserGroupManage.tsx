/*
 * File: UserGroupManage.tsx
 * Description: 用户组相关管理页面
 * Created: 2020-08-16 12:51:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from 'react';
import {Button, Card, message, Modal} from 'antd';
import UserGroupTable from '../../../components/userGroupTable/UserGroupTable';
import {UserGroupInfo} from '../../../models/UserGroup';
import {createUserGroup, deleteUserGroup, editUserGroup, getUserGroups} from '../../../network/userGroupRequest';
import {ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {BaseResponse} from '../../../models/common';
import UserGroupEditModal from './childCmp/UserGroupEditModal';
import {PermissionInfo} from '../../../models/permission';
import {getPermissions} from '../../../network/permissionRequest';
import AuthorizeModal from './childCmp/AuthorizeModal';
import RcQueueAnim from 'rc-queue-anim';

interface UserGroupManageProps {

}

const UserGroupManage: React.FunctionComponent<UserGroupManageProps> = () => {
  // 用户组信息
  const [userGroups, setUserGroups] = useState<UserGroupInfo[]>([]);

  // 用户组表单是否可视
  const [isUserGroupVisible, setIsUserGroupVisible] = useState<boolean>(false);

  // 欲编辑的用户组信息
  const [userGroupInfoToEdit, setUserGroupInfoToEdit] = useState<UserGroupInfo | null>(null);

  // 可供分配的权限
  const [permissionToAllocate, setPermissionToAllocate] = useState<PermissionInfo[]>([]);

  // 被选中的用户组
  const [activeUserGroup, setActiveUserGroup] = useState<number | null>(null);

  // 是否开启权限分配modal
  const [isPermissionModalVisible, setIsPermissionModalVisible] = useState<boolean>(false);

  useEffect(() => {
    getUserGroupInfo();
    getPermissionInfo();
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
  const renderOperations = (value: UserGroupInfo) => {
    return (
      <div>
        <Button type={'link'} onClick={() => onEditButtonClick(value)}>
          编辑
        </Button>
        <Button type={'link'} onClick={() => {
          setActiveUserGroup(value.id);
          setIsPermissionModalVisible(true);
        }}>
          授权
        </Button>
        <Button type={'link'} danger onClick={() => onUserGroupDelete(value)}>
          删除
        </Button>
      </div>
    )
  }

  // 删除用户组
  const onUserGroupDelete = (value: UserGroupInfo) => {
    Modal.confirm({
      title: '删除确认',
      icon: <ExclamationCircleOutlined/>,
      content: '您确定要移除这个用户组吗？',
      onOk() {
        deleteUserGroup(value.id)
          .then(() => {
            message.success('移除用户组成功~');
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
          setIsUserGroupVisible(false);
          getUserGroupInfo();
          message.success('创建成功');
        })
        .catch((err: BaseResponse) => {
          message.error(err.message);
        })
    } else {
      // 编辑模式
      editUserGroup(userGroupInfoToEdit.id, res)
        .then(() => {
          setIsUserGroupVisible(false);
          getUserGroupInfo();
          message.success('编辑成功');
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
    setIsUserGroupVisible(true);
  }

  // 编辑对话框被销毁
  const onEditFormDestroy = () => {
    setIsUserGroupVisible(false);
    setUserGroupInfoToEdit(null);
  }

  // 获取可供分配的权限
  const getPermissionInfo = () => {
    getPermissions()
      .then(res => {
        setPermissionToAllocate(res.data);
      })
      .catch(() => {
      })
  }

  return (
    <RcQueueAnim>
      <div key={'user_group'}>
        <Card
          title={'用户组信息'}
          extra={
            <Button
              type={'primary'}
              icon={<PlusOutlined/>}
              onClick={() => {
                setIsUserGroupVisible(true);
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
            visible={isUserGroupVisible}
            onCancel={() => onEditFormDestroy()}/>
          <AuthorizeModal
            onCancel={() => setIsPermissionModalVisible(false)}
            totalPermissions={permissionToAllocate}
            userGroupId={activeUserGroup}
            visible={isPermissionModalVisible}/>
        </Card>
      </div>
    </RcQueueAnim>
  )
}

export default UserGroupManage;