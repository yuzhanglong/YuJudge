/*
 * File: Profile.tsx
 * Description: 个人中心首页
 * Created: 2020-8-24 14:03:43
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Card} from "antd";
import UserCard from "../../../components/userCard/UserCard";
import {UserInfoState} from "../../../hooks/userInfo";
import style from "./profile.module.scss"

interface profileProps {

}

const Profile: React.FunctionComponent<profileProps> = () => {

  const userInfoState = UserInfoState();

  return (
    <div title={"个人中心"} className={style.profile}>
      <Card className={style.profile_content}>
        {
          userInfoState.userInfo &&
          <UserCard userInfo={userInfoState.userInfo}/>
        }
      </Card>
    </div>
  )
}

export default Profile;