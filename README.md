# 💬 Telegram-style Chat App (Frontend)

React bilan yozilgan chat ilovasi (Telegram'ga o'xshash).
Bu fayl — **butun loyiha xaritasi**. Adashsang, shu yerga qayt.

---

## 📂 Papkalar tuzilishi (xarita)

```
front/
│
├── public/              # index.html va statik fayllar
│
└── src/                 # HAMMA kod shu yerda
    │
    ├── assets/          # 🖼  rasm, ikonka, font
    │   ├── images/
    │   └── icons/
    │
    ├── components/      # 📦  qayta ishlatiladigan bo'laklar
    │   ├── ui/          #     Button, Input, Avatar (eng kichik)
    │   └── layout/      #     Sidebar, Header, ChatList (ramka)
    │
    ├── pages/           # 📄  to'liq sahifalar
    │   ├── Login/
    │   ├── Chat/
    │   └── Settings/
    │
    ├── features/        # ⚙️  asosiy ish mantig'i (ENG MUHIM)
    │   ├── auth/        #     kirish / chiqish
    │   ├── chat/        #     suhbatlar
    │   └── messages/    #     xabar yuborish / olish
    │
    ├── context/         # 🧠  global ma'lumot (kim kirgan, mavzu)
    ├── hooks/           # 🪝  o'zing yozgan hooklar (useAuth...)
    ├── services/        # 🌐  server bilan aloqa (axios, socket)
    ├── utils/           # 🛠  yordamchi funksiyalar (formatTime...)
    ├── router/          # 🧭  sahifalar yo'nalishi (URL)
    ├── styles/          # 🎨  umumiy CSS, ranglar
    │
    ├── App.jsx          # hamma narsani yig'adigan asosiy komponent
    └── main.jsx         # dastur shu yerdan ishga tushadi
```

Har bir papka ichida **README.md** bor — unda "bu papkaga nima yoziladi"
deb yozib qo'yganman. Adashsang o'sha izohni o'qi.

---

## 🧩 Hammasi qanday bog'lanadi? (oddiy misol)

Foydalanuvchi xabar yuborganda:

```
Chat sahifasi (pages/Chat)
   └─ Input komponenti (components/ui/Input)
        └─ "Yuborish" bosildi
             └─ messages feature ishlaydi (features/messages)
                  └─ server so'rovi yuboriladi (services/messageService)
                       └─ xabar ekranga chiqadi
```

> Yodda tut: **pages** yig'adi → **features** o'ylaydi →
> **services** server bilan gaplashadi → **components** ko'rsatadi.

---

## 🚀 Loyihani boshlash bosqichlari (tartib bilan)

1. Vite + React o'rnatish:
   `npm create vite@latest . -- --template react`
2. `npm install`
3. Kerakli kutubxonalar:
   `npm install react-router-dom axios`
4. Avval **Login** sahifasini yasash (auth)
5. Keyin **Chat** ro'yxati (sidebar)
6. Keyin **Messages** (xabar yuborish/olish)
7. Oxirida **real vaqt** (socket.io — jonli xabarlar)

---

## 💡 2 oylik dasturchi uchun maslahat

- Hammasini birdan qilma. **Bittadan** papka bilan ishla.
- Avval ko'rinish (UI), keyin mantiq (logic).
- `features/` va `services/` ni hozir tushunmasang — qo'rqma,
  Login sahifasini yasayotganda o'rganib ketasan.
- Redux hozir **shart emas**. Context yetadi.
```

🍀 Omad! Bir papka — bir vazifa. Shu qoidaga amal qilsang adashmaysan.
```
