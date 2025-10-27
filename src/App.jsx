import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Splash from './Splash'
import Home from './pages/Home'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Team from './pages/Team'
import Partners from './pages/Partners'
import Contact from './pages/Contact'
import InfluencerRegistration from './pages/InfluencerRegistration'
import BrandRegistration from './pages/BrandRegistration'
import BrandRegistrationForm from './pages/BrandRegistrationForm'
import SubmissionSuccess from './pages/SubmissionSuccess'
import InfluencerDashboard from './pages/InfluencerDashboard'
import BrandDashboard from './pages/BrandDashboard'
import AdminPanel from './pages/AdminPanel'
import AdminRegistration from './pages/AdminRegistration'
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
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/team" element={<Team />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/influencer-registration" element={<InfluencerRegistration />} />
          <Route path="/brand-registration" element={<BrandRegistration />} />
          <Route path="/brand-registration-form" element={<BrandRegistrationForm />} />
          <Route path="/submission-success" element={<SubmissionSuccess />} />
          <Route path="/influencer-dashboard" element={<InfluencerDashboard />} />
          <Route path="/brand-dashboard" element={<BrandDashboard />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/admin-registration" element={<AdminRegistration />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
