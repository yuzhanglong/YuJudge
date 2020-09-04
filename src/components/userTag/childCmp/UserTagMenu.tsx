/*
 * File: UserTagMenu.tsx
 * Description: 用户标签目录
 * Created: 2020-8-31 13:42:46
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import style from "../userTag.module.scss";
import {Menu, message} from "antd";
import {clearStorage} from "../../../utils/dataPersistence";

interface UserTagMenuProps {
  menuHeight: number;
  showGotoCms: boolean;
}

const UserTagMenu: React.FunctionComponent<UserTagMenuProps> = (props) => {

  // 注销标签被单击
  const onLogOut = () => {
    clearStorage();
    window.reactRouter.replace("/");
    message.success("您已成功退出");
  }

  // 个人信息标签被单击
  const onSeeProfile = () => {
    window.reactRouter.push("/common/profile");
  }

  // 前往后台
  const gotoCms = () => {
    window.reactRouter.push("/cms");
  }

  return (
    <Menu className={style.user_tag_drop_down_menu} style={{marginTop: props.menuHeight}}>
      <Menu.Item>
        <div onClick={() => onSeeProfile()}>
          个人信息
        </div>
      </Menu.Item>
      {
        props.showGotoCms &&
        <Menu.Item>
          <div onClick={() => gotoCms()}>
            后台管理
          </div>
        </Menu.Item>
      }
      <Menu.Item>
        <div onClick={() => onLogOut()}>
          注销
        </div>
      </Menu.Item>
    </Menu>
  )
}

export default UserTagMenu;