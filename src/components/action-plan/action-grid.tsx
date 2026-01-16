"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Filter, Save, AlertCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditableCell } from "./editable-cell";
import { StatusToggle, StatusType } from "./status-indicator";

interface ActionRow {
    id: string;
    process: string;
    teamLeader: string;
    planner: string;
    supplier: string;
    pnOrReason: string;
    currentIndex: string; // "R$ 2M" or "92%"
    history: string;
    finalIndex: string; // Highlight green if filled
    startDate: string;
    endDate: string;
    status: StatusType;
    observation: string;
    isNew?: boolean;
}

const PROCESS_OPTIONS = ["OTIF", "Inconsistências NF", "Inventário S&OP", "Atrasos"];
const TL_OPTIONS = ["Carlos Mendes", "Mariana Costa", "Wilson", "Director Level"];
const PLANNER_OPTIONS_MAP: Record<string, string[]> = {
    "Carlos Mendes": ["Ana Silva", "Elena Torres"],
    "Mariana Costa": ["Bruno Souza", "Carla Dias", "Daniel Rocha"],
    "Wilson": ["Henrique"],
    "Director Level": ["All"]
};

const INITIAL_DATA: ActionRow[] = [
    { id: "1", process: "OTIF", teamLeader: "Wilson", planner: "Henrique", supplier: "Romi", pnOrReason: "-", currentIndex: "R$ 2M", history: "Descrever ações", finalIndex: "1.3M", startDate: "2026-01-15", endDate: "", status: "not_started", observation: "Adicionar nota..." },
    { id: "2", process: "OTIF", teamLeader: "Carlos Mendes", planner: "Ana Silva", supplier: "Tech", pnOrReason: "Late", currentIndex: "92%", history: "Meeting scheduled", finalIndex: "", startDate: "2026-01-10", endDate: "2026-01-20", status: "in_progress", observation: "" },
    { id: "3", process: "Inconsistências NF", teamLeader: "Mariana Costa", planner: "Carla Dias", supplier: "LogiTrans", pnOrReason: "Doc Error", currentIndex: "15", history: "Correção solicitada", finalIndex: "0", startDate: "2026-01-05", endDate: "2026-01-08", status: "completed", observation: "Resolvido" },
    { id: "4", process: "Inventário S&OP", teamLeader: "Carlos Mendes", planner: "Elena Torres", supplier: "-", pnOrReason: "Review", currentIndex: "98%", history: "Analysis pending", finalIndex: "", startDate: "", endDate: "", status: "nearly_done", observation: "" },
    { id: "5", process: "Atrasos", teamLeader: "Mariana Costa", planner: "Bruno Souza", supplier: "Bolt Co.", pnOrReason: "Production", currentIndex: "5 days", history: "Expediting", finalIndex: "2 days", startDate: "2026-01-12", endDate: "", status: "in_progress", observation: "Urgent" },
];

