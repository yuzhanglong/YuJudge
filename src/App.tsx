import React from 'react';
import MyRouter from "./router";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyRouter></MyRouter>
      </div>
    </BrowserRouter>
  );
}

export default App;