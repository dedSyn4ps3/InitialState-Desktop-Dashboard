import * as React from 'react';
import MainRouter from './MainRouter'
import { HashRouter } from 'react-router-dom'

const App = () => {

  return (
    <div className="App">
      <HashRouter>
        <MainRouter />
      </HashRouter>
    </div>
  );
}

export default App;
