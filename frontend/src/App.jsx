
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Inicio from './pages/Inicio'
import Tratamientos from './pages/Tratamientos'
import Profesionales from './pages/Profesionales'
import Login from './pages/Login'
import Registro from './pages/Registro'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/tratamientos" element={<Tratamientos />} />
          <Route path="/profesionales" element={<Profesionales />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
