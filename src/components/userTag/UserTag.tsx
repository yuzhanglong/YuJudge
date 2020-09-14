/*
 * File: UserTag.tsx
 * Description: 用户信息展示组件
 * Created: 2020-8-23 18:37:29
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import {Avatar, Dropdown} from "antd";
import style from "./userTag.module.scss"
import UserTagMenu from "./childCmp/UserTagMenu";

interface UserInfoProps {
  userName?: string;
  avatar?: string;
  description?: string;
  height: number;
  showGotoCms?: boolean;
}

const UserTag: React.FunctionComponent<UserInfoProps> = (props) => {
  return (
    <Dropdown
      overlay={
        <UserTagMenu
          menuHeight={props.height}
          showGotoCms={props.showGotoCms || false}/>
      }
      placement={"bottomCenter"}
      trigger={['click']}>
      <div>
        <div className={style.user_tag_drop_down} style={{height: props.height}}>
          <div className={style.user_tag_avatar_wrap}>
            <Avatar
              size="large"
              src={props.avatar}
              style={{backgroundColor: "#ffffff"}}/>
          </div>
          <div>
            <div className={style.user_tag_user_name}>
              {props.userName}
            </div>
          </div>
        </div>
      </div>
    </Dropdown>
  )
}

UserTag.defaultProps = {
  showGotoCms: false
}

export default UserTag;