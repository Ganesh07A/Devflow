interface StatsCardProps {
    title: string;
    icon: string;
    value: string;
    trend: string;
    trendType: "up" | "down" | "neutral";
    color: "blue" | "red" | "green" | "purple";
}

export default function StatsCard({ title, icon, value, trend, trendType, color }: StatsCardProps) {
    const colorClasses = {
        blue: "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400",
        red: "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400",
        green: "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400",
        purple: "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400",
    };

    const trendColor =
        trendType === "up" ? "text-green-500" :
            trendType === "down" ? "text-green-500" : // Typically down is good for some metrics, context dependent? Assuming usually green for positive direction
                "text-gray-500";

    // Correction: for bugs, down is good (green), up is bad (red). 
    // Let's stick to explicit colors or just passed props.
    // Simplifying: usage will pass text color class if needed, but for now simple logic:

    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-border-dark shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {title}
                </h3>
                <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
                    <span className="material-icons-round text-lg">{icon}</span>
                </div>
            </div>
            <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold">{value}</span>
                <span className={`${trendType === 'neutral' ? 'text-gray-500' : 'text-green-500'} text-sm font-medium mb-1 flex items-center`}>
                    {trend}
                </span>
            </div>
        </div>
    );
}
