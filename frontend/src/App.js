import "./App.css";
import "./css/common.css";
import React, { useEffect } from "react";

import Top from "./components/top";
import Mid from "./components/mid";
import Bot from "./components/bot";
import Button from "./components/Button";
import Reduxexample from "./components/example";
function App() {
  useEffect(async () => {
    const parameters = { "test parameter": "TESTEST" };
    const raw = await fetch("http://localhost:8030/api/main", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(parameters),
    });
    const data = await raw.json();
    console.log(data);
  }, []);
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
