import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Home } from './components/Home'
import { Savecreate } from './components/Savecreate'
import { Card } from './components/Card'

function App() {

  const [valueCheck, setValueCheck] = useState('')
  const [darkmode, setDarkmode] = useState(true)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              darkmode={darkmode}
              setDarkmode={setDarkmode}
              valueCheck={valueCheck}
              setValueCheck={setValueCheck}
            />
          }
        />

        <Route
          path="/card"
          element={<Card valueCheck={valueCheck} setValueCheck={setValueCheck} darkmode={darkmode} setDarkmode={setDarkmode} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
