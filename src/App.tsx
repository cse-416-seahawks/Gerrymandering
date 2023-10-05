import React from "react";
import { Routes, Route } from "react-router-dom"
import  Home  from "./components/Home"
import Distance from "./components/Distance"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/distances" element={<Distance/>}/>
    </Routes>
  );
}

export default App;