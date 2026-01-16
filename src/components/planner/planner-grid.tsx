"use client";

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, AlertCircle, AlertTriangle, MoreHorizontal, Download, Filter, Search, ChevronDown, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { EditableCell } from "../action-plan/editable-cell";

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
    onDataChange: (id: string, field: keyof PlannerStatusData, value: string | number) => void;
}

export function PlannerGrid({ data, onDataChange }: PlannerGridProps) {
    const [sortConfig, setSortConfig] = useState<{ key: keyof PlannerStatusData; direction: 'asc' | 'desc' } | null>(null);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
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
                                    // @ts-ignore
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
                                <td className="px-4 py-3 min-w-[200px]">
                                    <div className="flex flex-row items-center gap-2">
                                        <EditableCell
                                            value={row.plannerName}
                                            onSave={(val) => onDataChange(row.id, 'plannerName', val)}
                                            className="font-semibold text-foreground text-sm p-0 min-h-0 hover:bg-transparent hover:underline decoration-dashed decoration-muted-foreground/30 underline-offset-4"
                                        />
                                        <EditableCell
                                            type="select"
                                            options={["Senior", "Pleno", "Junior"]}
                                            value={row.plannerLevel}
                                            onSave={(val) => onDataChange(row.id, 'plannerLevel', val)}
                                            className={cn(
                                                "text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide border w-[60px] text-center min-h-0 h-auto cursor-pointer",
                                                "text-foreground bg-background hover:bg-muted", // Default cleaner style
                                                // Specific styles for select contrast
                                                "focus:ring-2 focus:ring-primary/20",
                                                row.plannerLevel === 'Senior' ? "border-purple-200 text-purple-700 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800" :
                                                    row.plannerLevel === 'Pleno' ? "border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800" :
                                                        "border-slate-200 text-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                                            )}
                                        />
                                    </div>
                                </td>

                                {/* Team Leader */}
                                <td className="px-4 py-3 min-w-[150px]">
                                    <EditableCell
                                        value={row.teamLeader}
                                        onSave={(val) => onDataChange(row.id, 'teamLeader', val)}
                                        className="text-muted-foreground font-medium text-xs p-0 min-h-0 hover:bg-transparent hover:text-primary transition-colors"
                                    />
                                </td>

                                {/* Qty Suppliers */}
                                <td className="px-4 py-3 text-center w-[100px]">
                                    <div className="flex justify-center">
                                        <EditableCell
                                            type="number"
                                            value={row.qtySuppliers}
                                            onSave={(val) => onDataChange(row.id, 'qtySuppliers', Number(val))}
                                            className="text-center bg-slate-100 dark:bg-slate-800 border border-border rounded-md px-2 py-0.5 text-xs font-bold min-h-fit w-auto inline-block hover:border-primary/50"
                                        />
                                    </div>
                                </td>

                                {/* OTIF < 95 (Critical) */}
                                <td className="px-4 py-3 text-center w-[120px]">
                                    <div className="flex justify-center">
                                        <div className={cn(
                                            "flex items-center justify-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold border transition-all w-fit pointer-events-none",
                                            row.suppliersOtifLow > 0
                                                ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900 shadow-sm"
                                                : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900"
                                        )}>
                                            {row.suppliersOtifLow > 0 ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
                                            <div className="pointer-events-auto">
                                                <EditableCell
                                                    type="number"
                                                    value={row.suppliersOtifLow}
                                                    onSave={(val) => onDataChange(row.id, 'suppliersOtifLow', Number(val))}
                                                    className="w-6 text-center bg-transparent border-none p-0 min-h-0 hover:bg-black/5 rounded-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Inconsistencies */}
                                <td className="px-4 py-3 text-center font-medium w-[100px]">
                                    <div className="flex items-center justify-center gap-0.5">
                                        <EditableCell
                                            type="number"
                                            value={row.inconsistencies}
                                            onSave={(val) => onDataChange(row.id, 'inconsistencies', Number(val))}
                                            className={cn(
                                                "text-center w-8 p-0 min-h-0 hover:bg-muted/50 rounded",
                                                row.inconsistencies > 0 ? "text-amber-600 dark:text-amber-400 font-bold" : "text-muted-foreground"
                                            )}
                                        />
                                        {row.inconsistencies > 0 && <AlertTriangle size={12} className="text-amber-500" />}
                                    </div>
                                </td>

                                {/* Shortages */}
                                <td className="px-4 py-3 text-center w-[100px]">
                                    <EditableCell
                                        type="number"
                                        value={row.shortages}
                                        onSave={(val) => onDataChange(row.id, 'shortages', Number(val))}
                                        className={cn(
                                            "text-center w-full p-0 min-h-0 hover:bg-muted/50 rounded",
                                            "font-bold tabular-nums",
                                            row.shortages > 5 ? "text-rose-600 dark:text-rose-400" : "text-foreground"
                                        )}
                                    />
                                </td>

                                {/* Delayed Lines */}
                                <td className="px-4 py-3 text-center w-[100px]">
                                    <EditableCell
                                        type="number"
                                        value={row.linesDelayed}
                                        onSave={(val) => onDataChange(row.id, 'linesDelayed', Number(val))}
                                        className="text-center text-muted-foreground p-0 min-h-0 hover:bg-muted/50 rounded"
                                    />
                                </td>

                                {/* Leftovers Value */}
                                <td className="px-4 py-3 text-right font-medium text-foreground/80 tabular-nums min-w-[120px]">
                                    <div className="flex items-center justify-end gap-1 group/edit cursor-pointer">
                                        <span className="text-[10px] text-muted-foreground pt-0.5">R$</span>
                                        <EditableCell
                                            type="number"
                                            value={row.leftoversValue}
                                            onSave={(val) => onDataChange(row.id, 'leftoversValue', Number(val))}
                                            className="text-right p-0 min-h-0 hover:bg-muted/50 rounded px-1 -mr-1"
                                        />
                                    </div>
                                </td>

                                {/* Opportunity Value */}
                                <td className="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400 tabular-nums relative min-w-[140px]">
                                    <div className="flex items-center justify-end gap-1">
                                        <span className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70 pt-0.5">R$</span>
                                        <EditableCell
                                            type="number"
                                            value={row.opportunityValue}
                                            onSave={(val) => onDataChange(row.id, 'opportunityValue', Number(val))}
                                            className="text-right p-0 min-h-0 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded px-1 -mr-1"
                                        />
                                    </div>
                                    {row.opportunityValue > 1000000 && (
                                        <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" title="High Opportunity" />
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
