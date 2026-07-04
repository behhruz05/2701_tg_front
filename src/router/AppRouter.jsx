import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Login/LoginPage'
import ChatPage from '../pages/Chat/ChatPage'
import SettingsPage from '../pages/Settings/SettingsPage'
import MainLayout from '../layouts/MainLayout'
import PrivateRoute from './PrivateRoute'

const AppRouter = () => {
  return (
    <Routes>
      {/* Ochiq yo'nalish — hamma ko'radi */}
      <Route path="/login" element={<LoginPage />} />

      {/* Himoyalangan yo'nalishlar — MainLayout ichida */}
      {/* PrivateRoute: kirmagan bo'lsa /login ga qaytaradi */}
      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<ChatPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
