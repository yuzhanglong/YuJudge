/*
 * File: CMSHeader.tsx
 * Description: 项目布局结构的头部bufen
 * Created: 2020-08-08 19:28:19
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import UserTag from "../../../userTag/UserTag";
import {UserInfo} from "../../../../models/user";
import {RouteComponentProps} from "react-router-dom";


interface HeaderProps {
  userInfo: UserInfo | null;
}

const CMSHeader: React.FunctionComponent<HeaderProps & RouteComponentProps> = (props) => {
  return (
    <div className="site-layout-header">
      <UserTag
        {...props}
        avater={props.userInfo?.avatar}
        userName={props.userInfo?.nickname}
        description={props.userInfo?.userGroups ? props.userInfo?.userGroups[0].description : ""}/>
    </div>
  )
}

export default CMSHeader;