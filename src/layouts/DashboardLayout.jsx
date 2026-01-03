import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contex/AuthContext";
import logo from "../assets/eximlogo.png";

export default function DashboardLayout() {
    const { user, logout } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const menuItems = [
        {
            path: "/dashboard", label: "Dashboard Overview", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            path: "/my-exports", label: "My Exports", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            path: "/my-imports", label: "My Imports", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            )
        },
        {
            path: "/add-export", label: "Add Export", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            )
        },
        {
            path: "/profile", label: "Profile", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-base-100">
            {/* Top Navbar */}
            <div className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-50">
                <div className="flex-1">
                    <button
                        className="btn btn-ghost lg:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <Link to="/" className="flex items-center gap-2 ml-2">
                        <img src={logo} alt="Logo" className="h-10 w-10" />
                        <span className="text-xl font-bold hidden sm:inline">Import Export Hub</span>
                    </Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" />
                                ) : (
                                    <div className="bg-primary text-primary-content grid place-items-center h-full">
                                        <span className="text-xl">{user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-300">
                            <li className="menu-title">
                                <span>{user?.displayName || user?.email}</span>
                            </li>
                            <li><Link to="/dashboard">Dashboard Home</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className={`w-64 bg-base-200 border-r border-base-300 lg:block ${sidebarOpen ? 'block' : 'hidden'} fixed lg:sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto z-40`}>
                    <ul className="menu p-4 space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="flex items-center gap-3"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:ml-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
