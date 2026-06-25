# 🧠 context — Global ma'lumot (hamma joyda kerak bo'ladigan)

Bu yerda **Context API** turadi — ya'ni butun dasturga kerak bo'ladigan
ma'lumotni bir joyda saqlash.

Misol:
- `AuthContext`  → kim tizimga kirgan (user ma'lumoti, token)
- `ThemeContext` → mavzu (qora / oq rejim)
- `ChatContext`  → hozir ochiq turgan suhbat

## Nega kerak?
Ba'zi ma'lumot **hamma sahifaga** kerak. Masalan "kim kirgan" — buni
har sahifaga qo'lda uzatish qiyin. Context buni bir marta beradi,
hamma joydan o'qiladi.

> 2 oylik dasturchi uchun: hozircha faqat AuthContext bilan boshla.
> Redux'ni keyinroq o'rganarsan — hozir Context yetarli.
