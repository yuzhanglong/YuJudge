import {MenuRouterConfig} from "../../../router/config";
import {Menu} from "antd";
import React from "react";
import {MenuProps} from "antd/lib/menu";
import SubMenu from "antd/lib/menu/SubMenu";
import {Link} from "react-router-dom";
import AllComponents from "../../../pages";


const renderMenuItems = (item: MenuRouterConfig[]) => {
  return (
    item.map(menuItem => {
      return menuItem.isShowInMenu ? (
        <Menu.Item key={menuItem.key}>
          <Link to={menuItem.path}>
            <span className="nav-text">{menuItem.title}</span>
          </Link>
        </Menu.Item>
      ) : null
    })
  )
}


//TODO:对路由地址末尾query的处理
const renderSideBarSubMenus = (item: MenuRouterConfig[]) => {
  return (
    item.map((subMenu: MenuRouterConfig) => {
      const MenuIcon = subMenu.icon && AllComponents[subMenu.icon];
      if (!subMenu.isShowInMenu) {
        return null;
      }
      if (subMenu.children && subMenu.children.length > 0) {
        return (
          <SubMenu title={subMenu.title} key={subMenu.key} icon={subMenu.icon ? <MenuIcon/> : null}>
            {renderMenuItems(subMenu.children || [])}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item title={subMenu.title} key={subMenu.key} icon={subMenu.icon ? <MenuIcon/> : null}>
            <Link to={subMenu.path}>
              <span className="nav-text">{subMenu.title}</span>
            </Link>
          </Menu.Item>
        )
      }
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