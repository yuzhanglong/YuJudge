/*
 * File: WithBreadCrump.tsx
 * Description: 带有面包屑导航的高阶组件
 * Created: 2020-08-05 12:37:57
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {MenuRouterConfig} from "../../../../router/config";


const WithRouteConfig = (
  routeConfig: MenuRouterConfig
) => (Component: any) => {
  return (
    <Component/>
  );
};

export default WithRouteConfig;