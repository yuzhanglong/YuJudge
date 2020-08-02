import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CMSLayout from "./components/layout/CMSLayout";
import ProblemHome from "./pages/ProblemHome/ProblemHome";
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd";

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
          </Switch>
        </div>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;