/*
 * File: UserCard.tsx
 * Description: 首页的用户卡片
 * Created: 2020-8-24 15:01:52
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Avatar, Card, Row} from "antd";
import {UserInfo} from "../../models/user";

interface userCardProps {
  userInfo: UserInfo;
  height?: any;
}

const UserCard: React.FunctionComponent<userCardProps> = (props) => {
  return (
    <Card
      style={{
        width: 250,
        height: props.height
      }}
      bodyStyle={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Avatar src={props.userInfo.avatar} style={{
        width: 90,
        height: 90
      }}/>

      <div style={{
        fontSize: 28,
        fontWeight: "bold"
      }}>
        {props.userInfo.nickname}
      </div>

      <div style={{
        fontSize: 14,
        color: "#8c8c8c"
      }}>
        {props.userInfo.userGroups[0].description}
      </div>
      <div style={{
        width: 190,
        marginTop: 30,
        fontWeight: "bold"
      }}>
        <Row justify={"space-between"}>
          <div>
            提交数目
          </div>
          <div>
            {props.userInfo.submissionAmount}
          </div>
        </Row>
        <Row justify={"space-between"}>
          <div>
            AC数目
          </div>
          <div>
            {props.userInfo.acAmount}
          </div>
        </Row>
      </div>
    </Card>
  )
}

export default UserCard;