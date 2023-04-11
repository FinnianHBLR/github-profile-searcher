import './App.css';
import { useState, useEffect } from 'react'
import { Header } from './components/Header';
import { SearchLogic } from './components/Search/SearchLogic';

// Theme logic
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes"

function App() {
  const [theme, setTheme] = useState('light');

  // Instead of using setTheme to change the theme, SetMode is called which sets it in local storange and the state -> https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/
  const setMode = mode => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  };

  // Toggle theme between light and dark. <ThemeProvider /> switches between lightTheme || darkTheme.
  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light')
  };

  // Onload if local theme is there, setTheme to localTheme
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme)
  }, []);

  // ThemeProvider passes the theme lightTheme or darkTheme to its children.
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div>
        <button className='themeSetterBtn' onClick={themeToggler}>Switch Theme</button>
        <Header />
        <SearchLogic />
      </div>
    </ThemeProvider>
  )
}


export default App;