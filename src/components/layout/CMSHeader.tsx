/*
 * File: CMSHeader.tsx
 * Description: 项目布局结构的头部bufen
 * Created: 2020-08-08 19:28:19
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {BellTwoTone, UserOutlined} from "@ant-design/icons/lib";
import {SettingTwoTone} from "@ant-design/icons/lib";
import {Avatar, Layout} from "antd";

interface HeaderProps {

}

const CMSHeader: React.FunctionComponent<HeaderProps> = (props) => {
  return (
    <Layout.Header className="site-layout-header">
      <div className={"site-layout-header-content"}>
        <div className={"header-operaion-icon-wrap"}>
          <BellTwoTone/>
        </div>
        <div className={"header-operaion-icon-wrap"}>
          <SettingTwoTone/>
        </div>
        <div className={"header-operaion-user-wrap"}>
          <Avatar shape="square" size="large" icon={<UserOutlined/>}/>
        </div>
      </div>
    </Layout.Header>
  )
}

export default CMSHeader;