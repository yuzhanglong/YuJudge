/*
 * File: permissionRequest.ts
 * Description: 权限相关请求封装
 * Created: 2020-8-23 11:30:48
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import request from "./request";
import {getTokenFromStorage} from "../utils/dataPersistence";


// 获取可以分配的权限
export const getPermissions = () => {
  return request.get(
    "/permission/get_permissions"
  )
}


// 通过用户组id寻找权限
export const getPermissionByUserGroupId = (userGroupId: number) => {
  return request.get(
    "/permission/get_permission_by_user_group/" + userGroupId
  )
}

// 更新用户组权限
export const updateUserGroupPermission = (userGroupId: number, permissions: string[]) => {
  return request.put(
    "/permission/edit_user_group_permission/" + userGroupId,
    {
      permissions: permissions
    }
  )
}