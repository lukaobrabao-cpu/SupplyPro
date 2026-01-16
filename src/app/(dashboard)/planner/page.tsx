"use client";

import { useState } from "react";
import { Download, Plus, Search, Filter, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlannerData {
    id: string;
    planner: string;
    teamLeader: string;
    qtySuppliers: number;
    otif: number;
    inconsistencies: number;
    shortages: number;
    linesDelayed: number;
}

const initialData: PlannerData[] = [
    { id: "1", planner: "Ana Silva", teamLeader: "Carlos Mendes", qtySuppliers: 45, otif: 98.5, inconsistencies: 0, shortages: 2, linesDelayed: 5 },
    { id: "2", planner: "Bruno Souza", teamLeader: "Carlos Mendes", qtySuppliers: 32, otif: 92.0, inconsistencies: 3, shortages: 8, linesDelayed: 12 },
    { id: "3", planner: "Carla Dias", teamLeader: "Mariana Costa", qtySuppliers: 50, otif: 94.5, inconsistencies: 1, shortages: 5, linesDelayed: 3 },
    { id: "4", planner: "Daniel Rocha", teamLeader: "Mariana Costa", qtySuppliers: 28, otif: 88.0, inconsistencies: 5, shortages: 15, linesDelayed: 20 },
    { id: "5", planner: "Elena Torres", teamLeader: "Carlos Mendes", qtySuppliers: 40, otif: 96.0, inconsistencies: 0, shortages: 1, linesDelayed: 2 },
];

export default function PlannerPage() {
    const [data, setData] = useState<PlannerData[]>(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    // Filters
    const filteredData = data.filter(item =>
        item.planner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.teamLeader.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddRow = () => {
        const newRow: PlannerData = {
            id: Math.random().toString(36).substr(2, 9),
            planner: "New Planner",
            teamLeader: "Select TL",
            qtySuppliers: 0,
            otif: 100,
            inconsistencies: 0,
            shortages: 0,
            linesDelayed: 0
        };
        setData([newRow, ...data]);
        setEditingId(newRow.id);
    };

    const handleSave = () => {
        setEditingId(null);
        // Here you would save to backend
    };

    const handleExport = () => {
        const headers = ["Planner,Team Leader,Suppliers,OTIF,Inconsistencies,Shortages,Delayed Lines"];
        const csvContent = data.map(row =>
            `${row.planner},${row.teamLeader},${row.qtySuppliers},${row.otif},${row.inconsistencies},${row.shortages},${row.linesDelayed}`
        ).join("\n");

        const blob = new Blob([headers + "\n" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "planner_status.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Status Planner</h1>
                    <p className="text-muted-foreground">Manage planner performance and operational metrics.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleAddRow} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                        <Plus size={16} /> Add Row
                    </button>
                    <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-sm font-medium transition-colors border border-border">
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Filters / Toolbar */}
            <div className="bg-card p-4 rounded-xl border border-border/50 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search planner or team leader..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                        <Filter size={20} />
                    </button>
                    {editingId && (
                        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                            <Save size={16} /> Save Changes
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border/50">
                            <tr>
                                <th className="px-6 py-4">Planner</th>
                                <th className="px-6 py-4">Team Leader</th>
                                <th className="px-6 py-4 text-center">Qty Suppliers</th>
                                <th className="px-6 py-4 text-center">OTIF %</th>
                                <th className="px-6 py-4 text-center">Inconsistencies NF</th>
                                <th className="px-6 py-4 text-center">Shortages</th>
                                <th className="px-6 py-4 text-center">Lines Delayed</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {filteredData.map((row) => {
                                const isOriginal = initialData.some(d => d.id === row.id);
                                const isCriticalOtif = row.otif < 95;
                                const isCriticalShortage = row.shortages > 5;
                                const isEditing = editingId === row.id;

                                return (
                                    <tr key={row.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-foreground">
                                            {isEditing ? <input className="bg-muted p-1 rounded w-full" defaultValue={row.planner} /> : row.planner}
                                        </td>
                                        <td className="px-6 py-4">
                                            {isEditing ? <input className="bg-muted p-1 rounded w-full" defaultValue={row.teamLeader} /> : row.teamLeader}
                                        </td>
                                        <td className="px-6 py-4 text-center tabular-nums">
                                            {isEditing ? <input className="bg-muted p-1 rounded w-20 text-center" defaultValue={row.qtySuppliers} /> : row.qtySuppliers}
                                        </td>
                                        <td className={cn("px-6 py-4 text-center font-bold tabular-nums", isCriticalOtif ? "text-rose-500" : "text-emerald-500")}>
                                            {isEditing ? <input className="bg-muted p-1 rounded w-20 text-center" defaultValue={row.otif} /> : `${row.otif}%`}
                                        </td>
                                        <td className="px-6 py-4 text-center tabular-nums text-muted-foreground">
                                            {isEditing ? <input className="bg-muted p-1 rounded w-20 text-center" defaultValue={row.inconsistencies} /> : row.inconsistencies}
                                        </td>
                                        <td className={cn("px-6 py-4 text-center font-bold tabular-nums", isCriticalShortage ? "text-rose-500" : "text-foreground")}>
                                            {isEditing ? <input className="bg-muted p-1 rounded w-20 text-center" defaultValue={row.shortages} /> : row.shortages}
                                        </td>
                                        <td className="px-6 py-4 text-center tabular-nums">
                                            {isEditing ? <input className="bg-muted p-1 rounded w-20 text-center" defaultValue={row.linesDelayed} /> : row.linesDelayed}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setEditingId(isEditing ? null : row.id)}
                                                className="text-primary hover:underline font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                {isEditing ? "Done" : "Edit"}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                                        No planners found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