export function ActionPlanGrid() {
    const [data, setData] = useState<ActionRow[]>(INITIAL_DATA);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterProcess, setFilterProcess] = useState("All");
    const [filterTL, setFilterTL] = useState("All");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const filteredData = useMemo(() => {
        return data.filter(row => {
            const matchesSearch = Object.values(row).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchesProcess = filterProcess === "All" || row.process === filterProcess;
            const matchesTL = filterTL === "All" || row.teamLeader === filterTL;

            return matchesSearch && matchesProcess && matchesTL;
        });
    }, [data, searchTerm, filterProcess, filterTL]);

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleUpdate = (id: string, field: keyof ActionRow, value: any) => {
        setData(prev => prev.map(row => {
            if (row.id === id) {
                // If Team Leader changes, reset Planner
                if (field === "teamLeader" && value !== row.teamLeader) {
                    return { ...row, [field]: value, planner: "" };
                }
                return { ...row, [field]: value };
            }
            return row;
        }));
        setHasUnsavedChanges(true);
    };

    const handleAddRow = () => {
        const newRow: ActionRow = {
            id: Math.random().toString(36).substr(2, 9),
            process: "OTIF",
            teamLeader: "-",
            planner: "-",
            supplier: "",
            pnOrReason: "",
            currentIndex: "-",
            history: "",
            finalIndex: "",
            startDate: new Date().toISOString().split('T')[0],
            endDate: "",
            status: "not_started",
            observation: "",
            isNew: true
        };
        setData([newRow, ...data]);
        setHasUnsavedChanges(true);
    };

    const handleSave = () => {
        // Mock API call
        setTimeout(() => {
            setHasUnsavedChanges(false);
            setData(prev => prev.map(r => ({ ...r, isNew: false })));
        }, 500);
    };

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                    {/* Filters */}
                    <select
                        className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                        value={filterProcess}
                        onChange={(e) => setFilterProcess(e.target.value)}
                    >
                        <option value="All">All Processes</option>
                        {PROCESS_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select
                        className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                        value={filterTL}
                        onChange={(e) => setFilterTL(e.target.value)}
                    >
                        <option value="All">All Team Leaders</option>
                        {TL_OPTIONS.map(tl => <option key={tl} value={tl}>{tl}</option>)}
                    </select>
                    <div className="relative flex-1 lg:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            placeholder="Buscar..."
                            className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none bg-background"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    onClick={handleAddRow}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm font-medium text-sm whitespace-nowrap"
                >
                    <Plus size={16} /> Nova Ação
                </button>
            </div>

            {/* Grid */}
            <div className="bg-white dark:bg-[#0f172a] border border-border rounded-sm shadow-sm overflow-hidden relative">
                {/* Removed overflow-x-auto to force fit, added table-fixed */}
                <div className="w-full">
                    <table className="w-full text-[11px] text-left border-collapse table-fixed font-medium">
                        <thead className="bg-[#f1f5f9] dark:bg-[#1e293b] text-[#334155] dark:text-slate-200 uppercase text-[10px] tracking-wider font-bold border-b border-border">
                            <tr>
                                <th className="px-2 py-2 w-[12%] border-r border-border/50">Processo</th>
                                <th className="px-2 py-2 w-[10%] border-r border-border/50">Team Leader</th>
                                <th className="px-2 py-2 w-[10%] border-r border-border/50">Planner</th>
                                <th className="px-2 py-2 w-[10%] border-r border-border/50">Fornecedor</th>
                                <th className="px-2 py-2 w-[8%] border-r border-border/50">PN / Motivo</th>
                                <th className="px-2 py-2 w-[7%] text-center border-r border-border/50">Índice Atual</th>
                                <th className="px-2 py-2 w-[15%] border-r border-border/50">Histórico de Ações</th>
                                <th className="px-2 py-2 w-[7%] text-center border-r border-border/50">Índice Final</th>
                                <th className="px-2 py-2 w-[8%] text-center border-r border-border/50">Início</th>
                                <th className="px-2 py-2 w-[8%] text-center border-r border-border/50">Fim</th>
                                <th className="px-1 py-2 w-[5%] text-center border-r border-border/50">Status</th>
                                <th className="px-2 py-2 w-[10%]">Observação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {paginatedData.map((row, index) => (
                                <tr key={row.id} className={cn(
                                    "group transition-colors h-9",
                                    row.status === "cancelled" ? "opacity-60 bg-red-50/50 dark:bg-red-950/10 grayscale-[0.5]" : "hover:bg-blue-50/50 dark:hover:bg-blue-950/20",
                                    index % 2 === 0 ? "bg-white dark:bg-[#0f172a]" : "bg-[#f8fafc] dark:bg-[#1e293b]/30" // Zebra Striping
                                )}>
                                    <td className="px-2 py-0 border-r border-border/30">
                                        <EditableCell
                                            value={row.process}
                                            onSave={(v) => handleUpdate(row.id, "process", v)}
                                            type="select"
                                            options={PROCESS_OPTIONS}
                                            className="font-bold text-[#0f172a] dark:text-white text-[11px]"
                                        />
                                    </td>
                                    <td className="px-2 py-1.5 border-r border-border/30">
                                        <EditableCell
                                            value={row.teamLeader}
                                            onSave={(v) => handleUpdate(row.id, "teamLeader", v)}
                                            type="select"
                                            options={TL_OPTIONS}
                                            className="text-xs"
                                        />
                                    </td>
                                    <td className="px-2 py-0 border-r border-border/30">
                                        <EditableCell
                                            value={row.planner}
                                            onSave={(v) => handleUpdate(row.id, "planner", v)}
                                            type="select"
                                            options={PLANNER_OPTIONS_MAP[row.teamLeader] || []}
                                            placeholder="Selecione TL"
                                            className="text-[11px]"
                                        />
                                    </td>
                                    <td className="px-2 py-0 border-r border-border/30">
                                        <EditableCell
                                            value={row.supplier}
                                            onSave={(v) => handleUpdate(row.id, "supplier", v)}
                                            placeholder="—"
                                            className="text-[11px]"
                                        />
                                    </td>
                                    <td className="px-2 py-0 border-r border-border/30">
                                        <EditableCell
                                            value={row.pnOrReason}
                                            onSave={(v) => handleUpdate(row.id, "pnOrReason", v)}
                                            placeholder="Motivo"
                                            className="text-[11px]"
                                        />
                                    </td>
                                    <td className="px-2 py-0 text-center font-semibold text-xs text-[#0f172a] dark:text-white bg-blue-50/30 dark:bg-blue-900/10 border-r border-border/30">
                                        {row.currentIndex}
                                    </td>
                                    <td className="px-2 py-0 border-r border-border/30">
                                        <EditableCell
                                            value={row.history}
                                            onSave={(v) => handleUpdate(row.id, "history", v)}
                                            placeholder="Descrever..."
                                            className="text-[#334155] dark:text-slate-200 focus:text-foreground text-[11px] font-medium"
                                        />
                                    </td>
                                    <td className="px-2 py-0 border-r border-border/30 text-center">
                                        <EditableCell
                                            value={row.finalIndex}
                                            onSave={(v) => handleUpdate(row.id, "finalIndex", v)}
                                            placeholder="—"
                                            className={cn("font-bold text-center text-[10px]", row.finalIndex ? "text-emerald-700 dark:text-emerald-400" : "")}
                                        />
                                    </td>
                                    <td className="px-1 py-0 border-r border-border/30">
                                        <EditableCell
                                            value={row.startDate}
                                            onSave={(v) => handleUpdate(row.id, "startDate", v)}
                                            type="date"
                                            className="text-[10px] text-center p-0"
                                        />
                                    </td>
                                    <td className="px-1 py-0 border-r border-border/30">
                                        <EditableCell
                                            value={row.endDate}
                                            onSave={(v) => handleUpdate(row.id, "endDate", v)}
                                            type="date"
                                            className="text-[10px] text-center p-0"
                                        />
                                    </td>
                                    <td className="px-1 py-0 text-center border-r border-border/30 bg-white/50 dark:bg-black/20">
                                        <div className="flex justify-center scale-75">
                                            <StatusToggle
                                                status={row.status}
                                                onToggle={(s) => handleUpdate(row.id, "status", s)}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-2 py-0">
                                        <EditableCell
                                            value={row.observation}
                                            onSave={(v) => handleUpdate(row.id, "observation", v)}
                                            placeholder="..."
                                            className="text-[10px] text-muted-foreground"
                                        />
                                    </td>
                                </tr>
                            ))}
                            {paginatedData.length === 0 && (
                                <tr>
                                    <td colSpan={12} className="px-6 py-8 text-center text-muted-foreground">
                                        No actions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Sticky Footer for Save */}
                {hasUnsavedChanges && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground text-background px-6 py-2 rounded-full shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-2 fade-in">
                        <AlertCircle size={16} className="text-yellow-400" />
                        <span className="text-sm font-medium">Unsaved changes</span>
                        <button
                            onClick={handleSave}
                            className="ml-2 px-3 py-1 bg-primary text-white rounded text-xs font-bold hover:bg-primary/90"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>

            {/* Pagination / Footer Info */}
            <div className="flex justify-between items-center text-sm text-muted-foreground px-2">
                <span>Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} actions</span>
                <div className="flex gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(c => c - 1)}
                        className="px-3 py-1 border border-border rounded hover:bg-muted disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        disabled={currentPage * itemsPerPage >= filteredData.length}
                        onClick={() => setCurrentPage(c => c + 1)}
                        className="px-3 py-1 border border-border rounded hover:bg-muted disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
