export default function RecentPRs() {
    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark shadow-sm">
            <div className="p-5 border-b border-gray-200 dark:border-border-dark flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    Recent Pull Requests
                </h3>
                <a
                    className="text-sm text-primary hover:text-orange-400 font-medium"
                    href="#"
                >
                    View All
                </a>
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
                                <span className="material-icons-round text-gray-400 text-lg">
                                    call_split
                                </span>
                                feat: User Authentication
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs px-2 py-1 rounded-full border border-yellow-200 dark:border-yellow-800">
                                    Reviewing
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                        <div
                                            className="bg-green-500 h-1.5 rounded-full"
                                            style={{ width: "85%" }}
                                        />
                                    </div>
                                    <span className="text-xs">85%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-xs">2 hours ago</td>
                        </tr>
                        {/* More rows can be added here dynamically */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
