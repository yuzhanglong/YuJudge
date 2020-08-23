/*
 * File: userInfo.ts
 * Description: 用户相关的自定义hooks
 * Created: 2020-8-24 01:32:19
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import {useEffect, useState} from "react";
import {UserInfo} from "../models/user";
import {clearStorage, getUserInfoFromStorage} from "../utils/dataPersistence";

export const UserInfoState = () => {
  useEffect(() => {
    setUserInfo(getUserInfoFromStorage());
  }, []);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // 移除用户
  const removeUserInfo = () => {
    clearStorage();
  }

  return {
    userInfo,
    removeUserInfo
  }
}