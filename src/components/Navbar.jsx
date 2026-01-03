import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contex/AuthContext";
import logo from "../assets/eximlogo.png";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "bluish");

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Set data-theme attribute
    root.setAttribute("data-theme", theme);
    
    // Set color scheme
    root.style.colorScheme = theme === "deepdark" ? "dark" : "light";
    
    // Force background color update
    if (theme === "deepdark") {
      body.style.backgroundColor = "rgb(17 17 17)";
      body.style.color = "rgb(255 255 255)";
    } else {
      body.style.backgroundColor = "rgb(239 246 255)";
      body.style.color = "rgb(30 64 175)";
    }
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
    
    // Force a reflow
    void root.offsetHeight;
  }, [theme]);

  const navItems = (
    <>
      <li><NavLink to="/products">All Products</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/my-exports">My Exports</NavLink></li>
          <li><NavLink to="/my-imports">My Imports</NavLink></li>
          <li><NavLink to="/add-export">Add Export</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-100 border-b border-base-300">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              {navItems}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Import Export Hub" className="h-10 w-10" />
            <span className="text-xl font-bold hidden sm:inline">Import Export Hub</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end gap-2">
          <label className="swap swap-rotate">
            <input 
              type="checkbox" 
              checked={theme === "deepdark"} 
              onChange={(e) => {
                const newTheme = e.target.checked ? "deepdark" : "bluish";
                setTheme(newTheme);
              }} 
            />
            <svg className="swap-off h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zM8 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zM3.757 2.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 1 1-.707.707L3.757 3.05a.5.5 0 0 1 0-.707zM10.122 8.708a3 3 0 1 1-2.829-2.829 3 3 0 0 1 2.829 2.829z"/></svg>
            <svg className="swap-on h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.02 3.278 7.277 7.318 7.277 1.23 0 2.392-.308 3.41-.848a.787.787 0 0 1 .859.12.733.733 0 0 1-.032 1.106A8.349 8.349 0 0 1 8.5 16C3.813 16 0 12.217 0 7.556 0 4.905 1.289 2.576 3.3 1.112A.733.733 0 0 1 4.406 1a.787.787 0 0 1 .12.859A7.358 7.358 0 0 0 4 4.596C4 8.636 7.258 11.914 11.278 11.914c1.24 0 2.41-.3 3.427-.828a7.204 7.204 0 0 0 1.116-.708.768.768 0 0 1-.4 1.481A8.27 8.27 0 0 1 8.5 14C4.364 14 1 10.636 1 6.5 1 3.279 2.938.64 6 .278z"/></svg>
          </label>
          {!user ? (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {user.photoURL ? <img src={user.photoURL} alt="avatar" className="h-8 w-8 rounded-full" /> : null}
              <button onClick={logout} className="btn btn-error btn-sm">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


