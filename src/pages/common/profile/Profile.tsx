/*
 * File: Profile.tsx
 * Description: 个人中心首页
 * Created: 2020-8-24 14:03:43
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Card, Empty} from "antd";

interface profileProps {

}
const Profile: React.FunctionComponent<profileProps> = () => {
  return (
    <Card title={"个人中心"}>
      <Empty description={"个人中心开发中..."}/>
    </Card>
  )
}

export default Profile;