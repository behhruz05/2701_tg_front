import { createContext, useContext, useState } from 'react'

// 1. Context yaratamiz (bo'sh quti)
const AuthContext = createContext()

// 2. Provider — butun dasturni o'rab, ma'lumot beradi
export const AuthProvider = ({ children }) => {
  // localStorage'da bo'lsa — o'qiymiz, bo'lmasa null
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  // session — himoyalangan API'larga (me, logout, ...) kerak bo'ladi
  const [session, setSession] = useState(() => localStorage.getItem('session'))

  // Kirish — sign-in javobi { session, user } keladi
  const login = ({ session, user }) => {
    setSession(session)
    setUser(user)
    localStorage.setItem('session', session)
    localStorage.setItem('user', JSON.stringify(user))
  }

  // Faqat user ma'lumotini yangilash (masalan /me dan kelganda)
  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Chiqish
  const logout = () => {
    setUser(null)
    setSession(null)
    localStorage.removeItem('user')
    localStorage.removeItem('session')
  }

  return (
    <AuthContext.Provider value={{ user, session, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// 3. Qisqa hook — har joyda useAuth() deb chaqiramiz
export const useAuth = () => useContext(AuthContext)
