"use client";

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface KpiCardProps {
    title: string;
    value: string | number;
    trend?: number;
    trendLabel?: string;
    icon?: React.ElementType;
    status?: "success" | "warning" | "danger" | "neutral";
    className?: string;
}

export function KpiCard({
    title,
    value,
    trend,
    trendLabel = "vs last month",
    icon: Icon,
    status = "neutral",
    className,
}: KpiCardProps) {
    const isPositive = trend && trend > 0;
    const isNegative = trend && trend < 0;
    const isNeutral = !trend || trend === 0;

    // Enterprise Status Colors - Refined
    const statusStyles = {
        success: "border-l-emerald-500 from-emerald-50/50 to-white dark:from-emerald-950/10 dark:to-[#0f172a]",
        warning: "border-l-amber-500 from-amber-50/50 to-white dark:from-amber-950/10 dark:to-[#0f172a]",
        danger: "border-l-rose-500 from-rose-50/50 to-white dark:from-rose-950/10 dark:to-[#0f172a]",
        neutral: "border-l-slate-500 from-slate-50/50 to-white dark:from-slate-800/10 dark:to-[#0f172a]"
    };

    const trendColor = isPositive ? "text-emerald-600 dark:text-emerald-400" : isNegative ? "text-rose-600 dark:text-rose-400" : "text-slate-500";

    return (
        <div className={cn(
            "group bg-gradient-to-br rounded-xl border border-border/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between border-l-[6px] relative overflow-hidden",
            statusStyles[status],
            className
        )}>
            {/* Background Decoration */}
            <div className="absolute right-0 top-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                {Icon && <Icon size={120} />}
            </div>

            <div className="flex items-start justify-between relative z-10">
                <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">{title}</span>
                    <div className="text-3xl font-bold tracking-tight text-foreground font-heading mt-1">{value}</div>
                </div>
                {Icon && (
                    <div className="p-2.5 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-lg border border-black/5 dark:border-white/10 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-5 w-5 text-foreground/70" />
                    </div>
                )}
            </div>

            {trend !== undefined && (
                <div className="flex items-center gap-2 mt-4 relative z-10">
                    <div className={cn(
                        "flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/60 dark:bg-black/20 backdrop-blur-sm border border-black/5 dark:border-white/5 shadow-sm",
                        trendColor
                    )}>
                        {isPositive && <ArrowUp className="h-3 w-3 mr-1" />}
                        {isNegative && <ArrowDown className="h-3 w-3 mr-1" />}
                        {isNeutral && <Minus className="h-3 w-3 mr-1" />}
                        {Math.abs(trend)}%
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium">{trendLabel}</span>
                </div>
            )}
        </div>
    );
}
