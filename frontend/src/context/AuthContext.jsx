
import { createContext, useEffect, useState } from 'react'
import {
  iniciarSesion as solicitarLogin,
  obtenerPerfil,
} from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function verificarSesion() {
      if (!token) {
        setCargando(false)
        return
      }

      try {
        const respuesta = await obtenerPerfil(token)
        setUsuario(respuesta.usuario)
      } catch {
        localStorage.removeItem('token')
        setToken(null)
        setUsuario(null)
      } finally {
        setCargando(false)
      }
    }

    verificarSesion()
  }, [token])

  async function login(email, password) {
    const respuesta = await solicitarLogin(email, password)

    localStorage.setItem('token', respuesta.token)
    setToken(respuesta.token)
    setUsuario(respuesta.usuario)

    return respuesta.usuario
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    setUsuario(null)
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        cargando,
        autenticado: Boolean(usuario),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
