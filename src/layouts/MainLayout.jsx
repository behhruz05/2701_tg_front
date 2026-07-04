import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getMe, logout as logoutApi } from '../services/authService'

const MainLayout = () => {
  const { user, session, updateUser, logout } = useAuth()
  const navigate = useNavigate()

  // Sahifa ochilganda joriy foydalanuvchini serverdan olamiz (/tg/auth/me)
  useEffect(() => {
    if (!session) return
    let cancelled = false

    getMe(session)
      .then((me) => {
        if (!cancelled) updateUser(me)
      })
      .catch(() => {
        // Session eskirgan/yaroqsiz bo'lsa — login sahifasiga qaytaramiz
        if (!cancelled) {
          logout()
          navigate('/login')
        }
      })

    return () => {
      cancelled = true
    }
  }, [session])

  const handleLogout = async () => {
    try {
      if (session) await logoutApi(session)
    } catch {
      // serverda xato bo'lsa ham, mahalliy sessiyani baribir tozalaymiz
    }
    logout()
    navigate('/login')
  }

  // /me javobi turli shaklda kelishi mumkin: to'g'ridan-to'g'ri yoki { user: {...} },
  // maydonlar camelCase yoki snake_case bo'lishi mumkin — hammasini tekshiramiz
  const u = user?.user ?? user ?? {}
  const firstName = u.firstName ?? u.first_name
  const lastName = u.lastName ?? u.last_name
  const displayName =
    [firstName, lastName].filter(Boolean).join(' ') ||
    u.username ||
    u.name ||
    u.phone ||
    'Foydalanuvchi'

  // Aktiv link uchun stil (NavLink o'zi isActive beradi)
  const linkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
      isActive
        ? 'bg-blue-500 text-white'
        : 'text-slate-600 hover:bg-slate-100'
    }`

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Yon panel (sidebar) */}
      <aside className="flex w-64 flex-col border-r border-slate-200 bg-white p-4">
        <h1 className="mb-6 px-2 text-xl font-bold text-blue-600">Telegram</h1>

        <nav className="flex-1 space-y-1">
          <NavLink to="/" end className={linkClass}>
            💬 Chatlar
          </NavLink>
          <NavLink to="/settings" className={linkClass}>
            ⚙️ Sozlamalar
          </NavLink>
        </nav>

        {/* Pastda user + chiqish */}
        <div className="border-t border-slate-200 pt-4">
          <p className="mb-2 px-2 text-sm text-slate-500">
            Salom, <span className="font-semibold text-slate-700">{displayName}</span>
          </p>
          <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600"
          >
            Chiqish
          </button>
        </div>
      </aside>

      {/* O'ng tomon — ichki sahifa shu yerga chiqadi */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
