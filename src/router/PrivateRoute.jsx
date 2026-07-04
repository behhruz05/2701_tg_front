import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Himoyalangan yo'nalish:
// user bor bo'lsa -> sahifani ko'rsatamiz
// user yo'q bo'lsa -> /login ga haydab yuboramiz
const PrivateRoute = ({ children }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
