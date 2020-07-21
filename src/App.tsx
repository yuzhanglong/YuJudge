import React from 'react';
import {BrowserRouter} from "react-router-dom";
import CMSLayout from "./components/layout/CMSLayout";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CMSLayout></CMSLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;