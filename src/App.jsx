import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppRouter from './router/AppRouter'

const App = () => {
  return (
    // BrowserRouter — URL bilan ishlashni yoqadi
    <BrowserRouter>
      {/* AuthProvider — "kim kirgan"ni butun dasturga beradi */}
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
