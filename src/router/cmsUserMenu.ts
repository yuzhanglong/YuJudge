/*
 * File: cmsUserMenu.ts
 * Description: cms用户相关路由表
 * Created: 2020-08-16 16:48:10
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {MenuRouterConfig} from './config';

export const CMS_USERS_MENU: MenuRouterConfig = {
  key: '/cms/users',
  title: '用户&用户组',
  path: '/cms/users',
  icon: 'UserOutlined',
  isShowInMenu: true,
  children: [
    {
      key: '/cms/users/user_manage',
      component: 'UserManage',
      title: '用户管理',
      path: '/cms/users/user_manage',
      isShowInMenu: true
    },
    {
      key: '/cms/users/user_group_manage',
      component: 'UserGroupManage',
      title: '用户组管理',
      path: '/cms/users/user_group_manage',
      isShowInMenu: true
    },
  ]
};