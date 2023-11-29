import React from "react";
import { Routes, Route } from "react-router-dom"
import  Home  from "./components/base/Home"
import Distance from "./components/base/DistanceMeasures"
import StateSelect from "./components/base/StateSelect";
import { GlobalProvider } from "./globalContext";

function App() {
  const usMapCoordinates: Array<number> = [34.5, -95.5];
  
  return (
    <GlobalProvider>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/" element={<StateSelect centerCoordinates={usMapCoordinates}/>}/>
      <Route path="/distances" element={<Distance/>}/>
    </Routes>
    </GlobalProvider>
  );
}

export default App;