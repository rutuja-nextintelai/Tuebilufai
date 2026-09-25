import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import AOS from 'aos'

import PageBackdrop from './components/PageBackdrop.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollTop from './components/ScrollTop.jsx'
import Home from './pages/Home.jsx'
import Company from './pages/Company.jsx'
import Team from './pages/Team.jsx'
import JuriNex from './pages/JuriNex.jsx'
import Contact from './pages/Contact.jsx'
import Careers from './pages/Careers.jsx'
import Openings from './pages/Openings.jsx'

export default function App() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 })
  }, [])

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100)
        return
      }
    }
    window.scrollTo({ top: 0 })
    setTimeout(() => AOS.refreshHard(), 50)
  }, [pathname, hash])

  return (
    <>
      <PageBackdrop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/team" element={<Team />} />
          <Route path="/jurinex" element={<JuriNex />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/openings" element={<Openings />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}
