import React from "react";
import { Routes, Route } from "react-router-dom"
import  Home  from "./components/base/Home"
import Distance from "./components/distances/Distance"
import StateSelect from "./components/base/StateSelect";
import { GlobalProvider } from "./globalContext";

function App() {
  return (
    <GlobalProvider>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/" element={<StateSelect centerCoordinates={[34.5, -95.5]}/>}/>
      <Route path="/distances" element={<Distance/>}/>
    </Routes>
    </GlobalProvider>
  );
}

export default App;