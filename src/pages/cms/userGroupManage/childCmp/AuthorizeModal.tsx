/*
 * File: AuthorizeModal.tsx
 * Description: 授权对话框
 * Created: 2020-8-23 10:53:11
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useEffect, useState} from 'react';
import {message, Modal, Transfer} from 'antd';
import {PermissionInfo} from '../../../../models/permission';
import {getPermissionByUserGroupId, updateUserGroupPermission} from '../../../../network/permissionRequest';
import {TransferItem} from 'antd/es/transfer';
import {BaseResponse} from '../../../../models/common';

interface AuthorizeModalProps {
  // 所有可供分配的permission
  totalPermissions: PermissionInfo[];
  // 用户组id
  userGroupId: number | null;
  // 是否可见
  visible: boolean;
  // 关闭
  onCancel: () => void;
}

const AuthorizeModal: React.FunctionComponent<AuthorizeModalProps> = (props) => {

  // 所有可供分配权限
  const [totalPermission, setTotalPermissions] = useState<PermissionInfo[]>([]);

  const [userGroupPermissionKeys, setUserGroupPermissionKeys] = useState<string[]>([]);

  useEffect(() => {
    if (props.userGroupId) {
      getPermissionByUserGroupId(props.userGroupId)
        .then(res => {
          initTransferRightData(res.data);
        })
        .catch(() => {
        });
    }
    setTotalPermissions(props.totalPermissions);
  }, [props.totalPermissions, props.userGroupId]);

  // 渲染左侧内容【即所有可分配的权限】
  const publishTransferLeftData = () => {
    return totalPermission.map(res => {
      const item: TransferItem = {
        description: res.description,
        disabled: false,
        key: res.id.toString(),
        title: res.name
      }
      return item;
    })
  }

  // 处理右侧内容
  const initTransferRightData = (permissions: PermissionInfo[]) => {
    let tmp: string[] = [];
    for (let i = 0; i < permissions.length; i++) {
      tmp.push(permissions[i].id.toString());
    }
    setUserGroupPermissionKeys(tmp);
  }

  // 穿梭框内容被改变
  const onTransferChange = (targetKeys: string[]) => {
    setUserGroupPermissionKeys(targetKeys);
  }

  // 发送请求，更新权限
  const updatePermissions = () => {
    if (props.userGroupId) {
      updateUserGroupPermission(props.userGroupId, userGroupPermissionKeys)
        .then(() => {
          message.success('授权成功~');
          props.onCancel();
        })
        .catch((err:BaseResponse) => {
          message.error(err.message);
        });
    }
  }

  return (
    <Modal
      width={800}
      title={'用户组授权'}
      destroyOnClose
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={false}
      onOk={() => updatePermissions()}
    >
      <Transfer
        listStyle={{
          width: 350,
          height: 300,
        }}
        titles={['可供分配的权限', '已有权限']}
        dataSource={publishTransferLeftData()}
        rowKey={data => data.key}
        render={item => (<div>【{item.title}】{item.description}</div>)}
        targetKeys={userGroupPermissionKeys}
        onChange={onTransferChange}/>
    </Modal>
  )
}

export default AuthorizeModal;