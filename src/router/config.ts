/*
 * File: config.ts
 * Description: 全局路由配置
 * Created: 2020-7-19 18:00
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


// cms目录菜单路由配置
export interface MenuRouterConfig {
  key: string;
  path: string;
  title: string;
  icon?: string;
  component?: string;
  query?: string;
  isAuthRequired?: boolean;
  children?: MenuRouterConfig[];
}


// 一般页面路由配置
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
      key: "/cms/dashboard",
      component: "Dashboard",
      title: "控制台",
      path: "/cms/dashboard",
    },
    {
      key: "/cms/problem_manage",
      title: "题目&题目集",
      path: "/cms/problem_manage",
      children: [
        {
          key: "/cms/problem_manage/problems",
          component: "ProblemManage",
          title: "题目管理",
          path: "/cms/problem_manage",
        },
        {
          key: "/cms/problem_manage/problem_sets",
          component: "ProblemSetManage",
          title: "题目集管理",
          path: "/cms/problem_manage/problem_sets",
        },
        {
          key: "/cms/problem_manage/problems/edit",
          component: "ProblemEdit",
          title: "题目编辑",
          path: "/cms/problem_manage/problems/edit/:id",
        }
      ]
    }
  ],
  common: [
    {
      key: "/landing",
      component: "Landing",
      title: "用户登录",
      path: "/",
    },
    {
      key: "/login",
      component: "Login",
      title: "用户登录",
      path: "/login",
    },
    {
      key: "/problem/:id",
      component: "ProblemHome",
      title: "问题首页",
      path: "/problem/:id",
    },
  ]
}

export default routerConfig;