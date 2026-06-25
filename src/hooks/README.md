# 🪝 hooks — Custom (o'zing yozgan) hooklar

Bu yerda **qayta ishlatiladigan mantiq** turadi. Hook = `use` so'zi
bilan boshlanadigan funksiya.

Misol (keyin yozasan):
- `useAuth`      → kirgan foydalanuvchini olish (AuthContext'dan)
- `useChat`      → suhbat ma'lumotini olish
- `useDebounce`  → qidiruvda har harfda emas, biroz kutib so'rov yuborish

## Nega kerak?
Bir xil mantiqni 2-3 komponentda takrorlasang — uni hook'ga olib chiqasan.
Keyin bitta `useAuth()` yozsang yetadi.

> Hozircha shart emas. Loyiha katta bo'lganda kerak bo'ladi.
