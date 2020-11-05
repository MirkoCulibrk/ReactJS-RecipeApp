import React from 'react';
import Main from './components/Main';
import './App.scss';
import { GlobalProvider } from './components/Logic/GlobalState';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <GlobalProvider>
      <div className="font-body lg:flex">
        <Main />
      </div>
    </GlobalProvider>
  );
}

export default App;
