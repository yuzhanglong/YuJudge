/*
 * File: userInfo.ts
 * Description: 用户相关的自定义hooks
 * Created: 2020-8-24 01:32:19
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import {useEffect, useState} from 'react';
import {UserInfo} from '../models/user';
import {clearStorage, getUserInfoFromStorage, saveUserInfo} from '../utils/dataPersistence';
import {getUserInfo} from '../network/userRequest';

export const UserInfoState = () => {
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // 获取用户信息
  const fetchUserInfo = () => {
    const data = getUserInfoFromStorage();
    setUserInfo(data);
  }

  // 移除用户
  const removeUserInfo = () => {
    clearStorage();
  }

  // 重置用户
  const resetUserInfo = () => {
    clearStorage();
    getUserInfo().then(res => {
      saveUserInfo(res.data);
      fetchUserInfo();
    })
  }

  // 判断是否一般用户
  const isCommonUser = () => {
    if (userInfo) {
      for (let i = 0; i < userInfo.userGroups.length; i++) {
        if (userInfo.userGroups[i].name === 'COMMON') {
          return true;
        }
      }
    }
    return false;
  }

  return {
    userInfo,
    removeUserInfo,
    resetUserInfo,
    isCommonUser
  }
}