/*
 * File: index.tsx
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
import React from "react";
import routerConfig, {MenuRouterConfig} from "./config";
import AllComponents from '../pages';
import {Redirect, Route, Switch} from "react-router-dom";


interface MyRouterProps {

}

const MyRouter: React.FunctionComponent<MyRouterProps> = () => {


  // methods
  const generateMenus = (base: MenuRouterConfig) => {
    const route = (r: MenuRouterConfig) => {
      const Component = r.component && AllComponents[r.component];
      return (
        <Route
          key={r.path}
          exact
          path={r.path}
          render={(props) => {
            return (<Component {...props} />)
          }}/>
      );
    }

    const subRoute = (r: MenuRouterConfig) => {
      return r.children && r.children.map(subMenu => {
        return route(subMenu);
      })
    }
    return base.component ? route(base) : subRoute(base);
  }

  const createRoute: any = (key: string) => {
    return routerConfig[key].map(generateMenus);
  }

  // data
  const res = Object.keys(routerConfig).map((key) => {
    return createRoute(key);
  });

  // render
  return (
    <Switch>
      {res}
      <Route render={() => <Redirect to="/404"/>}/>
    </Switch>
  );
}

export default MyRouter;