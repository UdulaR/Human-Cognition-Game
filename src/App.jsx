import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Home } from './components/Home'
import { Card } from './components/Card'
import { Gameboard } from './components/Gameboard'

import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState("home");
  const [settings, setSettings] = useState(null);

  const startGame = (selectedSettings) =>{
    setSettings(selectedSettings);
    setPage("game")
  }

  return (
    <>
      {page === "home" && (<Home onStart={startGame} />)}
      {page === "game" && (<Gameboard settings={settings} onBackHome={() => setPage("home")}
/>)}
    </>
  )
}

export default App
