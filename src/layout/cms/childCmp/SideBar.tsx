import { MenuRouterConfig } from '../../../router/config'
import { Menu } from 'antd'
import React, { useContext } from 'react'
import { MenuProps } from 'antd/lib/menu'
import { Link } from 'react-router-dom'
import AllComponents from '../../../pages'
import { LocalContext } from '../../../components/localContext/LocalContext'
import { getValue } from '../../../utils/getValue'


interface SideBarProps extends MenuProps {
  menus: any;
}

const SideBar: React.FC<SideBarProps> = (props) => {
  const {
    menus,
    ...otherProps
  } = props

  const renderMenuItems = (item: MenuRouterConfig[]) => {
    return (
      item.map(menuItem => {
        return menuItem.isShowInMenu ? (
          <Menu.Item key={menuItem.key}>
            <Link to={menuItem.path}>
              <span className='nav-text'>{getValue(localContext, menuItem.title)}</span>
            </Link>
          </Menu.Item>
        ) : null
      })
    )
  }

  // local
  const localContext = useContext(LocalContext)


  //TODO:对路由地址末尾query的处理
  const renderSideBarSubMenus = (item: MenuRouterConfig[]) => {
    return (
      item.map((subMenu: MenuRouterConfig) => {
        const MenuIcon = subMenu.icon && AllComponents[subMenu.icon]
        if (!subMenu.isShowInMenu) {
          return null
        }
        if (subMenu.children && subMenu.children.length > 0) {
          return (
            <Menu.SubMenu
              title={getValue(localContext, subMenu.title)}
              key={subMenu.key}
              icon={subMenu.icon ? <MenuIcon /> : null}>
              {renderMenuItems(subMenu.children || [])}
            </Menu.SubMenu>
          )
        } else {
          return (
            <Menu.Item title={subMenu.title} key={subMenu.key} icon={subMenu.icon ? <MenuIcon /> : null}>
              <Link to={subMenu.path}>
                <span className='nav-text'>{getValue(localContext, subMenu.title)}</span>
              </Link>
            </Menu.Item>
          )
        }
      })
    )
  }

  return (
    <Menu {...otherProps}>
      {renderSideBarSubMenus(menus)}
    </Menu>
  )
}

export default SideBar
