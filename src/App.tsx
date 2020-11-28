/*
 * File: App.tsx
 * Description: 项目入口
 * Created: 2020-08-05 11:53:29
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {Suspense} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd";
import MyRouter from "./router/MyRouter";
import {Provider} from "react-redux";
import store from "./store"

const App: React.FunctionComponent<RouteComponentProps> = (props) => {
  // 挂载全局路由
  window.reactRouter = props.history;
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Provider store={store}>
          <Suspense fallback={null}>
            <MyRouter></MyRouter>
          </Suspense>
        </Provider>
      </div>
    </ConfigProvider>
  );
}

export default withRouter(App);
