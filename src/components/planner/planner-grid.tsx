"use client";

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, AlertCircle, AlertTriangle, MoreHorizontal, Download, Filter, Search, ChevronDown, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export interface PlannerStatusData {
    id: string;
    plannerName: string;
    plannerAvatar?: string;
    plannerLevel: "Senior" | "Pleno" | "Junior";
    teamLeader: string;
    qtySuppliers: number;
    suppliersOtifLow: number; // Fornecedores OTIF < 95
    inconsistencies: number;
    shortages: number;
    linesDelayed: number;
    leftoversValue: number; // Valor de Sobras
    opportunityValue: number; // Oportunidade
}

interface PlannerGridProps {
    data: PlannerStatusData[];
}

export function PlannerGrid({ data }: PlannerGridProps) {
    const [sortConfig, setSortConfig] = useState<{ key: keyof PlannerStatusData; direction: 'asc' | 'desc' } | null>(null);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        if (a[key]! < b[key]!) return direction === 'asc' ? -1 : 1;
        if (a[key]! > b[key]!) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (key: keyof PlannerStatusData) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-border/60 shadow-sm flex flex-col h-full overflow-hidden animate-in fade-in duration-500">
            {/* Toolbar */}
            <div className="p-4 border-b border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 bg-muted/10">
                <div className="flex items-center gap-2 w-full md:w-96 bg-background border border-border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search planner, TL..."
                        className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted/50 transition-colors shadow-sm">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        Filters
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-[#0f172a] hover:bg-primary/90 text-white border border-transparent rounded-lg text-sm font-medium transition-colors shadow-sm">
                        <Download className="h-4 w-4" />
                        Export Excel
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="overflow-auto flex-1">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-[#f8fafc] dark:bg-[#1e293b] sticky top-0 z-10 shadow-sm">
                        <tr>
                            {[
                                { key: 'plannerName', label: 'Planner' },
                                { key: 'teamLeader', label: 'Team Leader' },
                                { key: 'qtySuppliers', label: 'Suppliers', align: 'center' },
                                { key: 'suppliersOtifLow', label: 'OTIF < 95%', align: 'center' },
                                { key: 'inconsistencies', label: 'Inconsist.', align: 'center' },
                                { key: 'shortages', label: 'Shortages', align: 'center' },
                                { key: 'linesDelayed', label: 'Delayed Lines', align: 'center' },
                                { key: 'leftoversValue', label: 'Leftovers (R$)', align: 'right' },
                                { key: 'opportunityValue', label: 'Opportunity (R$)', align: 'right' },
                            ].map((col) => (
                                <th
                                    key={col.key}
                                    className={cn(
                                        "px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60 hover:bg-muted/50 cursor-pointer transition-colors select-none whitespace-nowrap",
                                        col.align === 'center' && "text-center",
                                        col.align === 'right' && "text-right"
                                    )}
                                    onClick={() => handleSort(col.key as keyof PlannerStatusData)}
                                >
                                    <div className={cn("flex items-center gap-1", col.align === 'center' && "justify-center", col.align === 'right' && "justify-end")}>
                                        {col.label}
                                        {sortConfig?.key === col.key && (
                                            sortConfig.direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                        {sortedData.map((row) => (
                            <tr key={row.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group">
                                {/* Planner */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 border border-border shadow-sm">
                                            {row.plannerName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground">{row.plannerName}</span>
                                            <span className={cn(
                                                "text-[10px] w-fit px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide border",
                                                row.plannerLevel === 'Senior' ? "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800" :
                                                    row.plannerLevel === 'Pleno' ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800" :
                                                        "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                                            )}>
                                                {row.plannerLevel}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Team Leader */}
                                <td className="px-4 py-3 text-muted-foreground font-medium text-xs">
                                    {row.teamLeader}
                                </td>

                                {/* Qty Suppliers */}
                                <td className="px-4 py-3 text-center">
                                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs border border-border">
                                        {row.qtySuppliers}
                                    </span>
                                </td>

                                {/* OTIF < 95 (Critical) */}
                                <td className="px-4 py-3 text-center">
                                    <div className={cn(
                                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all",
                                        row.suppliersOtifLow > 0
                                            ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900 shadow-sm"
                                            : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900"
                                    )}>
                                        {row.suppliersOtifLow > 0 ? (
                                            <>
                                                <AlertCircle size={14} />
                                                {row.suppliersOtifLow} Critical
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 size={14} />
                                                0
                                            </>
                                        )}
                                    </div>
                                </td>

                                {/* Inconsistencies */}
                                <td className="px-4 py-3 text-center font-medium">
                                    {row.inconsistencies > 0 ? (
                                        <span className="text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                                            {row.inconsistencies}
                                            <AlertTriangle size={12} />
                                        </span>
                                    ) : (
                                        <span className="text-muted-foreground/50">-</span>
                                    )}
                                </td>

                                {/* Shortages */}
                                <td className="px-4 py-3 text-center">
                                    <span className={cn(
                                        "font-bold tabular-nums",
                                        row.shortages > 5 ? "text-rose-600 dark:text-rose-400" : "text-foreground"
                                    )}>
                                        {row.shortages}
                                    </span>
                                </td>

                                {/* Delayed Lines */}
                                <td className="px-4 py-3 text-center text-muted-foreground">
                                    {row.linesDelayed}
                                </td>

                                {/* Leftovers Value */}
                                <td className="px-4 py-3 text-right font-medium text-emerald-600 dark:text-emerald-400 tabular-nums">
                                    {formatCurrency(row.leftoversValue)}
                                </td>

                                {/* Opportunity Value */}
                                <td className="px-4 py-3 text-right font-bold text-foreground tabular-nums relative">
                                    {formatCurrency(row.opportunityValue)}
                                    {row.opportunityValue > 1000000 && (
                                        <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" title="High Opportunity" />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer - Enterprise Summary */}
            <div className="bg-[#f8fafc] dark:bg-[#1e293b] border-t border-border/60 p-3 flex justify-end gap-6 text-xs text-muted-foreground">
                <div className="flex gap-2">
                    <span>Total Planners: <strong className="text-foreground">{data.length}</strong></span>
                </div>
                <div className="flex gap-2">
                    <span>Critical OTIF: <strong className="text-rose-600">{data.reduce((acc, curr) => acc + curr.suppliersOtifLow, 0)}</strong> vendors</span>
                </div>
                <div className="flex gap-2">
                    <span>Total Opportunity: <strong className="text-blue-600">{formatCurrency(data.reduce((acc, curr) => acc + curr.opportunityValue, 0))}</strong></span>
                </div>
            </div>
        </div>
    );
}
