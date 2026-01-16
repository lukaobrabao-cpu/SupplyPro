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

    // Enterprise Status Colors
    const statusStyles = {
        success: "border-l-emerald-500",
        warning: "border-l-amber-500",
        danger: "border-l-rose-500",
        neutral: "border-l-slate-500"
    };

    const trendColor = isPositive ? "text-emerald-600" : isNegative ? "text-rose-600" : "text-slate-500";

    return (
        <div className={cn(
            "bg-white dark:bg-[#0f172a] rounded-lg border border-border shadow-sm p-5 flex flex-col gap-3 transition-all hover:border-border/80 border-l-4",
            statusStyles[status],
            className
        )}>
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</span>
                {Icon && <div className="p-2 bg-muted/50 rounded-md"><Icon className="h-4 w-4 text-primary" /></div>}
            </div>

            <div className="flex items-end justify-between mt-1">
                <div className="text-3xl font-bold tracking-tight text-foreground font-heading">{value}</div>
            </div>

            {trend !== undefined && (
                <div className="flex items-center gap-2 mt-1 pt-3 border-t border-border/40">
                    <span
                        className={cn(
                            "flex items-center text-[11px] font-bold",
                            trendColor
                        )}
                    >
                        {isPositive && <ArrowUp className="h-3 w-3 mr-1" />}
                        {isNegative && <ArrowDown className="h-3 w-3 mr-1" />}
                        {isNeutral && <Minus className="h-3 w-3 mr-1" />}
                        {Math.abs(trend)}%
                    </span>
                    <span className="text-[11px] text-muted-foreground font-medium">{trendLabel}</span>
                </div>
            )}
        </div>
    );
}
