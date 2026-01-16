"use client";

import { cn } from "@/lib/utils";
import { Trophy, Medal, Star, TrendingUp, ArrowUp, ArrowDown, Shield } from "lucide-react";

// ... imports

interface PlannerRank {
    rank: number;
    name: string;
    avatar?: string;
    teamLeader: string;
    points: number;
    level: string;
    otif: number;
    badges: string[];
    progress: number;
    trend: number;
    actionsOpened: number;
    actionsCompleted: number;
}

export const RANKING_DATA: PlannerRank[] = [
    { rank: 1, name: "Ana Silva", teamLeader: "Carlos Mendes", points: 2850, level: "Diamond", otif: 98.5, badges: ["MVP", "Zero Shortage"], progress: 92, trend: 2, actionsOpened: 45, actionsCompleted: 48 }, // 48*50 + 45*10 = 2400 + 450 = 2850
    { rank: 2, name: "Carlos Mendes", teamLeader: "Director Level", points: 2400, level: "Gold", otif: 96.0, badges: ["Problem Solver"], progress: 75, trend: 0, actionsOpened: 50, actionsCompleted: 38 }, // 38*50 + 50*10 = 1900 + 500 = 2400
    { rank: 3, name: "Elena Torres", teamLeader: "Carlos Mendes", points: 2150, level: "Gold", otif: 96.0, badges: ["Fast Typer"], progress: 60, trend: -1, actionsOpened: 40, actionsCompleted: 35 },
    { rank: 4, name: "Bruno Souza", teamLeader: "Mariana Costa", points: 1800, level: "Silver", otif: 92.0, badges: [], progress: 45, trend: 1, actionsOpened: 60, actionsCompleted: 24 },
    { rank: 5, name: "Carla Dias", teamLeader: "Mariana Costa", points: 1650, level: "Silver", otif: 94.5, badges: [], progress: 30, trend: 3, actionsOpened: 35, actionsCompleted: 26 },
    { rank: 6, name: "Daniel Rocha", teamLeader: "Mariana Costa", points: 1200, level: "Bronze", otif: 88.0, badges: [], progress: 80, trend: 0, actionsOpened: 30, actionsCompleted: 18 },
    { rank: 7, name: "Henrique", teamLeader: "Wilson", points: 900, level: "Bronze", otif: 85.0, badges: [], progress: 20, trend: -2, actionsOpened: 20, actionsCompleted: 14 },
];

function RankBadge({ rank }: { rank: number }) {
    if (rank === 1) return <div className="h-8 w-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold border border-yellow-200 shadow-sm"><Trophy size={14} className="fill-yellow-500 text-yellow-600" /></div>;
    if (rank === 2) return <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold border border-slate-200 shadow-sm"><Medal size={14} className="fill-slate-400 text-slate-500" /></div>;
    if (rank === 3) return <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold border border-orange-200 shadow-sm"><Medal size={14} className="fill-orange-400 text-orange-600" /></div>;
    return <div className="h-8 w-8 rounded-full bg-white text-muted-foreground flex items-center justify-center font-bold border border-border text-sm shadow-sm">{rank}</div>;
}

function LevelBadge({ level }: { level: string }) {
    const styles: Record<string, string> = {
        "Diamond": "bg-cyan-100 text-cyan-800 border-cyan-200",
        "Gold": "bg-yellow-50 text-yellow-700 border-yellow-200",
        "Silver": "bg-slate-50 text-slate-700 border-slate-200",
        "Bronze": "bg-orange-50 text-orange-700 border-orange-200",
    };
    return (
        <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border", styles[level] || "bg-muted")}>
            {level}
        </span>
    );
}

export function RankingList() {
    return (
        <div className="bg-white dark:bg-[#0f172a] rounded-lg shadow border border-border overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-[#f8fafc] dark:bg-[#1e293b] border-b border-border text-xs uppercase text-muted-foreground font-semibold tracking-wider">
                        <th className="px-6 py-4 w-[80px] text-center">Posição</th>
                        <th className="px-6 py-4">Planejador</th>
                        <th className="px-6 py-4 text-center">Abertas</th>
                        <th className="px-6 py-4 text-center">Concluídas</th>
                        <th className="px-6 py-4 w-[150px] text-right">Pontuação</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                    {RANKING_DATA.map((planner) => (
                        <tr key={planner.rank} className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                            {/* Rank Column */}
                            <td className="px-6 py-4">
                                <div className="flex flex-col items-center gap-1">
                                    <RankBadge rank={planner.rank} />
                                    {planner.trend !== 0 && (
                                        <div className={cn("flex items-center text-[10px] font-medium", planner.trend > 0 ? "text-emerald-600" : "text-rose-600")}>
                                            {planner.trend > 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                                            {Math.abs(planner.trend)}
                                        </div>
                                    )}
                                </div>
                            </td>

                            {/* Planner Info */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm border-2 border-white dark:border-slate-800 shadow-sm">
                                            {planner.avatar ? <img src={planner.avatar} className="rounded-full" /> : planner.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        {planner.rank <= 3 && (
                                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-white rounded-full p-0.5 border border-white">
                                                <Star size={8} className="fill-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-bold text-[#0f172a] dark:text-slate-100 text-sm">{planner.name}</div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                            <LevelBadge level={planner.level} />
                                        </div>
                                    </div>
                                </div>
                            </td>

                            {/* Ações Abertas */}
                            <td className="px-6 py-4 text-center">
                                <div className="inline-flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-bold text-sm h-8 min-w-[32px] px-2 rounded-md border border-blue-100 dark:border-blue-800/50">
                                    {planner.actionsOpened}
                                </div>
                            </td>

                            {/* Ações Concluídas */}
                            <td className="px-6 py-4 text-center">
                                <div className="inline-flex flex-col items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 font-bold text-sm h-8 min-w-[32px] px-2 rounded-md border border-emerald-100 dark:border-emerald-800/50">
                                    {planner.actionsCompleted}
                                </div>
                            </td>

                            {/* Points */}
                            <td className="px-6 py-4 text-right">
                                <div className="flex flex-col items-end">
                                    <span className="font-mono font-bold text-primary text-lg">{planner.points.toLocaleString()}</span>
                                    <span className="text-[10px] text-muted-foreground">pontos</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
