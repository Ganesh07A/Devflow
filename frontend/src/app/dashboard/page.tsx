"use client";

import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useTheme } from "@/context/ThemeContext";

export default function Dashboard() {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                // Gradient for chart
                const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                gradient.addColorStop(0, "rgba(255, 87, 34, 0.2)");
                gradient.addColorStop(1, "rgba(255, 87, 34, 0)");

                new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                        datasets: [
                            {
                                label: "Code Quality Score",
                                data: [65, 72, 70, 81, 86, 85, 90],
                                borderColor: "#FF5722",
                                backgroundColor: gradient,
                                borderWidth: 2,
                                tension: 0.4,
                                fill: true,
                                pointBackgroundColor: "#FF5722",
                                pointBorderColor: "#fff",
                                pointHoverBackgroundColor: "#fff",
                                pointHoverBorderColor: "#FF5722",
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                            },
                            tooltip: {
                                mode: "index",
                                intersect: false,
                                backgroundColor: "#1E1E22",
                                titleColor: "#fff",
                                bodyColor: "#ccc",
                                borderColor: "#333",
                                borderWidth: 1,
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                grid: {
                                    color: "rgba(100, 100, 100, 0.1)",
                                },
                                border: {
                                    display: false,
                                },
                                ticks: {
                                    color: "#9CA3AF",
                                    font: {
                                        size: 10,
                                    },
                                },
                            },
                            x: {
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    color: "#9CA3AF",
                                    font: {
                                        size: 10,
                                    },
                                },
                            },
                        },
                        interaction: {
                            mode: "nearest",
                            axis: "x",
                            intersect: false,
                        },
                    },
                });
            }
        }
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-sans antialiased overflow-hidden h-screen flex transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-surface-dark/80 backdrop-blur-md z-10 sticky top-0 border-b border-gray-200 dark:border-border-dark">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <span className="material-icons-round text-lg">search</span>
                            </span>
                            <input
                                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-lg text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                                placeholder="Search PRs, repos..."
                                type="text"
                            />
                        </div>
                        <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                            <span className="material-icons-round">notifications</span>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
                        </button>
                        <button
                            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                            onClick={toggleTheme}
                        >
                            {isDark ? (
                                <span className="material-icons-round">light_mode</span>
                            ) : (
                                <span className="material-icons-round">dark_mode</span>
                            )}
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-border-dark shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending Reviews</h3>
                                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
                                    <span className="material-icons-round text-lg">pending_actions</span>
                                </div>
                            </div>
                            <div className="flex items-end space-x-2">
                                <span className="text-3xl font-bold">14</span>
                                <span className="text-green-500 text-sm font-medium mb-1 flex items-center">
                                    <span className="material-icons-round text-base">arrow_upward</span> 12%
                                </span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-border-dark shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Bugs Detected</h3>
                                <div className="p-2 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg">
                                    <span className="material-icons-round text-lg">bug_report</span>
                                </div>
                            </div>
                            <div className="flex items-end space-x-2">
                                <span className="text-3xl font-bold">8</span>
                                <span className="text-red-500 text-sm font-medium mb-1 flex items-center">
                                    <span className="material-icons-round text-base">arrow_upward</span> 3 new
                                </span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-border-dark shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Security Score</h3>
                                <div className="p-2 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg">
                                    <span className="material-icons-round text-lg">shield</span>
                                </div>
                            </div>
                            <div className="flex items-end space-x-2">
                                <span className="text-3xl font-bold">A+</span>
                                <span className="text-gray-500 dark:text-gray-500 text-sm font-medium mb-1">Stable</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-border-dark shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Merge Time</h3>
                                <div className="p-2 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg">
                                    <span className="material-icons-round text-lg">timer</span>
                                </div>
                            </div>
                            <div className="flex items-end space-x-2">
                                <span className="text-3xl font-bold">4.2h</span>
                                <span className="text-green-500 text-sm font-medium mb-1 flex items-center">
                                    <span className="material-icons-round text-base">arrow_downward</span> 18%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8">
                        {/* Main Content Column */}
                        <div className="col-span-12 lg:col-span-8 space-y-8">
                            {/* Active AI Suggestions */}
                            <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-gray-200 dark:border-border-dark flex items-center justify-between bg-gray-50 dark:bg-white/5">
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-primary/20 text-primary p-1.5 rounded-md">
                                            <span className="material-icons-round text-sm">auto_awesome</span>
                                        </span>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Active AI Suggestions</h3>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">PR #2401</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="text-xs px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition">View File</button>
                                        <button className="text-xs px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition">Context</button>
                                    </div>
                                </div>
                                <div className="p-0 font-mono text-sm bg-gray-50 dark:bg-[#0d1117] text-gray-800 dark:text-gray-300 overflow-x-auto">
                                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 text-xs text-gray-500 font-sans">
                                        src/controllers/auth.controller.ts
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex hover:bg-gray-200 dark:hover:bg-white/5 transition-colors">
                                            <div className="w-10 text-right pr-3 text-gray-400 select-none border-r border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/50">42</div>
                                            <div className="pl-4 py-0.5">{"  try {"}</div>
                                        </div>
                                        <div className="flex hover:bg-gray-200 dark:hover:bg-white/5 transition-colors">
                                            <div className="w-10 text-right pr-3 text-gray-400 select-none border-r border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/50">43</div>
                                            <div className="pl-4 py-0.5">{"    const { email, password } = req.body;"}</div>
                                        </div>
                                        <div className="flex code-line-highlight">
                                            <div className="w-10 text-right pr-3 text-red-400 select-none border-r border-gray-200 dark:border-gray-800 bg-red-50 dark:bg-red-900/20">44</div>
                                            <div className="pl-4 py-0.5 text-red-700 dark:text-red-200">{"    const user = await User.findOne({ email: email });"}</div>
                                        </div>
                                        <div className="my-2 mx-4 bg-white dark:bg-[#1E1E22] border border-primary/30 rounded-lg shadow-lg overflow-hidden">
                                            <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex items-start space-x-3">
                                                <div className="mt-0.5 bg-primary/20 p-1 rounded">
                                                    <span className="material-icons-round text-primary text-sm">psychology</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Performance Optimization</h4>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        Using <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">lean()</code> is recommended for read-only operations to bypass Hydration and improve query speed by ~30%.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-green-50/50 dark:bg-green-900/10 p-3 font-mono text-sm border-b border-gray-100 dark:border-gray-800">
                                                <div className="flex text-green-700 dark:text-green-300">
                                                    <span className="mr-3 select-none text-green-400">+</span>
                                                    <span>{"const user = await User.findOne({ email }).lean();"}</span>
                                                </div>
                                            </div>
                                            <div className="p-2 flex justify-end space-x-2 bg-gray-50 dark:bg-[#161618]">
                                                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">Dismiss</button>
                                                <button className="px-3 py-1.5 text-xs font-medium bg-primary text-white rounded shadow-sm hover:bg-orange-600 transition flex items-center">
                                                    <span className="material-icons-round text-sm mr-1">check</span>
                                                    Accept Fix
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex hover:bg-gray-200 dark:hover:bg-white/5 transition-colors">
                                            <div className="w-10 text-right pr-3 text-gray-400 select-none border-r border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/50">45</div>
                                            <div className="pl-4 py-0.5">{"    if (!user) return res.status(404).send('Not found');"}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-border-dark flex justify-between items-center text-xs text-gray-500">
                                    <span>Showing 1 of 5 suggestions</span>
                                    <div className="flex space-x-1">
                                        <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400">←</button>
                                        <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400">→</button>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Pull Requests */}
                            <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark shadow-sm">
                                <div className="p-5 border-b border-gray-200 dark:border-border-dark flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Recent Pull Requests</h3>
                                    <a href="#" className="text-sm text-primary hover:text-orange-400 font-medium">View All</a>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                                        <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase text-gray-700 dark:text-gray-300">
                                            <tr>
                                                <th className="px-6 py-3 font-medium">PR Name</th>
                                                <th className="px-6 py-3 font-medium">Status</th>
                                                <th className="px-6 py-3 font-medium">Quality</th>
                                                <th className="px-6 py-3 font-medium">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
                                            <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                    <span className="material-icons-round text-gray-400 text-lg">call_split</span>
                                                    feat: User Authentication
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs px-2 py-1 rounded-full border border-yellow-200 dark:border-yellow-800">Reviewing</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                                                        </div>
                                                        <span className="text-xs">85%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs">2 hours ago</td>
                                            </tr>
                                            {/* More rows */}
                                            <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                    <span className="material-icons-round text-purple-400 text-lg">call_merge</span>
                                                    fix: Payment Gateway Timeout
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-full border border-green-200 dark:border-green-800">Passed</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "98%" }}></div>
                                                        </div>
                                                        <span className="text-xs">98%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs">Yesterday</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Widgets Column */}
                        <div className="col-span-12 lg:col-span-4 space-y-8">
                            {/* Code Quality Trend */}
                            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-border-dark shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Code Quality Trend</h3>
                                    <select className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-border-dark text-xs rounded-md px-2 py-1 outline-none text-gray-700 dark:text-gray-300">
                                        <option>Last 7 days</option>
                                        <option>Last 30 days</option>
                                    </select>
                                </div>
                                <div className="relative h-48 w-full">
                                    <canvas ref={chartRef} id="qualityChart"></canvas>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                                        <div className="text-xs text-gray-500">Security</div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">98/100</div>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                                        <div className="text-xs text-gray-500">Maintainability</div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">82/100</div>
                                    </div>
                                </div>
                            </div>

                            {/* Live Insights */}
                            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-border-dark shadow-sm h-fit">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Live Insights</h3>
                                <div className="space-y-6">
                                    <div className="flex space-x-3 relative">
                                        <div className="absolute left-2.5 top-8 bottom-[-20px] w-0.5 bg-gray-200 dark:bg-gray-800"></div>
                                        <div className="relative flex-shrink-0 z-10">
                                            <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white dark:border-surface-dark flex items-center justify-center">
                                                <span className="material-icons-round text-white text-[10px]">info</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 pb-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Duplicate logic found</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">In <code>payment.service.ts</code>, lines 45-58 are identical to <code>order.service.ts</code>.</p>
                                            <span className="text-[10px] text-gray-400 mt-2 block">10 mins ago</span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3 relative">
                                        <div className="relative flex-shrink-0 z-10">
                                            <div className="w-5 h-5 rounded-full bg-red-500 border-2 border-white dark:border-surface-dark flex items-center justify-center">
                                                <span className="material-icons-round text-white text-[10px]">warning</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 pb-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Vulnerability Detected</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Potential SQL injection in new PR #2405.</p>
                                            <span className="text-[10px] text-gray-400 mt-2 block">45 mins ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-primary to-orange-600 rounded-xl p-6 text-white shadow-lg">
                                <div className="flex items-center space-x-3 mb-3">
                                    <span className="material-icons-round bg-white/20 p-1.5 rounded-lg">emoji_events</span>
                                    <h3 className="font-semibold">Team Velocity</h3>
                                </div>
                                <p className="text-sm text-white/90 mb-4">Your team merged 15 PRs today! That's 20% more than average.</p>
                                <button className="w-full py-2 bg-white text-primary text-sm font-bold rounded-lg shadow-sm hover:bg-gray-50 transition">View Report</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}