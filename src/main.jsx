import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize theme from localStorage
const savedTheme = localStorage.getItem("theme") || "bluish";
const root = document.documentElement;
const body = document.body;

root.setAttribute("data-theme", savedTheme);
root.style.colorScheme = savedTheme === "deepdark" ? "dark" : "light";

// Set initial background colors
if (savedTheme === "deepdark") {
  body.style.backgroundColor = "rgb(17 17 17)";
  body.style.color = "rgb(255 255 255)";
} else {
  body.style.backgroundColor = "rgb(239 246 255)";
  body.style.color = "rgb(30 64 175)";
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
