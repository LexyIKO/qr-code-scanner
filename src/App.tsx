import React from 'react';
import './App.sass';

import Header from "./components/header/Header";
import MainContent from "./components/main_body/MainContent";

function App() {
      return (
            <div className="App">
                <Header />
                <MainContent />
            </div>
      );
}

export default App;
