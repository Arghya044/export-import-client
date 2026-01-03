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
        <div className="space-y-6">
            <Helmet><title>Dashboard Overview • Import Export Hub</title></Helmet>

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <button onClick={fetchDashboardData} className="btn btn-outline btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="stats shadow bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <div className="stat">
                        <div className="stat-figure text-white opacity-70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div className="stat-title text-white opacity-80">Total Exports</div>
                        <div className="stat-value">{stats.totalExports}</div>
                        <div className="stat-desc text-white opacity-70">Products listed</div>
                    </div>
                </div>

                <div className="stats shadow bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <div className="stat">
                        <div className="stat-figure text-white opacity-70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <div className="stat-title text-white opacity-80">Total Imports</div>
                        <div className="stat-value">{stats.totalImports}</div>
                        <div className="stat-desc text-white opacity-70">Products imported</div>
                    </div>
                </div>

                <div className="stats shadow bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <div className="stat">
                        <div className="stat-figure text-white opacity-70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="stat-title text-white opacity-80">Total Revenue</div>
                        <div className="stat-value">${stats.totalRevenue.toFixed(2)}</div>
                        <div className="stat-desc text-white opacity-70">From imports</div>
                    </div>
                </div>

                <div className="stats shadow bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    <div className="stat">
                        <div className="stat-figure text-white opacity-70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="stat-title text-white opacity-80">Active Products</div>
                        <div className="stat-value">{stats.activeProducts}</div>
                        <div className="stat-desc text-white opacity-70">In stock</div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Exports vs Imports Comparison */}
                <div className="card bg-base-100 shadow-lg border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title">Exports vs Imports</h2>
                        <div className="space-y-4 mt-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">Exports</span>
                                    <span className="text-sm font-medium">{stats.totalExports}</span>
                                </div>
                                <div className="w-full bg-base-200 rounded-full h-4">
                                    <div
                                        className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min((stats.totalExports / Math.max(stats.totalExports + stats.totalImports, 1)) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">Imports</span>
                                    <span className="text-sm font-medium">{stats.totalImports}</span>
                                </div>
                                <div className="w-full bg-base-200 rounded-full h-4">
                                    <div
                                        className="bg-green-500 h-4 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min((stats.totalImports / Math.max(stats.totalExports + stats.totalImports, 1)) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Summary */}
                <div className="card bg-base-100 shadow-lg border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title">Activity Summary</h2>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="stat bg-base-200 rounded-lg p-4">
                                <div className="stat-title text-xs">Total Products</div>
                                <div className="stat-value text-2xl text-primary">{stats.totalExports}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg p-4">
                                <div className="stat-title text-xs">Total Transactions</div>
                                <div className="stat-value text-2xl text-secondary">{stats.totalImports}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg p-4">
                                <div className="stat-title text-xs">Revenue</div>
                                <div className="stat-value text-2xl text-accent">${stats.totalRevenue.toFixed(0)}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg p-4">
                                <div className="stat-title text-xs">Active</div>
                                <div className="stat-value text-2xl text-success">{stats.activeProducts}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                    <h2 className="card-title">Recent Transactions</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Country</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTransactions.map((transaction, index) => (
                                    <tr key={index}>
                                        <td>
                                            <span className={`badge ${transaction.type === 'Import' ? 'badge-success' : 'badge-primary'}`}>
                                                {transaction.type}
                                            </span>
                                        </td>
                                        <td>{transaction.productName}</td>
                                        <td>${transaction.price}</td>
                                        <td>{transaction.originCountry}</td>
                                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {recentTransactions.length === 0 && (
                            <div className="text-center py-8 opacity-70">
                                No transactions yet. Start by adding exports or making imports!
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Info Alert */}
            <div className="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Dashboard data is fetched in real-time from your exports and imports. Click refresh to update.</span>
            </div>
        </div>
    );
}
