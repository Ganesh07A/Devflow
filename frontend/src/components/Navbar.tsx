"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const isLanding = pathname === "/";
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    if (pathname.startsWith("/dashboard")) {
        return null;
    }

    // Define styles based on route - now theme aware for landing page too
    const navClasses = isLanding
        ? "fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-black/50 backdrop-blur-md transition-colors duration-300"
        : "fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md transition-colors duration-300";

    const textClasses = isLanding
        ? "text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary"
        : "text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary";

    const logoTextClasses = isLanding
        ? "self-center text-xl font-bold whitespace-nowrap text-gray-900 dark:text-white"
        : "self-center text-xl font-bold whitespace-nowrap dark:text-white";

    return (
        <nav className={navClasses}>
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3">
                <Link className="flex items-center space-x-2 rtl:space-x-reverse" href="/">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="material-icons text-white text-lg">code</span>
                    </div>
                    <span className={logoTextClasses}>
                        DevFlow
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse items-center">
                    <button
                        className={`${textClasses} p-2 rounded-lg transition-colors`}
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <span className="material-icons-round text-xl">light_mode</span>
                        ) : (
                            <span className="material-icons-round text-xl">dark_mode</span>
                        )}
                    </button>
                    <button
                        className={`${textClasses} font-medium rounded-lg text-sm px-4 py-2 text-center md:block hidden transition-colors`}
                        type="button"
                    >
                        Log In
                    </button>
                    <button
                        className="text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center gap-2 transition-colors shadow-lg shadow-orange-500/20"
                        type="button"
                    >
                        Try for free
                        <span className="material-icons text-sm">arrow_forward</span>
                    </button>
                    <button
                        aria-controls="navbar-sticky"
                        aria-expanded={isMenuOpen}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 17 14"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 1h15M1 7h15M1 13h15"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className={`${isMenuOpen ? "block" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`}
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700 bg-transparent">
                        <li>
                            <Link
                                className={`block py-2 px-3 rounded md:p-0 ${isLanding ? 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
                                href="#"
                            >
                                Product
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`block py-2 px-3 rounded md:p-0 ${isLanding ? 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
                                href="#"
                            >
                                Enterprise
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`block py-2 px-3 rounded md:p-0 ${isLanding ? 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
                                href="#"
                            >
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`block py-2 px-3 rounded md:p-0 ${isLanding ? 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
                                href="#"
                            >
                                Docs
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
