/*
 * File: AllocateUserGroupsModal.tsx
 * Description: 向用户组添加用户的操作对话框
 * Created: 2020-9-6 21:27:42
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, { useContext, useEffect, useState } from 'react'
import { Modal, Transfer } from 'antd'
import { UserGroupInfo } from '../../../../models/UserGroup'
import { TransferItem } from 'antd/es/transfer'
import { UserInfo } from '../../../../models/user'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface AllocateUserGroupsModalProps {
  isVisible: boolean;
  userInfo?: UserInfo;
  totalUserGroups: UserGroupInfo[];
  onCancel: () => void;
  onConfirm: (ids: string[]) => void;
}

const AllocateUserGroupsModal: React.FunctionComponent<AllocateUserGroupsModalProps> = (props) => {
  const [totalUserGroups, setTotalUserGroups] = useState<UserGroupInfo[]>([])

  const [userGroupsKeys, setUserGroupKeys] = useState<string[]>([])

  // local
  const localContext = useContext(LocalContext)

  useEffect(() => {
    setTotalUserGroups(props.totalUserGroups)
    if (props.userInfo) {
      setUserGroupKeys(getUserUserGroupsIds(props.userInfo.userGroups))
    }
  }, [props.totalUserGroups, props.userInfo])


  // 获取用户已有用户组id
  const getUserUserGroupsIds = (info: UserGroupInfo[]) => {
    return info.map(res => {
      return res.id.toString()
    })
  }


  // 渲染左侧内容【即所有可分配的权限】
  const publishTransferLeftData = () => {
    return totalUserGroups.map(res => {
      const item: TransferItem = {
        description: res.description,
        disabled: false,
        key: res.id.toString(),
        title: res.name
      }
      return item
    })
  }

  // 穿梭框内容被改变
  const onTransferChange = (targetKeys: string[]) => {
    setUserGroupKeys(targetKeys)
  }

  return (
    <Modal
      destroyOnClose
      visible={props.isVisible}
      width={800}
      title={localContext.user.allocateGroup}
      onCancel={() => props.onCancel()}
      onOk={() => props.onConfirm(userGroupsKeys)}>
      <Transfer
        listStyle={{
          width: 350,
          height: 300
        }}
        titles={[`${localContext.user.canAllocateUserGroup}`, `${localContext.user.hasAllocate}`]}
        dataSource={publishTransferLeftData()}
        rowKey={data => data.key}
        render={item => (<div>【{item.title}】{item.description}</div>)}
        targetKeys={userGroupsKeys}
        onChange={onTransferChange} />
    </Modal>
  )
}

export default AllocateUserGroupsModal
