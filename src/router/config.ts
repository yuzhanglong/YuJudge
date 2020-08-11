/*
 * File: config.ts
 * Description: 全局路由配置
 * Created: 2020-7-19 18:00
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


// cms目录菜单路由配置
import {CMS_MENUS} from "./cmsMenu";
import {COMMON_MENUS} from "./commonMenu";

// 目录路由配置
export interface MenuRouterConfig {
  key: string;
  path: string;
  title: string;
  icon?: string;
  component?: string;
  query?: string;
  isAuthRequired?: boolean;
  children?: MenuRouterConfig[];
  isShowInMenu?: boolean;
}


// 一般页面路由配置
export interface CommonRouterConfig extends MenuRouterConfig {

}

// 路由配置
const routerConfig: {
  menus: MenuRouterConfig[],
  common: CommonRouterConfig[],
  [index: string]: any;
} = {
  menus: [
    ...CMS_MENUS
  ],
  common: [
    ...COMMON_MENUS
  ]
}

export default routerConfig;