import React from "react";
import "./App.css";
import StateMap from "./components/StateMap";
import Sidebar from "./components/Navbar";
import AppHeader from "./components/AppHeader"
import {BrowserRouter as Router} from 'react-router-dom'
import TableData from "./components/TableData";


function App() {
  const [selectedState, setSelectedState] = React.useState('Nevada');

  const handleStateChange=(state:string)=>{
    setSelectedState(state);
  }


  return (
    <div className="App">
      <div className="App-content">
      <Router>
      <Sidebar />
      <div className="StateMap-Content">
      <AppHeader/>
      <header className="StateMap-header">
          <div className="State-map">
            <StateMap selectedState={selectedState}/>
          </div>
          {/* <div className="State-map stack-top">
            <StateSelection onStateSelect={handleStateChange}/>
          </div> */}
      </header>
      </div>
      <TableData/>
      </Router>
      </div>
    </div>
  );
}

export default App;