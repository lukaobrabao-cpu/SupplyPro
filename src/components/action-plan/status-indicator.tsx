"use client";

import { cn } from "@/lib/utils";
import { Circle, Moon, PieChart, CheckCircle2, AlertCircle } from "lucide-react";

export type StatusType = "not_started" | "in_progress" | "nearly_done" | "completed" | "cancelled";

interface StatusIndicatorProps {
    status: StatusType;
    onChange?: (newStatus: StatusType) => void;
    readonly?: boolean;
}

export function StatusIndicator({ status, onChange, readonly = false }: StatusIndicatorProps) {
    const handleClick = () => {
        if (readonly || !onChange) return;

        // Cycle logic
        const cycle: Record<StatusType, StatusType> = {
            "not_started": "in_progress",
            "in_progress": "nearly_done",
            "nearly_done": "completed",
            "completed": "cancelled",
            "cancelled": "not_started"
        };

        onChange(cycle[status]);
    };

    return (
        <button
            onClick={handleClick}
            disabled={readonly}
            className={cn(
                "transition-transform hover:scale-110 focus:outline-none rounded-full p-0.5",
                readonly && "cursor-default hover:scale-100 opacity-80"
            )}
            title={status.replace("_", " ")}
        >
            {status === "not_started" && <Circle className="h-5 w-5 text-muted-foreground stroke-2" />}
            {/* Moon icon as proxy for 'half filled' or similar, using Lucide options */}
            {status === "in_progress" && <div className="h-5 w-5 rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-500 rotate-45" style={{ borderRadius: '50%', border: '2px solid', borderColor: '#3b82f6 transparent transparent #3b82f6' }} />}
            {/* Custom CSS circle for better control or just use lucide icons that match */}

            {/* Better Lucide mapping */}
            {/* not_started -> Circle (Empty) */}
            {/* in_progress -> PieChart (approx 25-50%) or custom SVG */}
            {/* nearly_done -> PieChart (75%) */}
            {/* completed -> CheckCircle2 (Solid) */}
        </button>
    );
}

// Rewriting for clearer icons based on "Circle status"
export function StatusIcon({ status, size = 20 }: { status: StatusType, size?: number }) {
    switch (status) {
        case "not_started":
            return <Circle size={size} className="text-slate-400" />;
        case "in_progress":
            // 25% filled look - improvised with Lucide
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                    <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 12Z" />
                    <path d="M21 12h-9V3" />
                </svg>
            ); // Actually simpler to just use a custom SVG for specific "moon" phases if needed.
        // Let's stick to simple Lucide for now
        case "nearly_done":
            return <PieChart size={size} className="text-indigo-600 fill-indigo-600/20" />;
        case "completed":
            return <CheckCircle2 size={size} className="text-emerald-500 fill-emerald-500/20" />;
        case "cancelled":
            return <AlertCircle size={size} className="text-rose-500 fill-rose-500/20" />;
        default:
            return <Circle size={size} className="text-slate-400" />;
    }
}

export function StatusToggle({ status, onToggle, readonly }: { status: StatusType, onToggle: (s: StatusType) => void, readonly?: boolean }) {
    const nextStatus: Record<StatusType, StatusType> = {
        "not_started": "in_progress",
        "in_progress": "nearly_done",
        "nearly_done": "completed",
        "completed": "cancelled",
        "cancelled": "not_started"
    };

    return (
        <button
            onClick={() => !readonly && onToggle(nextStatus[status])}
            disabled={readonly}
            className={cn("transition-transform active:scale-95 group", !readonly && "cursor-pointer hover:opacity-80")}
            title={status === "cancelled" ? "Cancelled" : "Click to change status"}
        >
            {/* Custom SVG Icons to match the "Circle" requirement perfectly */}
            {status === "not_started" && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
                    <circle cx="12" cy="12" r="9" />
                </svg>
            )}
            {status === "in_progress" && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 3v9h9" fill="currentColor" fillOpacity="0.5" />
                    {/* Visual approximation of 1/4 pie */}
                    <path d="M12 12L21 12A9 9 0 0 1 12 21V12Z" fill="currentColor" />
                </svg>
            )}
            {status === "nearly_done" && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-blue-800">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 3A9 9 0 1 1 3 12L12 12V3Z" fill="currentColor" />
                </svg>
            )}
            {status === "completed" && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
                    <circle cx="12" cy="12" r="9" fill="currentColor" />
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
            {status === "cancelled" && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-rose-500 group-hover:text-rose-600">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                    <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )}
        </button>
    )
}
