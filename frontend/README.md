# URL Shortener - React Frontend

A modern, responsive React frontend for the URL Shortener application built with **Vite**, **React 19**, and **Tailwind CSS**.

## 🚀 Features

- ✨ **Modern UI** - Clean, professional design with Tailwind CSS
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast** - Built with Vite for instant dev server startup
- 🎯 **User-Friendly** - Intuitive interface for shortening URLs
- 📋 **Copy to Clipboard** - Easy sharing of shortened URLs
- 📊 **URL Statistics** - View clicks, creation date, and QR codes
- 🎨 **Modern Components** - React functional components with hooks

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:3000`

## 🚀 Getting Started

### 1. Installation

```bash
cd frontend
npm install
```

### 2. Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

### 4. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── UrlForm.jsx       # Form to create short URLs
│   │   └── UrlsList.jsx      # Display list of shortened URLs
│   ├── App.jsx               # Main application component
│   ├── index.css             # Tailwind CSS configuration
│   ├── main.jsx              # React entry point
│   └── vite-env.d.ts         # Vite environment types
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── package.json              # Project dependencies
```

## 🔧 Configuration

### API Base URL

The API base URL is configured in `src/App.jsx`:

```javascript
const API_BASE_URL = 'http://localhost:3000';
```

Change this to your backend server URL if needed.

## 📝 API Integration

### Endpoints Used

1. **Get All URLs** - `GET /urls`
   - Fetches all shortened URLs

2. **Create Short URL** - `POST /shorten`
   - Request: `{ longUrl: "https://..." }`
   - Response: `{ shortUrl: "...", longUrl: "...", clicks: 0, ... }`

3. **Delete URL** - `DELETE /urls/:id`
   - Deletes a shortened URL

## 🎨 Components

### UrlForm Component
- Handles URL input and submission
- Form validation
- Success/error messages
- Loading states

### UrlsList Component
- Displays list of shortened URLs
- Copy to clipboard functionality
- Shows URL statistics (clicks, creation date, QR code)
- Delete functionality
- Refresh button
- Loading state with animation
- Empty state message

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📦 Dependencies

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "axios": "^1.x",
  "tailwindcss": "^3.x",
  "vite": "^8.x"
}
```

## 📚 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure backend is running on `http://localhost:3000`
- Check CORS settings on the backend
- Verify API endpoints are correct

### Styling Issues
- Run `npm install` to ensure all Tailwind CSS files are present
- Clear `.vite` cache: `rm -rf node_modules/.vite`
- Rebuild: `npm run dev`

## 🤝 Contributing

1. Create a feature branch
2. Commit changes
3. Push to repository
4. Open a pull request

## 📄 License

MIT License - feel free to use this project for learning and development.

## 📞 Support

For issues or questions, please contact the development team or create an issue in the repository.

---

**Happy URL Shortening! 🎉**

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
