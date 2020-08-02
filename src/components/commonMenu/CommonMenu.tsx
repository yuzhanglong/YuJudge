/*
 * File: CommonMenu.tsx
 * Description: 一般页面的目录组件
 * Created: 2020-8-2 9:56
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Menu} from "antd";

interface CommonMenuProps{

}

const CommonMenu:React.FunctionComponent<CommonMenuProps> = () => {
  return (
    <div>
      <Menu mode="horizontal" theme={"dark"}>
        <Menu.Item key="1">
          首页
        </Menu.Item>
        <Menu.Item key="2">
          标签1
        </Menu.Item>
        <Menu.Item key="3">
          标签2
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default CommonMenu;