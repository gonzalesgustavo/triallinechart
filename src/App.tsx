import React from 'react';
import './App.css';
import LineBar from './components/lineBar';

function App() {
  const start =  {start: '5-21-22', end: '9-25-27'}
  return (
    <div className="App">
      <LineBar init={start} from={2021}/>
    </div>
  );
}

export default App;
