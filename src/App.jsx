import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Splash from './Splash'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Team from './pages/Team'
import Partners from './pages/Partners'
import Contact from './pages/Contact'
import InfluencerRegistration from './pages/InfluencerRegistration'
import BrandRegistration from './pages/BrandRegistration'
import SubmissionSuccess from './pages/SubmissionSuccess'
import './App.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  if (showSplash) {
    return <Splash onComplete={handleSplashComplete} />
  }

  return (
    <Router>
      <NavBar setShowRegistrationModal={setShowRegistrationModal} />
      <Routes>
        <Route path="/" element={<Home showRegistrationModal={showRegistrationModal} setShowRegistrationModal={setShowRegistrationModal} />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/team" element={<Team />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/influencer-registration" element={<InfluencerRegistration />} />
        <Route path="/brand-registration" element={<BrandRegistration />} />
        <Route path="/submission-success" element={<SubmissionSuccess />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
