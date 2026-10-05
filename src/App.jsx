import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Home } from './components/Home'
import { Savecreate } from './components/Savecreate'

function App() {

  
  const [darkmode, setDarkmode] = useState(false)

  return (
    <div>
      <Home darkmode={darkmode} setDarkmode={setDarkmode}/>
      
    </div>
  )
}

export default App
