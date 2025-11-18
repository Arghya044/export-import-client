# 📦 Import Export Hub - Global Trade Platform

---
## 📋 Project Overview

**Import Export Hub** is a modern Single Page Application (SPA) designed to streamline global trade operations. The platform enables users to browse products, manage exports, track imports, and handle inventory in real-time. Built with React, Tailwind CSS, and Firebase, this responsive application provides a seamless experience across all devices with features like dark mode, secure authentication, and comprehensive CRUD operations.

---

## 🔗 Important Links

- **🌐 Live Website**: [https://import-export-hub-arghya.netlify.app](https://import-export-hub-arghya.netlify.app)

- **🖥️ Server Repository**: [Server GitHub URL]
- **📂 Client Repository**: [Client GitHub URL]
- **📧 Support Email**: support@importhub.com

---

## 🚀 Main Technologies

<table>
  <tr>
    <td align="center" width="150">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" height="50" alt="React"/>
      <br><b>React 18</b>
    </td>
    <td align="center" width="150">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="50" height="50" alt="Tailwind"/>
      <br><b>Tailwind CSS</b>
    </td>
    <td align="center" width="150">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" width="50" height="50" alt="Firebase"/>
      <br><b>Firebase Auth</b>
    </td>
    <td align="center" width="150">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="50" height="50" alt="Node.js"/>
      <br><b>Node.js</b>
    </td>
    <td align="center" width="150">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="50" height="50" alt="MongoDB"/>
      <br><b>MongoDB</b>
    </td>
  </tr>
</table>

### Technology Stack:
- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS, DaisyUI
- **Authentication**: Firebase Authentication
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React Context API
- **Notifications**: React Toastify
- **Deployment**: Netlify (Client), Vercel (Server)

---

## ✨ Key Features

### 🔐 Authentication & Security
- ✅ Email/Password authentication with Firebase
- ✅ Google OAuth integration
- ✅ Persistent login sessions
- ✅ Protected routes for authenticated users
- ✅ Secure user data management

### 📦 Product Management
- ✅ Browse all available products
- ✅ View latest 6 products on Home page
- ✅ Search functionality for quick product discovery
- ✅ Detailed product information pages
- ✅ Real-time stock tracking and updates

### 📤 Export Management (CRUD Operations)
- ✅ Add new export products
- ✅ View all your exports in "My Exports"
- ✅ Update existing export details
- ✅ Delete exports you've created
- ✅ Complete control over your listings

### 📥 Import Operations
- ✅ Import products with "Import Now" feature
- ✅ Quantity validation before import
- ✅ Real-time stock reduction after successful import
- ✅ Track all imports in "My Imports" section
- ✅ Import history management

### 🎨 User Experience
- ✅ Modern, responsive SPA design
- ✅ Dark/Light mode toggle with localStorage persistence
- ✅ Toast notifications for all actions (no browser alerts)
- ✅ Smooth navigation with React Router
- ✅ Mobile-friendly interface

### 📱 Pages & Routes
- 🏠 **Home** - Hero section, latest products, features
- 📦 **All Products** - Complete product catalog with search
- 📄 **Product Details** (Protected) - Detailed view with import option
- 📤 **Add Export** (Protected) - Create new export listings
- 📋 **My Exports** (Protected) - Manage your exports
- 📥 **My Imports** (Protected) - View import history
- 🔐 **Login/Register** - Secure authentication
- 👤 **Profile** (Protected) - User account management

---

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^18.x.x",
  "react-dom": "^18.x.x",
  "react-router-dom": "^6.x.x",
  "firebase": "^10.x.x"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^3.x.x",
  "daisyui": "^4.x.x",
  "react-icons": "^5.x.x",
  "react-toastify": "^10.x.x"
}
```

### Backend Dependencies
```json
{
  "express": "^4.x.x",
  "mongodb": "^6.x.x",
  "cors": "^2.x.x",
  "dotenv": "^16.x.x"
}
```

### Development Tools
```json
{
  "vite": "^5.x.x",
  "@vitejs/plugin-react": "^4.x.x",
  "eslint": "^8.x.x",
  "nodemon": "^3.x.x"
}
```

---

## 💻 Local Setup Guide

### Prerequisites
You must have the following software installed:
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB (local or Atlas account)
- Firebase account
- Git

### Step-by-Step Installation

#### 1. Clone the Repositories

**Client:**
```bash
git clone <client-repository-url>
cd import-export-hub-client
```

**Server:**
```bash
git clone <server-repository-url>
cd import-export-hub-server
```

#### 2. Install Dependencies

**Client:**
```bash
cd import-export-hub-client
npm install
```

**Server:**
```bash
cd import-export-hub-server
npm install
```

#### 3. Firebase Setup

**A. Create Firebase Project:**
- Visit [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Register your app as a Web App

**B. Enable Authentication:**
- Go to Authentication section
- Enable Email/Password provider
- Enable Google Sign-in provider

**C. Get Firebase Config:**
- Copy your Firebase configuration from Project Settings

#### 4. MongoDB Setup

**Option A - MongoDB Atlas (Recommended):**
- Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Get your connection string
- Whitelist your IP address

**Option B - Local MongoDB:**
- Install MongoDB locally
- Start MongoDB service
- Use `mongodb://localhost:27017` as connection string







## 🛠️ Available Scripts

### Client Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Server Scripts
| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |

---




## 🔐 Security Features

- ✅ Firebase Authentication with secure token management
- ✅ Protected API routes with authentication middleware
- ✅ Input validation and sanitization
- ✅ CORS configuration for secure cross-origin requests
- ✅ Environment variables for sensitive data
- ✅ MongoDB injection prevention
- ✅ Secure password handling via Firebase

---

## 🚀 Deployment

### Client Deployment (Netlify)
1. Build the project: `npm run build`
2. Connect your GitHub repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy automatically on push to main branch

**Alternative: Firebase Hosting**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### Server Deployment (Vercel)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in server directory
3. Add environment variables in Vercel dashboard
4. Configure `vercel.json`:
```json




---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---



---

