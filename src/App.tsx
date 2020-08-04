import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CMSLayout from "./components/layout/CMSLayout";
import ProblemHome from "./pages/problemHome/ProblemHome";
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Landing from "./pages/landing/Landing";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <div className="App">
          <Switch>
            <Route
              key={"435345"}
              path={"/cms"}
              exact>
              {"cms"}
              <CMSLayout></CMSLayout>
            </Route>
            <Route
              key={"problem"}
              path={"/problem/:id"}
              exact
              render={(props) => {
                return (<ProblemHome {...props}></ProblemHome>)
              }}/>
            <Route
              key={"login"}
              path={"/login"}
              exact
              render={(props) => {
                return (<Login {...props}></Login>)
              }}/>
            <Route
              key={"register"}
              path={"/register"}
              exact
              render={(props) => {
                return (<Register {...props}></Register>)
              }}/>
            <Route
              key={"landing"}
              path={"/"}
              exact
              render={(props) => {
                return (<Landing {...props}></Landing>)
              }}/>
          </Switch>
        </div>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;