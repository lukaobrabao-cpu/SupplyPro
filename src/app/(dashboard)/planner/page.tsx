"use client";

import { PlannerGrid, PlannerStatusData } from "@/components/planner/planner-grid";
import { Download, RefreshCw } from "lucide-react";

// Rich Enterprise Mock Data
const plannerData: PlannerStatusData[] = [
    {
        id: "1",
        plannerName: "Ana Silva",
        plannerLevel: "Senior",
        teamLeader: "Carlos Mendes",
        qtySuppliers: 45,
        suppliersOtifLow: 2,
        inconsistencies: 0,
        shortages: 2,
        linesDelayed: 5,
        leftoversValue: 125000,
        opportunityValue: 450000
    },
    {
        id: "2",
        plannerName: "Bruno Souza",
        plannerLevel: "Pleno",
        teamLeader: "Carlos Mendes",
        qtySuppliers: 32,
        suppliersOtifLow: 5,
        inconsistencies: 3,
        shortages: 8,
        linesDelayed: 12,
        leftoversValue: 42000,
        opportunityValue: 210000
    },
    {
        id: "3",
        plannerName: "Carla Dias",
        plannerLevel: "Senior",
        teamLeader: "Mariana Costa",
        qtySuppliers: 68,
        suppliersOtifLow: 0,
        inconsistencies: 1,
        shortages: 0,
        linesDelayed: 1,
        leftoversValue: 550000,
        opportunityValue: 1200000
    },
    {
        id: "4",
        plannerName: "Daniel Rocha",
        plannerLevel: "Junior",
        teamLeader: "Mariana Costa",
        qtySuppliers: 15,
        suppliersOtifLow: 8,
        inconsistencies: 12,
        shortages: 15,
        linesDelayed: 20,
        leftoversValue: 1200,
        opportunityValue: 56000
    },
    {
        id: "5",
        plannerName: "Elena Torres",
        plannerLevel: "Pleno",
        teamLeader: "Carlos Mendes",
        qtySuppliers: 40,
        suppliersOtifLow: 1,
        inconsistencies: 0,
        shortages: 1,
        linesDelayed: 2,
        leftoversValue: 89000,
        opportunityValue: 340000
    },
    {
        id: "6",
        plannerName: "Fernando Lima",
        plannerLevel: "Pleno",
        teamLeader: "Mariana Costa",
        qtySuppliers: 38,
        suppliersOtifLow: 3,
        inconsistencies: 5,
        shortages: 4,
        linesDelayed: 8,
        leftoversValue: 67000,
        opportunityValue: 180000
    },
    {
        id: "7",
        plannerName: "Gabriela Santos",
        plannerLevel: "Senior",
        teamLeader: "Carlos Mendes",
        qtySuppliers: 52,
        suppliersOtifLow: 0,
        inconsistencies: 0,
        shortages: 0,
        linesDelayed: 0,
        leftoversValue: 210000,
        opportunityValue: 890000
    },
];

export default function PlannerPage() {
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
                        <RefreshCw className="h-3 w-3" />
                        Last Sync: 10:45 AM
                    </span>
                    <button className="px-4 py-2 bg-[#003366] hover:bg-[#002244] text-white rounded-md text-sm font-semibold shadow hover:shadow-md transition-all flex items-center gap-2">
                        <Download size={16} />
                        Exportar Report Gerencial
                    </button>
                </div>
            </div>

            {/* Main Grid Content */}
            <div className="flex-1 min-h-0">
                <PlannerGrid data={plannerData} />
            </div>
        </div>
    );
}
