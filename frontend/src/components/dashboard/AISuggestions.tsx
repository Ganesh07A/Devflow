export default function AISuggestions() {
    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-border-dark flex items-center justify-between bg-gray-50 dark:bg-white/5">
                <div className="flex items-center space-x-3">
                    <span className="bg-primary/20 text-primary p-1.5 rounded-md">
                        <span className="material-icons-round text-sm">auto_awesome</span>
                    </span>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        Active AI Suggestions
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                        PR #2401
                    </span>
                </div>
                <div className="flex space-x-2">
                    <button className="text-xs px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                        View File
                    </button>
                </div>
            </div>
            <div className="p-0 font-mono text-sm bg-gray-50 dark:bg-[#0d1117] text-gray-800 dark:text-gray-300 overflow-x-auto">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 text-xs text-gray-500 font-sans">
                    src/controllers/auth.controller.ts
                </div>
                <div className="flex flex-col">
                    <div className="flex hover:bg-gray-200 dark:hover:bg-white/5 transition-colors">
                        <div className="w-10 text-right pr-3 text-gray-400 select-none border-r border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/50">
                            43
                        </div>
                        <div className="pl-4 py-0.5">
                            {" "}
                            const {"{"} email, password {"}"} = req.body;
                        </div>
                    </div>
                    <div className="flex code-line-highlight">
                        <div className="w-10 text-right pr-3 text-red-400 select-none border-r border-gray-200 dark:border-gray-800 bg-red-50 dark:bg-red-900/20">
                            44
                        </div>
                        <div className="pl-4 py-0.5 text-red-700 dark:text-red-200">
                            {" "}
                            const user = await User.findOne({"{"} email: email {"}"});
                        </div>
                    </div>
                    <div className="my-2 mx-4 bg-white dark:bg-[#1E1E22] border border-primary/30 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex items-start space-x-3">
                            <div className="mt-0.5 bg-primary/20 p-1 rounded">
                                <span className="material-icons-round text-primary text-sm">
                                    psychology
                                </span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                    Performance Optimization
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Using <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">lean()</code> is recommended for read-only operations.
                                </p>
                            </div>
                        </div>
                        {/* Simplified for brevity */}
                    </div>
                </div>
            </div>
        </div>
    );
}
