# 🌐 services — Server bilan gaplashish

Bu yerda **API so'rovlar** (backend bilan aloqa) turadi.
Masalan `axios` yoki `fetch` orqali serverga so'rov yuborish.

Misol fayllar (keyin yozasan):
- `api.js`        → axios sozlamasi (asosiy URL, token va h.k.)
- `authService`   → login/register so'rovlari
- `chatService`   → suhbatlarni olish
- `messageService`→ xabar yuborish / olish
- `socket.js`     → real vaqtli xabarlar uchun WebSocket (Telegram jonli ishlaydi)

## Nega alohida?
Komponent ichida to'g'ridan-to'g'ri so'rov yozsang chalkashadi.
Hamma server so'rovlarini **bitta joyga** yig'amiz — keyin oson o'zgartiriladi.

> Qoida: server so'zi bo'lsa — kod shu yerga keladi.
