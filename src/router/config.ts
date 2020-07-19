/*
 * File: config.ts
 * Description: 全局路由配置
 * Created: 2020-7-19 18:00
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


/**
 * @author yuzhanglong
 * @description CMS后台使用，将路由和侧边栏关联
 * @date 2020-7-19 22:00
 */
export interface MenuRouterConfig {
  path: string;
  title: string;
  icon?: string;
  component?: string;
  query?: string;
  isAuthRequired?: boolean;
}


/**
 * @author yuzhanglong
 * @description 一般路由配置
 * @date 2020-7-19 22:00
 */
export interface CommonRouterConfig extends MenuRouterConfig {

}

// 路由配置
const routerConfig: {
  menus: MenuRouterConfig[] | [],
  common: CommonRouterConfig[] | [],
  [index: string]: any;
} = {
  menus: [
    {
      component: "ProblemManage",
      title: "题目管理",
      path: "/problems_manage"
    },
    {
      component: "UserManage",
      title: "用户管理",
      path: "/user_manage"
    }
  ],
  common: []
}

export default routerConfig;