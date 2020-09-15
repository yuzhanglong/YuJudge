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
import style from "./userCard.module.scss"

interface userCardProps {
  userInfo: UserInfo;
  height?: any;
}

const UserCard: React.FunctionComponent<userCardProps> = (props) => {
  return (
    <Card className={style.user_card}>
      <div className={style.user_card_body}>
        <Avatar src={props.userInfo.avatar} className={style.user_avatar}/>
        <div className={style.user_nickname}>
          {props.userInfo.nickname}
        </div>

        <div className={style.user_group}>
          {props.userInfo.userGroups[0].description}
        </div>
        <div className={style.user_card_count}>
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
          <Row justify={"space-between"}>
            <div>
              通过率
            </div>
            <div>
              {
                props.userInfo.submissionAmount ?
                  ((props.userInfo.acAmount / props.userInfo.submissionAmount) * 100).toFixed(2) : 0
              } %
            </div>
          </Row>
        </div>
      </div>
    </Card>
  )
}

export default UserCard;