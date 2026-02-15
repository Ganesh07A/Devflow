"use client";

import { usePathname } from "next/navigation";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");

    return (
        <div className={isDashboard ? "" : "pt-16"}>
            {children}
        </div>
    );
}
