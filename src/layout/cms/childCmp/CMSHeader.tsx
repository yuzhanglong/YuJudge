/*
 * File: CMSHeader.tsx
 * Description: 项目布局结构的头部部分
 * Created: 2020-08-08 19:28:19
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react';
import UserTag from '../../../components/userTag/UserTag';
import {RouteComponentProps} from 'react-router-dom';
import {UserInfoState} from '../../../hooks/userInfo';
import {UserInfo} from '../../../models/user';
import style from '../../layout.module.scss';


interface HeaderProps {
  userInfo?: UserInfo;
}

const CMSHeader: React.FunctionComponent<HeaderProps & RouteComponentProps> = (props) => {
  const userInfoState = UserInfoState();

  return (
    <div className={style.cms_header}>
      <UserTag
        {...props}
        height={64}
        showGotoCms={false}
        avatar={props.userInfo?.avatar}
        userName={props.userInfo?.nickname}
        description={props.userInfo?.userGroups ? userInfoState.userInfo?.userGroups[0].description : ''}/>
    </div>
  )
}

export default CMSHeader;