import React from 'react';
import './App.css';
import DataContainer from './components/DataContainer';


const App: React.FC = () => {
    
  return (
    <div className="App">
      <a href="https://github.com/dvas0004/tallinn-transport-gps"> About </a>
      <DataContainer />
    </div>
  );
}

export default App;
