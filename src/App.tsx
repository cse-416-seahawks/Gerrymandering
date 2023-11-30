import React from "react";
import { Routes, Route } from "react-router-dom"
import  Home  from "./components/base/Home"
import DistanceMeasures from "./components/base/DistanceMeasures"
import StateSelect from "./components/base/StateSelect";
import { GlobalProvider } from "./globalContext";

function App() {
  const usMapCoordinates: Array<number> = [34.5, -95.5];
  const usMapZoom: number = 5;
  
  return (
    <GlobalProvider>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/" element={<StateSelect centerCoordinates={usMapCoordinates} zoom={usMapZoom}/>}/>
      <Route path="/distances" element={<DistanceMeasures/>}/>
    </Routes>
    </GlobalProvider>
  );
}

export default App;