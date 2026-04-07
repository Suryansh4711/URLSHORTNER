# 🌐 NEBULA LINK - URL Shortener

A modern URL shortening service with link expiration, date/time pickers, and click tracking. Built with React, Vite, and Node.js.

---

## ✨ Features

- ✅ URL shortening with unique short codes
- ✅ Copy to clipboard with visual feedback
- ✅ Custom link duration (in days)
- ✅ Date & time picker for expiration
- ✅ Recent links with click tracking
- ✅ Delete links with confirmation
- ✅ Dark mode Material Design 3 theme
- ✅ Responsive mobile-friendly UI

---

## 🛠 Tech Stack

**Frontend:** React 19.2.4 | Vite 8.0.3 | Tailwind CSS 4.2.2 | shadcn/ui | date-fns

**Backend:** Node.js | Express | MongoDB

---

## 🚀 Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev        # Start dev server (Port 5173)
npm run build      # Production build
```

### Backend
```bash
cd backend
npm install
npm start          # Start server (Port 3000)
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/shorten` | Create shortened URL |
| GET | `/urls` | Get all URLs |
| DELETE | `/urls/:urlId` | Delete URL |

---

## ⚙️ Setup

1. **Environment Variables** - Create `.env` in backend:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/urlshortener
NODE_ENV=development
PORT=3000
```

2. **Dependencies** - Install both frontend and backend packages

3. **Run Both** - Frontend dev server (5173) + Backend (3000)

---

## 🎨 Design

- **Theme:** Material Design 3 (Dark Mode)
- **Colors:** Cyan, Magenta, Purple
- **Fonts:** Space Grotesk (headers), Manrope (body)
- **Components:** shadcn/ui with custom styling

---

## 📦 Project Structure

```
URLSHORTNER/
├── frontend/          # React + Vite app
│   └── src/
│       ├── components/
│       └── ui/
├── backend/           # Express + MongoDB
│   └── models/
└── README.md
```

---

## ✅ Status

**Completed:**
- Frontend UI with all components
- Link duration selector with date/time picker
- Copy button with feedback
- Delete functionality with confirmation
- Calendar with date validation
- Responsive design

**In Progress:**
- Backend API implementation
- Link expiration logic

---

## 📝 Notes

- Calendar: Past dates disabled, future dates selectable
- Time: 24-hour format (00:00 - 23:59)
- Build time: ~800ms
- Mobile responsive: sm, md, lg, xl breakpoints

---

**Last Updated:** April 7, 2026 | **Version:** 1.0.0-alpha
