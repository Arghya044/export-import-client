import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contex/AuthContext";
import axios from "axios";
import { API_BASE } from "../../lib/api";
import { Helmet } from "react-helmet-async";

export default function DashboardOverview() {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalExports: 0,
        totalImports: 0,
        totalRevenue: 0,
        activeProducts: 0
    });
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchDashboardData();
        }
    }, [user]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Fetch exports
            const { data: exports } = await axios.get(`${API_BASE}/my-exports/${user.email}`);

            // Fetch imports
            const { data: imports } = await axios.get(`${API_BASE}/my-imports/${user.email}`);

            // Calculate stats
            const totalRevenue = imports.reduce((sum, imp) => sum + (imp.price * imp.importedQuantity), 0);
            const activeProducts = exports.filter(p => p.availableQuantity > 0).length;

            setStats({
                totalExports: exports.length,
                totalImports: imports.length,
                totalRevenue: totalRevenue,
                activeProducts: activeProducts
            });

            // Recent transactions (combine imports and exports)
            const transactions = [
                ...imports.map(i => ({ ...i, type: 'Import', date: i.importedAt })),
                ...exports.map(e => ({ ...e, type: 'Export', date: e.createdAt }))
            ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

            setRecentTransactions(transactions);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[50vh] grid place-items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="w-full space-y-3 sm:space-y-4 md:space-y-6">
            <Helmet><title>Dashboard Overview • Import Export Hub</title></Helmet>

            {/* Header - Fully Responsive */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2 sm:gap-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">Dashboard Overview</h1>
                <button onClick={fetchDashboardData} className="btn btn-outline btn-xs sm:btn-sm flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="ml-1">Refresh</span>
                </button>
            </div>

            {/* Overview Cards - Ultra Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {/* Total Exports Card */}
                <div className="stats shadow bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden">
                    <div className="stat py-3 px-3 sm:py-4 sm:px-4 md:py-6 md:px-6">
                        <div className="stat-figure hidden xs:block text-white opacity-70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div className="stat-title text-white opacity-80 text-[10px] xs:text-xs sm:text-sm">Total Exports</div>
                        <div className="stat-value text-xl xs:text-2xl sm:text-3xl md:text-4xl">{stats.totalExports}</div>
                        <div className="stat-desc text-white opacity-70 text-[9px] xs:text-[10px] sm:text-xs">Products listed</div>
                    </div>
                </div>

                {/* Total Imports Card */}
                <div className="stats shadow bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden">
                    <div className="stat py-3 px-3 sm:py-4 sm:px-4 md:py-6 md:px-6">
                        <div className="stat-figure hidden xs:block text-white opacity-70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <div className="stat-title text-white opacity-80 text-[10px] xs:text-xs sm:text-sm">Total Imports</div>
                        <div className="stat-value text-xl xs:text-2xl sm:text-3xl md:text-4xl">{stats.totalImports}</div>
                        <div className="stat-desc text-white opacity-70 text-[9px] xs:text-[10px] sm:text-xs">Products imported</div>
                    </div>
                </div>

                {/* Total Revenue Card */}
                <div className="stats shadow bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden">
                    <div className="stat py-3 px-3 sm:py-4 sm:px-4 md:py-6 md:px-6">
                        <div className="stat-figure hidden xs:block text-white opacity-70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="stat-title text-white opacity-80 text-[10px] xs:text-xs sm:text-sm">Total Revenue</div>
                        <div className="stat-value text-lg xs:text-xl sm:text-3xl md:text-4xl break-words">${stats.totalRevenue.toFixed(2)}</div>
                        <div className="stat-desc text-white opacity-70 text-[9px] xs:text-[10px] sm:text-xs">From imports</div>
                    </div>
                </div>

                {/* Active Products Card */}
                <div className="stats shadow bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden">
                    <div className="stat py-3 px-3 sm:py-4 sm:px-4 md:py-6 md:px-6">
                        <div className="stat-figure hidden xs:block text-white opacity-70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="stat-title text-white opacity-80 text-[10px] xs:text-xs sm:text-sm">Active Products</div>
                        <div className="stat-value text-xl xs:text-2xl sm:text-3xl md:text-4xl">{stats.activeProducts}</div>
                        <div className="stat-desc text-white opacity-70 text-[9px] xs:text-[10px] sm:text-xs">In stock</div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Visualization - Fully Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {/* Exports vs Imports Comparison */}
                <div className="card bg-base-100 shadow-lg border border-base-300 overflow-hidden">
                    <div className="card-body p-3 sm:p-4 md:p-6">
                        <h2 className="card-title text-base sm:text-lg md:text-xl">Exports vs Imports</h2>
                        <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium">Exports</span>
                                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium">{stats.totalExports}</span>
                                </div>
                                <div className="w-full bg-base-200 rounded-full h-2 xs:h-3 sm:h-4">
                                    <div
                                        className="bg-blue-500 h-2 xs:h-3 sm:h-4 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min((stats.totalExports / Math.max(stats.totalExports + stats.totalImports, 1)) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium">Imports</span>
                                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium">{stats.totalImports}</span>
                                </div>
                                <div className="w-full bg-base-200 rounded-full h-2 xs:h-3 sm:h-4">
                                    <div
                                        className="bg-green-500 h-2 xs:h-3 sm:h-4 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min((stats.totalImports / Math.max(stats.totalExports + stats.totalImports, 1)) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Summary - Ultra Responsive Grid */}
                <div className="card bg-base-100 shadow-lg border border-base-300 overflow-hidden">
                    <div className="card-body p-3 sm:p-4 md:p-6">
                        <h2 className="card-title text-base sm:text-lg md:text-xl">Activity Summary</h2>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4">
                            <div className="stat bg-base-200 rounded-lg p-2 xs:p-3 sm:p-4">
                                <div className="stat-title text-[9px] xs:text-[10px] sm:text-xs truncate">Total Products</div>
                                <div className="stat-value text-lg xs:text-xl sm:text-2xl text-primary">{stats.totalExports}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg p-2 xs:p-3 sm:p-4">
                                <div className="stat-title text-[9px] xs:text-[10px] sm:text-xs truncate">Transactions</div>
                                <div className="stat-value text-lg xs:text-xl sm:text-2xl text-secondary">{stats.totalImports}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg p-2 xs:p-3 sm:p-4">
                                <div className="stat-title text-[9px] xs:text-[10px] sm:text-xs truncate">Revenue</div>
                                <div className="stat-value text-base xs:text-lg sm:text-2xl text-accent break-words">${stats.totalRevenue.toFixed(0)}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg p-2 xs:p-3 sm:p-4">
                                <div className="stat-title text-[9px] xs:text-[10px] sm:text-xs truncate">Active</div>
                                <div className="stat-value text-lg xs:text-xl sm:text-2xl text-success">{stats.activeProducts}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions Table - Mobile Optimized */}
            <div className="card bg-base-100 shadow-lg border border-base-300 overflow-hidden">
                <div className="card-body p-3 sm:p-4 md:p-6">
                    <h2 className="card-title text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4">Recent Transactions</h2>
                    <div className="overflow-x-auto -mx-3 sm:-mx-4 md:mx-0">
                        <div className="inline-block min-w-full align-middle">
                            <table className="table table-zebra w-full text-[10px] xs:text-xs sm:text-sm">
                                <thead>
                                    <tr>
                                        <th className="px-2 xs:px-3 sm:px-4">Type</th>
                                        <th className="px-2 xs:px-3 sm:px-4">Product</th>
                                        <th className="px-2 xs:px-3 sm:px-4">Price</th>
                                        <th className="px-2 xs:px-3 sm:px-4 hidden sm:table-cell">Country</th>
                                        <th className="px-2 xs:px-3 sm:px-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTransactions.map((transaction, index) => (
                                        <tr key={index}>
                                            <td className="px-2 xs:px-3 sm:px-4">
                                                <span className={`badge badge-xs ${transaction.type === 'Import' ? 'badge-success' : 'badge-primary'}`}>
                                                    {transaction.type}
                                                </span>
                                            </td>
                                            <td className="px-2 xs:px-3 sm:px-4 max-w-[80px] xs:max-w-[100px] sm:max-w-[150px] md:max-w-none truncate" title={transaction.productName}>
                                                {transaction.productName}
                                            </td>
                                            <td className="px-2 xs:px-3 sm:px-4 whitespace-nowrap">${transaction.price}</td>
                                            <td className="px-2 xs:px-3 sm:px-4 hidden sm:table-cell">{transaction.originCountry}</td>
                                            <td className="px-2 xs:px-3 sm:px-4 whitespace-nowrap">
                                                {new Date(transaction.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: window.innerWidth < 640 ? undefined : '2-digit'
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {recentTransactions.length === 0 && (
                            <div className="text-center py-6 sm:py-8 opacity-70 text-xs sm:text-sm md:text-base px-3 sm:px-4">
                                No transactions yet. Start by adding exports or making imports!
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Info Alert - Fully Responsive */}
            <div className="alert alert-info text-[10px] xs:text-xs sm:text-sm py-2 sm:py-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-left leading-relaxed">Dashboard data is fetched in real-time from your exports and imports. Click refresh to update.</span>
            </div>
        </div>
    );
}
