export default function TeamVelocity() {
    return (
        <div className="bg-gradient-to-br from-primary to-orange-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
                <span className="material-icons-round bg-white/20 p-1.5 rounded-lg">
                    emoji_events
                </span>
                <h3 className="font-semibold">Team Velocity</h3>
            </div>
            <p className="text-sm text-white/90 mb-4">
                Your team merged 15 PRs today! That's 20% more than average.
            </p>
            <button className="w-full py-2 bg-white text-primary text-sm font-bold rounded-lg shadow-sm hover:bg-gray-50 transition">
                View Report
            </button>
        </div>
    );
}
