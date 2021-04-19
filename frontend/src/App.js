import "./App.css";
import "./css/common.css";
import React from "react";

import Top from "./components/top";
import Mid from "./components/mid";
import Bot from "./components/bot";
import Button from "./components/Button";
import Reduxexample from "./components/example";
function App() {
  return (
    <div className="App">
      <Top></Top>
      <Mid></Mid>
      <Bot></Bot>
      <Button></Button>
      {/* <Reduxexample></Reduxexample> */}
    </div>
  );
}

export default App;
