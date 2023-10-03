import React from "react";
import "./App.css";
import StateMap from "./components/StateMap";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router} from 'react-router-dom'
import TableData from "./components/TableData";
import DistrictInfoCard from "./components/DistrictInfoCard";


function App() {
  const [selectedState, setSelectedState] = React.useState('Nevada');

  const handleStateChange=(state:string)=>{
    setSelectedState(state);
  }

  

  return (
    <div className="App">
      <div className="App-content">
      <Router>
      <Navbar />
      <div className="StateMap-content">
        <header className="StateMap-header">
            <div className="State-map">
            <StateMap selectedState={selectedState}/>
            {/* <DistrictInfoCard/> */}
            </div>
            {/* <div className="State-map stack-top">
              <StateSelection onStateSelect={handleStateChange}/>
            </div> */}
            <TableData/>
        </header>
          
      </div>
      </Router>
      </div>
    </div>
  );
}

export default App;