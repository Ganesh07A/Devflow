"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { icon: "dashboard", label: "Overview", href: "/" },
    { icon: "call_split", label: "Pull Requests", href: "/reviews", badge: "12" },
    { icon: "security", label: "Security", href: "/security" },
    { icon: "groups", label: "Team", href: "/team" },
    { icon: "analytics", label: "Insights", href: "/insights" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-surface-dark border-r border-gray-200 dark:border-border-dark flex flex-col h-full z-20">
            <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-border-dark">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-icons-round text-xl">auto_fix_high</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">DevFlow</span>
                </div>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                <Link href="/dashboard" className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${pathname === '/dashboard' ? 'bg-gray-100 dark:bg-white/5 text-primary dark:text-primary font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100'}`}>
                    <span className="material-icons-round">dashboard</span>
                    <span>Overview</span>
                </Link>
                <Link href="#" className="flex items-center space-x-3 px-3 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg transition-colors">
                    <span className="material-icons-round">call_split</span>
                    <span>Pull Requests</span>
                    <span className="ml-auto bg-primary/20 text-primary py-0.5 px-2 text-xs rounded-full font-bold">12</span>
                </Link>
                <Link href="#" className="flex items-center space-x-3 px-3 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg transition-colors">
                    <span className="material-icons-round">security</span>
                    <span>Security</span>
                </Link>
                <Link href="#" className="flex items-center space-x-3 px-3 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg transition-colors">
                    <span className="material-icons-round">groups</span>
                    <span>Team</span>
                </Link>
                <Link href="#" className="flex items-center space-x-3 px-3 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg transition-colors">
                    <span className="material-icons-round">analytics</span>
                    <span>Insights</span>
                </Link>
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-border-dark space-y-2">
                <Link className="flex items-center space-x-3 px-3 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg transition-colors" href="#">
                    <span className="material-icons-round">settings</span>
                    <span>Settings</span>
                </Link>
                <div className="flex items-center p-3 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-border-dark cursor-pointer">
                    <img alt="User Avatar" className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600" src="/landing/avatar_alex.png" />
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Alex Chen</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Senior Eng.</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
