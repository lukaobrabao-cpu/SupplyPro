"use client";

import { PlannerGrid, PlannerStatusData } from "@/components/planner/planner-grid";
import { Download, RefreshCw } from "lucide-react";
import { useState } from "react";

// Rich Enterprise Mock Data
const plannerData: PlannerStatusData[] = [
    { id: "1", plannerName: "Thales Fazzini", teamLeader: "Wilson Silva", plannerLevel: "Senior", qtySuppliers: 45, suppliersOtifLow: 2, inconsistencies: 0, shortages: 1, linesDelayed: 5, leftoversValue: 125000, opportunityValue: 450000 },
    { id: "2", plannerName: "Priscilla de Padilla", teamLeader: "Leopoldo Garcez", plannerLevel: "Pleno", qtySuppliers: 32, suppliersOtifLow: 5, inconsistencies: 3, shortages: 8, linesDelayed: 12, leftoversValue: 42000, opportunityValue: 210000 },
    { id: "3", plannerName: "Michel Robson", teamLeader: "Wilson Silva", plannerLevel: "Senior", qtySuppliers: 50, suppliersOtifLow: 0, inconsistencies: 1, shortages: 0, linesDelayed: 1, leftoversValue: 550000, opportunityValue: 1200000 },
    { id: "4", plannerName: "Marcio Donizeti", teamLeader: "Lucas Cerqueira", plannerLevel: "Junior", qtySuppliers: 28, suppliersOtifLow: 4, inconsistencies: 2, shortages: 12, linesDelayed: 15, leftoversValue: 1200, opportunityValue: 56000 },
    { id: "5", plannerName: "Jonatas Almeida", teamLeader: "Leopoldo Garcez", plannerLevel: "Pleno", qtySuppliers: 42, suppliersOtifLow: 1, inconsistencies: 0, shortages: 3, linesDelayed: 4, leftoversValue: 89000, opportunityValue: 340000 },
    { id: "6", plannerName: "Henrique Fernando", teamLeader: "Wilson Silva", plannerLevel: "Pleno", qtySuppliers: 38, suppliersOtifLow: 0, inconsistencies: 5, shortages: 0, linesDelayed: 2, leftoversValue: 67000, opportunityValue: 180000 },
    { id: "7", plannerName: "Guilherme Oliveira", teamLeader: "Lucas Cerqueira", plannerLevel: "Senior", qtySuppliers: 55, suppliersOtifLow: 2, inconsistencies: 0, shortages: 0, linesDelayed: 0, leftoversValue: 210000, opportunityValue: 890000 },
    { id: "8", plannerName: "Gabriel Gualberto", teamLeader: "Wilson Silva", plannerLevel: "Junior", qtySuppliers: 20, suppliersOtifLow: 6, inconsistencies: 8, shortages: 10, linesDelayed: 18, leftoversValue: 5000, opportunityValue: 32000 },
    { id: "9", plannerName: "Alexandre Felix", teamLeader: "Leopoldo Garcez", plannerLevel: "Pleno", qtySuppliers: 35, suppliersOtifLow: 1, inconsistencies: 1, shortages: 2, linesDelayed: 3, leftoversValue: 75000, opportunityValue: 290000 },
    { id: "10", plannerName: "Adriana de Carvalho", teamLeader: "Wilson Silva", plannerLevel: "Senior", qtySuppliers: 48, suppliersOtifLow: 0, inconsistencies: 0, shortages: 1, linesDelayed: 2, leftoversValue: 180000, opportunityValue: 650000 },
    { id: "11", plannerName: "Lucas Deodato", teamLeader: "Lucas Cerqueira", plannerLevel: "Senior", qtySuppliers: 60, suppliersOtifLow: 1, inconsistencies: 2, shortages: 0, linesDelayed: 4, leftoversValue: 300000, opportunityValue: 1500000 },
    { id: "12", plannerName: "Leopoldo Ariel", teamLeader: "Leopoldo Garcez", plannerLevel: "Senior", qtySuppliers: 52, suppliersOtifLow: 0, inconsistencies: 0, shortages: 0, linesDelayed: 0, leftoversValue: 250000, opportunityValue: 980000 },
    { id: "13", plannerName: "Ricardo Wagner", teamLeader: "Wilson Silva", plannerLevel: "Pleno", qtySuppliers: 30, suppliersOtifLow: 3, inconsistencies: 4, shortages: 6, linesDelayed: 9, leftoversValue: 35000, opportunityValue: 120000 },
    { id: "14", plannerName: "Wilson Leite", teamLeader: "Wilson Silva", plannerLevel: "Senior", qtySuppliers: 45, suppliersOtifLow: 1, inconsistencies: 1, shortages: 2, linesDelayed: 5, leftoversValue: 150000, opportunityValue: 540000 },
    { id: "15", plannerName: "Kaio de Souza", teamLeader: "Leopoldo Garcez", plannerLevel: "Junior", qtySuppliers: 22, suppliersOtifLow: 4, inconsistencies: 6, shortages: 8, linesDelayed: 14, leftoversValue: 8000, opportunityValue: 45000 },
    { id: "16", plannerName: "Matheus Santos", teamLeader: "Lucas Cerqueira", plannerLevel: "Pleno", qtySuppliers: 36, suppliersOtifLow: 2, inconsistencies: 3, shortages: 5, linesDelayed: 7, leftoversValue: 55000, opportunityValue: 230000 },
    { id: "17", plannerName: "Thauany Magalhaes", teamLeader: "Lucas Cerqueira", plannerLevel: "Pleno", qtySuppliers: 33, suppliersOtifLow: 1, inconsistencies: 0, shortages: 3, linesDelayed: 6, leftoversValue: 62000, opportunityValue: 270000 },
];

export default function PlannerPage() {
    const [data, setData] = useState<PlannerStatusData[]>(plannerData);

    const handleUpdateRow = (id: string, field: keyof PlannerStatusData, value: string | number) => {
        setData(prev => prev.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const handleAddRow = () => {
        const newRow: PlannerStatusData = {
            id: Math.random().toString(36).substr(2, 9),
            plannerName: "Novo Planejador",
            plannerLevel: "Junior",
            teamLeader: "A Definir",
            qtySuppliers: 0,
            suppliersOtifLow: 0,
            inconsistencies: 0,
            shortages: 0,
            linesDelayed: 0,
            leftoversValue: 0,
            opportunityValue: 0
        };
        setData([newRow, ...data]);
    };

    return (
        <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header - Enterprise Style */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border/40 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white flex items-center gap-2">
                        <div className="h-8 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
                        Status Planner
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1 ml-3">Performance Operacional e Financeira por Carteira</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-muted-foreground bg-white dark:bg-slate-900 px-3 py-1.5 rounded-md border border-border/60 shadow-sm flex items-center gap-2">
                        Last Sync: 10:45 AM
                    </span>
                    <button
                        onClick={handleAddRow}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-semibold shadow hover:shadow-md transition-all flex items-center gap-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Adicionar Planner
                    </button>
                    <button className="px-4 py-2 bg-[#003366] hover:bg-[#002244] text-white rounded-md text-sm font-semibold shadow hover:shadow-md transition-all flex items-center gap-2">
                        <Download size={16} />
                        Exportar Report Gerencial
                    </button>
                </div>
            </div>

            {/* Main Grid Content */}
            <div className="flex-1 min-h-0">
                <PlannerGrid data={data} onDataChange={handleUpdateRow} />
            </div>
        </div>
    );
}
