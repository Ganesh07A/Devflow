export default function CodeQualityChart() {
    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-border-dark shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    Code Quality Trend
                </h3>
                <select className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-border-dark text-xs rounded-md px-2 py-1 outline-none text-gray-700 dark:text-gray-300">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                </select>
            </div>
            <div className="relative h-48 w-full flex items-end justify-between space-x-2 px-2">
                {/* Simple CSS Bar Chart Mock */}
                {[65, 70, 68, 74, 78, 80, 82].map((height, i) => (
                    <div key={i} className="w-full bg-blue-100 dark:bg-blue-900/20 rounded-t-sm relative group">
                        <div
                            className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500 hover:bg-orange-400"
                            style={{ height: `${height}%` }}
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {height}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                    <div className="text-xs text-gray-500">Security</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                        98/100
                    </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                    <div className="text-xs text-gray-500">Maintainability</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                        82/100
                    </div>
                </div>
            </div>
        </div>
    );
}
