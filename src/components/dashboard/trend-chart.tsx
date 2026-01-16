"use client";

import { cn } from "@/lib/utils";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
];

import { MoreHorizontal } from "lucide-react";

// ... (imports remain the same)

interface TrendChartProps {
    title: string;
    data?: any[];
    color?: string;
    className?: string;
}

export function TrendChart({ title, data: chartData = data, color = "#0f172a", className }: TrendChartProps) {
    return (
        <div className={cn("bg-white dark:bg-[#0f172a] p-6 rounded-xl border border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300", className)}>
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/90">{title}</h3>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground bg-muted/30 px-2 py-1 rounded-md">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                        <span>Trend</span>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>
            <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontWeight: 600 }}
                            dy={12}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontWeight: 600 }}
                            dx={-4}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--popover)',
                                borderColor: 'var(--border)',
                                color: 'var(--popover-foreground)',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                fontSize: '13px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                            itemStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                            cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }}
                            formatter={(value: any) => [`${value}`, 'Value']}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill={`url(#gradient-${title})`}
                            animationDuration={1500}
                            activeDot={{ r: 6, strokeWidth: 4, stroke: 'var(--background)' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
