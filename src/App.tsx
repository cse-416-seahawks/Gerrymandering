import React from 'react';
import './App.css';
import StateMap from './components/StateMap';
import StateSelection from './components/StateSelection'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='map'>
          <StateMap/>
        </div>
        <div className="state-selection">
          <StateSelection/>
        </div>
      </header>
    </div>
  );
}

export default App;
