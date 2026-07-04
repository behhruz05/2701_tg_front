import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { sendCode, signIn } from '../../services/authService'

const PlaneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.94 2.6a1 1 0 0 0-1.05-.16L2.6 10.2c-.86.36-.82 1.6.06 1.9l4.7 1.6 2.02 6.06c.27.8 1.32.96 1.82.28l2.6-3.55 4.66 3.43c.6.44 1.45.12 1.62-.6L23 3.6a1 1 0 0 0-.36-.99l-.7-.01ZM9.2 13.1l8.2-6.1-6.6 7.1c-.16.18-.27.4-.3.64l-.3 2.5-1-4.14Z" />
  </svg>
)

const LoginPage = () => {
  // step: 'phone' = telefon so'raymiz, 'code' = kod so'raymiz
  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('')
  const [apiId, setApiId] = useState('')
  const [apiHash, setApiHash] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('') // 2FA (bo'lmasa bo'sh qoladi)

  const [loginId, setLoginId] = useState('') // send-code javobidan keladi
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  // 1-qadam: telefonga kod yuboramiz
  const handleSendCode = async (e) => {
    e.preventDefault()
    setError('')
    if (!phone.trim() || !apiId.trim() || !apiHash.trim()) return

    try {
      setLoading(true)
      const data = await sendCode(phone.trim(), apiId.trim(), apiHash.trim())
      setLoginId(data.loginId) // keyingi qadam uchun saqlaymiz
      setStep('code')          // kod so'raydigan ekranga o'tamiz
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 2-qadam: kod bilan tizimga kiramiz
  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')
    if (!code.trim()) return

    try {
      setLoading(true)
      const data = await signIn(loginId, code.trim(), password || undefined)
      login(data)      // AuthContext'ga saqlaymiz -> kirdik
      navigate('/')    // chat sahifasiga o'tamiz
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-blue-500/30">
            <PlaneIcon className="h-10 w-10 -ml-1 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-800">Telegram</h1>
          <p className="mt-1 text-sm text-slate-500">
            Telefon raqamingiz bilan kiring
          </p>
        </div>

        {/* QADAM 1: TELEFON */}
        {step === 'phone' && (
          <form
            onSubmit={handleSendCode}
            className="rounded-2xl border border-white/60 bg-white/80 p-6 sm:p-8 shadow-xl shadow-slate-200/60 backdrop-blur"
          >
            <h2 className="text-xl font-semibold text-slate-800">Tizimga kirish</h2>
            <p className="mt-1 mb-6 text-sm text-slate-500">
              Telefon raqamingizga tasdiqlash kodi yuboramiz
            </p>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Telefon raqam
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998901234567"
                autoComplete="tel"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                API ID
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={apiId}
                onChange={(e) => setApiId(e.target.value)}
                placeholder="1234567"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                API Hash
              </span>
              <input
                type="text"
                value={apiHash}
                onChange={(e) => setApiHash(e.target.value)}
                placeholder="abcdef1234567890abcdef1234567890"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </label>

            <p className="mt-2 text-xs text-slate-400">
              API ID va Hash'ni my.telegram.org &gt; API development tools'dan olasiz
            </p>

            {error && (
              <p className="mt-3 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-sky-600 hover:to-blue-700 active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? 'Yuborilmoqda...' : 'Kod yuborish'}
            </button>
          </form>
        )}

        {/* QADAM 2: KOD */}
        {step === 'code' && (
          <form
            onSubmit={handleSignIn}
            className="rounded-2xl border border-white/60 bg-white/80 p-6 sm:p-8 shadow-xl shadow-slate-200/60 backdrop-blur"
          >
            <h2 className="text-xl font-semibold text-slate-800">Kodni kiriting</h2>
            <p className="mt-1 mb-6 text-sm text-slate-500">
              <span className="font-medium text-slate-700">{phone}</span> raqamiga
              yuborilgan kodni kiriting
            </p>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Tasdiqlash kodi
              </span>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="12345"
                autoComplete="one-time-code"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 tracking-widest placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </label>

            {/* 2FA parol — faqat yoqilgan bo'lsa kerak bo'ladi */}
            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Parol (agar 2 bosqichli himoya yoqilgan bo'lsa)
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </label>

            {error && (
              <p className="mt-3 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-sky-600 hover:to-blue-700 active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? 'Tekshirilmoqda...' : 'Kirish'}
            </button>

            {/* Orqaga qaytish */}
            <button
              type="button"
              onClick={() => { setStep('phone'); setError('') }}
              className="mt-3 w-full text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              ← Raqamni o'zgartirish
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Telegram Web — barcha huquqlar himoyalangan
        </p>
      </div>
    </div>
  )
}

export default LoginPage
