"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Search, Filter, Save, AlertCircle, Calendar, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditableCell } from "./editable-cell";
import { StatusToggle, StatusType } from "./status-indicator";
import { supabase } from "@/lib/supabase";

interface ActionRow {
    id: string;
    process: string;
    teamLeader: string;
    planner: string;
    plannerLevel?: "JUNIOR" | "PLENO" | "SENIOR";
    supplier: string;
    pnOrReason: string;
    currentIndex: string;
    history: string;
    finalIndex: string;
    startDate: string;
    endDate: string;
    status: StatusType;
    observation: string;
    isNew?: boolean;
}

const PROCESS_OPTIONS = ["OTIF", "Inconsistências NF", "Inventário S&OP", "Atrasos"];
const TL_OPTIONS = ["Carlos Mendes", "Mariana Costa", "Wilson", "Director Level"];

export function ActionPlanGrid() {
    const [data, setData] = useState<ActionRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterProcess, setFilterProcess] = useState("All");
    const [filterTL, setFilterTL] = useState("All");
    const [isSaving, setIsSaving] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        fetchActions();
    }, []);

    const fetchActions = async () => {
        setIsLoading(true);
        const { data: dbData, error } = await supabase
            .from('action_plans')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching actions:', error);
            // Consider showing a toast error here
        }

        if (dbData) {
            const formattedData: ActionRow[] = dbData.map((item: any) => ({
                id: item.id,
                process: item.process,
                teamLeader: item.team_leader,
                planner: item.planner,
                plannerLevel: item.planner_level,
                supplier: item.supplier,
                pnOrReason: item.pn_or_reason,
                currentIndex: item.current_index,
                history: item.history,
                finalIndex: item.final_index,
                startDate: item.start_date,
                endDate: item.end_date,
                status: item.status,
                observation: item.observation,
            }));
            setData(formattedData);
        }
        setIsLoading(false);
    };

    const mapFieldToDb = (field: keyof ActionRow) => {
        const mapping: Record<string, string> = {
            teamLeader: 'team_leader',
            plannerLevel: 'planner_level',
            pnOrReason: 'pn_or_reason',
            currentIndex: 'current_index',
            finalIndex: 'final_index',
            startDate: 'start_date',
            endDate: 'end_date',
        };
        return mapping[field] || field;
    };

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

    const handleUpdate = async (id: string, field: keyof ActionRow, value: any) => {
        // Optimistic Update
        setData(prev => prev.map(row => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        }));

        setIsSaving(true);
        const dbField = mapFieldToDb(field);

        const { error } = await supabase
            .from('action_plans')
            .update({ [dbField]: value })
            .eq('id', id);

        if (error) {
            console.error('Error updating action:', error);
            // Revert on error? For now just log.
        }
        setIsSaving(false);
    };

    const handleAddRow = async () => {
        const newAction = {
            process: "OTIF",
            team_leader: "-",
            planner: "Novo Planner",
            planner_level: "JUNIOR",
            supplier: "",
            pn_or_reason: "",
            current_index: "-",
            history: "",
            final_index: "",
            start_date: new Date().toISOString().split('T')[0],
            end_date: "",
            status: "not_started",
            observation: ""
        };

        const { data: insertedRow, error } = await supabase
            .from('action_plans')
            .insert([newAction])
            .select()
            .single();

        if (error) {
            console.error('Error creating action:', error);
            return;
        }

        if (insertedRow) {
            const mappedRow: ActionRow = {
                id: insertedRow.id,
                process: insertedRow.process,
                teamLeader: insertedRow.team_leader,
                planner: insertedRow.planner,
                plannerLevel: insertedRow.planner_level,
                supplier: insertedRow.supplier,
                pnOrReason: insertedRow.pn_or_reason,
                currentIndex: insertedRow.current_index,
                history: insertedRow.history,
                finalIndex: insertedRow.final_index,
                startDate: insertedRow.start_date,
                endDate: insertedRow.end_date,
                status: insertedRow.status as StatusType,
                observation: insertedRow.observation,
                isNew: true
            };
            setData([mappedRow, ...data]);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary" size={32} /></div>;
    }

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                    <select className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" value={filterProcess} onChange={(e) => setFilterProcess(e.target.value)}>
                        <option value="All">All Processes</option>
                        {PROCESS_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" value={filterTL} onChange={(e) => setFilterTL(e.target.value)}>
                        <option value="All">All Team Leaders</option>
                        {TL_OPTIONS.map(tl => <option key={tl} value={tl}>{tl}</option>)}
                    </select>
                    <div className="relative flex-1 lg:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input placeholder="Buscar..." className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none bg-background" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
                <button onClick={handleAddRow} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm font-medium text-sm whitespace-nowrap">
                    <Plus size={16} /> Nova Ação
                </button>
            </div>

            {/* Grid */}
            <div className="bg-white dark:bg-[#0f172a] border border-border rounded-sm shadow-sm overflow-hidden relative">
                <div className="w-full">
                    <table className="w-full text-[11px] text-left border-collapse table-fixed font-medium">
                        <thead className="bg-[#1e293b] text-slate-400 uppercase text-[10px] tracking-wider font-bold border-b border-border/50">
                            <tr>
                                {/* 1. Planner */}
                                <th className="px-4 py-3 w-[15%] text-left border-r border-border/10">Planner</th>
                                {/* 2. Team Leader */}
                                <th className="px-4 py-3 w-[11%] text-left border-r border-border/10">Team Leader</th>
                                {/* 3. Processo */}
                                <th className="px-2 py-3 w-[6%] text-center border-r border-border/10">Processo</th>
                                {/* 4. Fornecedor */}
                                <th className="px-2 py-3 w-[6%] text-center border-r border-border/10">Fornecedor</th>
                                {/* 5. PN / Motivo */}
                                <th className="px-2 py-3 w-[6%] text-center border-r border-border/10">PN / Motivo</th>
                                {/* 6. Índice Atual */}
                                <th className="px-2 py-3 w-[5%] text-center border-r border-border/10">Ind. Atual</th>
                                {/* 7. Histórico */}
                                <th className="px-2 py-3 w-[14%] text-center border-r border-border/10">Histórico de Ações</th>
                                {/* 8. Índice Final */}
                                <th className="px-2 py-3 w-[5%] text-center border-r border-border/10">Ind. Final</th>
                                {/* 9. Início */}
                                <th className="px-2 py-3 w-[8%] text-center border-r border-border/10">Início</th>
                                {/* 10. Fim */}
                                <th className="px-2 py-3 w-[8%] text-center border-r border-border/10">Fim</th>
                                {/* 11. Status */}
                                <th className="px-1 py-3 w-[4%] text-center border-r border-border/10">Status</th>
                                {/* 12. Obs */}
                                <th className="px-2 py-3 w-[12%] text-center">Obs</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {paginatedData.map((row, index) => (
                                <tr key={row.id} className={cn(
                                    "group transition-colors",
                                    row.status === "cancelled" ? "opacity-60 bg-red-950/10 grayscale-[0.5]" : "hover:bg-slate-800/30",
                                    index % 2 === 0 ? "bg-[#0f172a]" : "bg-[#162032]" // Darker alternates
                                )}>
                                    {/* 1. Planner (Editable) */}
                                    <td className="px-4 py-3 border-r border-slate-700/30 align-middle">
                                        <div className="flex items-center gap-2 w-full">
                                            <EditableCell
                                                value={row.planner}
                                                onSave={(v) => handleUpdate(row.id, "planner", v)}
                                                className="font-bold text-white text-xs flex-1 text-left truncate hover:bg-white/5 rounded px-1 min-h-[24px]"
                                            />
                                            {/* Planner Level Badge Editable */}
                                            <EditableCell
                                                value={row.plannerLevel || "JUNIOR"}
                                                onSave={(v) => handleUpdate(row.id, "plannerLevel", v)}
                                                type="select"
                                                options={["JUNIOR", "PLENO", "SENIOR"]}
                                                className={cn(
                                                    "rounded-[4px] text-[9px] font-bold uppercase tracking-wider border shadow-sm w-auto min-w-[50px] text-center flex-none min-h-0 h-6 flex items-center justify-center p-0",
                                                    (row.plannerLevel === "SENIOR") ? "bg-purple-500/20 text-purple-300 border-purple-500/30" :
                                                        (row.plannerLevel === "PLENO") ? "bg-blue-500/20 text-blue-300 border-blue-500/30" :
                                                            "bg-slate-500/20 text-slate-300 border-slate-500/30"
                                                )}
                                            />
                                        </div>
                                    </td>

                                    {/* 2. Team Leader (Editable) */}
                                    <td className="px-4 py-3 border-r border-slate-700/30 align-middle">
                                        <EditableCell
                                            value={row.teamLeader}
                                            onSave={(v) => handleUpdate(row.id, "teamLeader", v)}
                                            type="select"
                                            options={TL_OPTIONS}
                                            className="text-slate-400 font-medium text-xs text-left w-full hover:bg-white/5 rounded px-1 min-h-[24px]"
                                        />
                                    </td>

                                    {/* 3. Processo */}
                                    <td className="px-2 py-3 border-r border-slate-700/30 align-middle">
                                        <div className="flex justify-center">
                                            <EditableCell value={row.process} onSave={(v) => handleUpdate(row.id, "process", v)} type="select" options={PROCESS_OPTIONS} className="text-center justify-center text-slate-300 text-xs font-medium" />
                                        </div>
                                    </td>

                                    {/* 4. Fornecedor */}
                                    <td className="px-2 py-3 border-r border-slate-700/30 align-middle">
                                        <div className="flex justify-center">
                                            <EditableCell value={row.supplier} onSave={(v) => handleUpdate(row.id, "supplier", v)} placeholder="—" className="text-center justify-center text-slate-300 text-xs font-medium" />
                                        </div>
                                    </td>

                                    {/* 5. PN / Motivo */}
                                    <td className="px-2 py-3 border-r border-slate-700/30 align-middle">
                                        <div className="flex justify-center">
                                            <EditableCell value={row.pnOrReason} onSave={(v) => handleUpdate(row.id, "pnOrReason", v)} placeholder="—" className="text-center justify-center text-slate-300 text-xs font-medium" />
                                        </div>
                                    </td>

                                    {/* 6. Indice Atual */}
                                    <td className="px-2 py-3 border-r border-slate-700/30 align-middle text-center">
                                        <div className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-blue-900/20 text-blue-200 font-medium text-xs">
                                            {row.currentIndex}
                                        </div>
                                    </td>

                                    {/* 7. Historico */}
                                    <td className="px-2 py-3 border-r border-slate-700/30 align-middle">
                                        <div className="flex justify-center min-h-[40px]">
                                            <EditableCell value={row.history} onSave={(v) => handleUpdate(row.id, "history", v)} type="textarea" placeholder="..." className="text-slate-300 text-center justify-center text-xs font-medium" />
                                        </div>
                                    </td>

                                    {/* 8. Indice Final */}
                                    <td className="px-2 py-3 border-r border-slate-700/30 align-middle text-center">
                                        <EditableCell value={row.finalIndex} onSave={(v) => handleUpdate(row.id, "finalIndex", v)} placeholder="—" className="text-center justify-center font-bold text-emerald-400 text-xs" />
                                    </td>

                                    {/* 9. Início */}
                                    <td className="px-1 py-3 border-r border-slate-700/30 align-middle">
                                        <EditableCell value={row.startDate} onSave={(v) => handleUpdate(row.id, "startDate", v)} type="date" className="text-center justify-center text-slate-300 p-0 text-xs font-medium" />
                                    </td>

                                    {/* 10. Fim */}
                                    <td className="px-1 py-3 border-r border-slate-700/30 align-middle">
                                        <EditableCell value={row.endDate} onSave={(v) => handleUpdate(row.id, "endDate", v)} type="date" className="text-center justify-center text-slate-300 p-0 text-xs font-medium" />
                                    </td>

                                    {/* 11. Status */}
                                    <td className="px-1 py-3 border-r border-slate-700/30 align-middle text-center bg-black/20">
                                        <StatusToggle status={row.status} onToggle={(s) => handleUpdate(row.id, "status", s)} />
                                    </td>

                                    {/* 12. Obs */}
                                    <td className="px-2 py-3 align-middle text-center">
                                        <EditableCell value={row.observation} onSave={(v) => handleUpdate(row.id, "observation", v)} placeholder="..." type="textarea" className="text-slate-300 text-center justify-center text-xs font-medium" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Save Toast (Keep same) */}
                {/* Save Toast Removed - Auto-saving */}
                {isSaving && (
                    <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in z-50 text-xs font-medium">
                        <Loader2 size={12} className="animate-spin" />
                        Saving...
                    </div>
                )}
            </div>

            {/* Pagination (Keep same code structure) */}
            <div className="flex justify-between items-center text-sm text-muted-foreground px-2">
                <span>Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} actions</span>
                <div className="flex gap-2">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(c => c - 1)} className="px-3 py-1 border border-border rounded hover:bg-muted disabled:opacity-50">Previous</button>
                    <button disabled={currentPage * itemsPerPage >= filteredData.length} onClick={() => setCurrentPage(c => c + 1)} className="px-3 py-1 border border-border rounded hover:bg-muted disabled:opacity-50">Next</button>
                </div>
            </div>
        </div>
    );
}
