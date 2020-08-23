/*
 * File: UserTag.tsx
 * Description: 用户信息展示组件
 * Created: 2020-8-23 18:37:29
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import {Avatar, Dropdown, Menu, message} from "antd";
import {removeToken} from "../../utils/dataPersistence";
import {RouteComponentProps} from "react-router-dom";

interface UserInfoProps {
  userName?: string;
  avater?: string;
  description?: string;
}

const UserTag: React.FunctionComponent<UserInfoProps & RouteComponentProps> = (props) => {
  // 注销标签被单击
  const onLogOut = () => {
    removeToken();
    props.history.replace("/");
    message.success("您已成功退出");
  }

  const menu = (
    <Menu style={{
      width: 200,
      float: "right",
      marginTop: 64
    }}>
      <Menu.Item>
        <div>
          个人信息
        </div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => {
          onLogOut()
        }}>
          注销
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      placement={"bottomCenter"}
      trigger={['click']}>
      <div onClick={() => {
      }}>
        <div style={{
          display: "flex",
          backgroundColor: "#ffffff",
          height: 64,
          width: 150,
          alignItems: "center",
          float: "right",
          cursor: "pointer"
        }}>
          <div style={{
            marginRight: 16
          }}>
            <Avatar
              shape="square"
              size="large"
              src={props.avater}
              style={{
                backgroundColor: "#ffffff"
              }}/>
          </div>
          <div>
            <div style={{
              fontWeight: "bold",
              fontSize: 18
            }}>
              {props.userName}
            </div>
            <div style={{
              fontSize: 13,
              color: "#8c8c8c"
            }}>
              {props.description}
            </div>
          </div>
        </div>
      </div>
    </Dropdown>

  )
}

export default UserTag;