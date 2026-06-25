# ⚙️ features — Asosiy funksiyalar (eng muhim papka)

Bu yerda loyihaning **ish mantig'i** turadi. Har bir "feature" =
bitta katta vazifa va unga tegishli hamma narsa bir joyda.

- `auth/`     → kirish, ro'yxatdan o'tish, chiqish (logout)
- `chat/`     → suhbatlar ro'yxati, suhbat ochish/yopish
- `messages/` → xabar yuborish, xabarlarni ko'rsatish, o'qildi belgisi

## Nega kerak?
Telegram katta dastur. Hamma narsani bitta joyga yozsang — chalkashasan.
Shuning uchun har vazifani **alohida papkaga** ajratamiz.

Misol uchun `messages/` ichida bo'lishi mumkin:
- xabarlarni serverdan olish
- yangi xabar yuborish mantig'i
- shu funksiyaga tegishli kichik komponentlar (MessageBubble)

> Qoida: "Bu kod qaysi vazifaga tegishli?" deb so'ra — javob shu papka nomi.
