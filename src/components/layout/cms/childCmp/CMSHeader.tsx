/*
 * File: CMSHeader.tsx
 * Description: 项目布局结构的头部bufen
 * Created: 2020-08-08 19:28:19
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import UserTag from "../../../userTag/UserTag";
import {RouteComponentProps} from "react-router-dom";
import {UserInfoState} from "../../../../hooks/userInfo";


interface HeaderProps {

}

const CMSHeader: React.FunctionComponent<HeaderProps & RouteComponentProps> = (props) => {
  const userInfoState = UserInfoState();

  return (
    <div className="site-layout-header">
      <UserTag
        {...props}
        height={64}
        avater={userInfoState.userInfo?.avatar}
        userName={userInfoState.userInfo?.nickname}
        description={userInfoState.userInfo?.userGroups ? userInfoState.userInfo?.userGroups[0].description : ""}/>
    </div>
  )
}

export default CMSHeader;