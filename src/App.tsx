import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CMSLayout from "./components/layout/CMSLayout";
import ProblemSolve from "./pages/ProblemSolve/ProblemSolve";

function App() {
  return (
    <BrowserRouter>
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
              return (<ProblemSolve {...props}></ProblemSolve>)
          }}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;