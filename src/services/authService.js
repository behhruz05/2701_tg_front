// 🌐 Server bilan gaplashadigan joy — login uchun 2 ta so'rov

// .env dan manzilni olamiz (masalan: https://.../api)
const API_URL = import.meta.env.VITE_API_URL

// Kichik yordamchi: serverga so'rov yuboradi va javobni qaytaradi.
// session berilsa — uni x-tg-session header'ida yuboradi (himoyalangan API'lar uchun).
async function request(path, { method = 'GET', body, session } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (session) headers['x-tg-session'] = session

  const res = await fetch(API_URL + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))

  // Server xato qaytarsa — tushunarli xabar bilan to'xtaymiz
  if (!res.ok) {
    throw new Error(data.message || 'Xatolik yuz berdi')
  }

  return data
}

// Qulaylik uchun POST yordamchisi
function post(path, body, session) {
  return request(path, { method: 'POST', body, session })
}

// 1-qadam: telefonga kod yuborish
// Foydalanuvchi kiritadi: telefon, apiId, apiHash
// Javobda loginId qaytadi — uni 2-qadamda ishlatamiz
export function sendCode(phone, apiId, apiHash) {
  return post('/tg/auth/send-code', {
    phone,
    apiId: Number(apiId), // server son kutadi
    apiHash,
  })
}

// 2-qadam: kod (va agar bo'lsa 2FA parol) bilan kirish
// Javobda { session, user } qaytadi — session'ni saqlab qo'yamiz
export function signIn(loginId, code, password) {
  return post('/tg/auth/sign-in', { loginId, code, password })
}

// Joriy foydalanuvchi — session header bilan
export function getMe(session) {
  return request('/tg/auth/me', { session })
}

// Chiqish — serverdagi sessiyani ham yopamiz
export function logout(session) {
  return post('/tg/auth/logout', undefined, session)
}
