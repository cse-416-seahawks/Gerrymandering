import React from "react";
import { Routes, Route } from "react-router-dom"
import  Home  from "./components/base/Home"
import Distance from "./components/distances/Distance"
import StateSelect from "./components/base/StateSelect";

function App() {
  return (
    <Routes>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/" element={<StateSelect centerCoordinates={[34.5, -95.5]}/>}/>
      <Route path="/distances" element={<Distance/>}/>
    </Routes>
  );
}

export default App;