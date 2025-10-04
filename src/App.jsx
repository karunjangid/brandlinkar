import { useState } from 'react'
import Splash from './Splash'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import './App.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  if (showSplash) {
    return <Splash onComplete={handleSplashComplete} />
  }

  return (
    <>
      <NavBar />
      <Home />
      <Footer />
    </>
  )
}

export default App
