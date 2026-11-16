
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Inicio from './pages/Inicio'
import Tratamientos from './pages/Tratamientos'
import Profesionales from './pages/Profesionales'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Reservas from './pages/Reservas'
import './App.css'
import MisReservas from './pages/MisReservas'

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
          <Route path="/reservar" element={<Reservas />} />
          <Route path="/mis-reservas" element={<MisReservas />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
