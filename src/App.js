import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react'
import { Header } from './components/Header';
import { SliderDisplay } from './components/Slider';
import { SearchLogic } from './components/Search/SearchLogic';

function App() {
  // Started 10:00AM 10/04/2023 all basic features finished at 1:00PM 10/04/2023
  // Theme state, passed to all components that need to change their theme. This could be improved with something like higher-order Components.
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <Header darkMode={darkMode} />
      <SliderDisplay darkMode={darkMode} setDarkMode={setDarkMode} />
      <SearchLogic darkMode={darkMode} />
    </div>
  )
}


export default App;
