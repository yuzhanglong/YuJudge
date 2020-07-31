import {MenuRouterConfig} from "../../router/config";
import {Menu} from "antd";
import React from "react";
import {MenuProps} from "antd/lib/menu";
import SubMenu from "antd/lib/menu/SubMenu";
import {Link} from "react-router-dom";


const renderMenuItems = (item: MenuRouterConfig[]) => {
  return (
    item.map(menuItem => {
      return (
        <Menu.Item key={menuItem.key}>
          <Link to={menuItem.path}>
            <span className="nav-text">{menuItem.title}</span>
          </Link>
        </Menu.Item>
      )
    })
  )
}


//TODO:对路由地址末尾query的处理
const renderSideBarSubMenus = (item: MenuRouterConfig[]) => {
  return (
    item.map(subMenu => {
      return (
        <SubMenu title={subMenu.title} key={subMenu.key}>
          {renderMenuItems(subMenu.children || [])}
        </SubMenu>
      )
    })
  );
}


interface SideBarProps extends MenuProps {
  menus: any;
}

const SideBar: React.FunctionComponent<SideBarProps> = (props) => {
  const {
    menus,
    ...otherProps
  } = props;

  return (
    <Menu {...otherProps}>
      {renderSideBarSubMenus(menus)}
    </Menu>
  )
}

export default SideBar