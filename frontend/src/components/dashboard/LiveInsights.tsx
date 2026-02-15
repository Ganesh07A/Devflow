export default function LiveInsights() {
    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-border-dark shadow-sm h-fit">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Live Insights
            </h3>
            <div className="space-y-6">
                <div className="flex space-x-3 relative">
                    <div className="absolute left-2.5 top-8 bottom-[-20px] w-0.5 bg-gray-200 dark:bg-gray-800" />
                    <div className="relative flex-shrink-0 z-10">
                        <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white dark:border-surface-dark flex items-center justify-center">
                            <span className="material-icons-round text-white text-[10px]">
                                info
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 pb-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Duplicate logic found
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            In <code>payment.service.ts</code>, lines 45-58 are identical to{" "}
                            <code>order.service.ts</code>.
                        </p>
                        <span className="text-[10px] text-gray-400 mt-2 block">
                            10 mins ago
                        </span>
                    </div>
                </div>
                <div className="flex space-x-3 relative">
                    <div className="absolute left-2.5 top-8 bottom-[-20px] w-0.5 bg-gray-200 dark:bg-gray-800" />
                    <div className="relative flex-shrink-0 z-10">
                        <div className="w-5 h-5 rounded-full bg-red-500 border-2 border-white dark:border-surface-dark flex items-center justify-center">
                            <span className="material-icons-round text-white text-[10px]">
                                warning
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 pb-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Vulnerability Detected
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Potential SQL injection in new PR #2405.
                        </p>
                        <span className="text-[10px] text-gray-400 mt-2 block">
                            45 mins ago
                        </span>
                    </div>
                </div>
                <div className="flex space-x-3 relative">
                    <div className="relative flex-shrink-0 z-10">
                        <div className="w-5 h-5 rounded-full bg-green-500 border-2 border-white dark:border-surface-dark flex items-center justify-center">
                            <span className="material-icons-round text-white text-[10px]">
                                check_circle
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 pb-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Review Completed
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            AI bot finished reviewing 12 files in repo{" "}
                            <code>frontend-v2</code>.
                        </p>
                        <span className="text-[10px] text-gray-400 mt-2 block">
                            1 hr ago
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
