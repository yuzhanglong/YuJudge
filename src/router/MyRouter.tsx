/*
 * File: MyRouter.tsx
 * Created: 2020-7-19 18:40:17
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 *
 * Description:
 * 这是路由模板的生成配置
 * 在这里，我们通过遍历config.ts中的routerConfig来生成、渲染路由组件
 * 路由分为两种 第一种是CMS的路由 第二种是一般路由
 *
 */

import React from 'react';
import routerConfig, {MenuRouterConfig} from './config';
import AllComponents from '../pages';
import {Redirect, Route, Switch} from 'react-router-dom';
import CMSLayout from '../layout/cms/CMSLayout';


interface MyRouterProps {

}

const MyRouter: React.FunctionComponent<MyRouterProps> = () => {

  // 通过路由配置来 生成侧边栏路由
  const generateMenus = (base: MenuRouterConfig) => {

    // 单个路由
    const route = (r: MenuRouterConfig) => {
      const Component = r.component && AllComponents[r.component];
      return (
        <Route
          key={r.path}
          exact={r.children == null}
          path={r.path}
          render={(props) => {
            return r.children ? (
              <Component {...props} children={subRoute(r)}/>) : (<Component {...props}/>)
          }}/>
      );
    }

    // 对于有孩子的二级路由，我们采用递归的方式
    const subRoute = (r: MenuRouterConfig) => {
      return r.children && r.children.map(subMenu => {
        return route(subMenu);
      })
    }

    return base.component ? route(base) : subRoute(base);
  }

  // 生成路由
  const createRoute: any = (key: string) => {
    return routerConfig[key].map(generateMenus);
  }

  // 根据key来渲染路由组件
  const createRouteByKey = (key: 'menus' | 'common') => {
    return createRoute(key);
  }

  // render
  return (
    <Switch>
      {createRouteByKey('common')}
      <Route
        key={'cms'}
        path={'/cms'}
        render={(props: any) => {
          return (
            <CMSLayout
              {...props}
              children={
                <div>
                  {createRouteByKey('menus')}
                </div>
              }/>
          )
        }}/>
      <Route render={() => <Redirect to="/result/404"/>}/>
    </Switch>
  );
}

export default MyRouter;