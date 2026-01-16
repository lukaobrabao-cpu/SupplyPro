"use client";

import { cn } from "@/lib/utils";
import { Trophy, Medal, Star, TrendingUp, ArrowUp, ArrowDown, Shield } from "lucide-react";

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
    trend: number; // New field for trend logic
}

export const RANKING_DATA: PlannerRank[] = [
    { rank: 1, name: "Ana Silva", teamLeader: "Carlos Mendes", points: 2450, level: "Diamond", otif: 98.5, badges: ["MVP", "Zero Shortage"], progress: 92, trend: 2 },
    { rank: 2, name: "Carlos Mendes", teamLeader: "Director Level", points: 2200, level: "Gold", otif: 96.0, badges: ["Problem Solver"], progress: 75, trend: 0 },
    { rank: 3, name: "Elena Torres", teamLeader: "Carlos Mendes", points: 2150, level: "Gold", otif: 96.0, badges: ["Fast Typer"], progress: 60, trend: -1 },
    { rank: 4, name: "Bruno Souza", teamLeader: "Mariana Costa", points: 1800, level: "Silver", otif: 92.0, badges: [], progress: 45, trend: 1 },
    { rank: 5, name: "Carla Dias", teamLeader: "Mariana Costa", points: 1750, level: "Silver", otif: 94.5, badges: [], progress: 30, trend: 3 },
    { rank: 6, name: "Daniel Rocha", teamLeader: "Mariana Costa", points: 1200, level: "Bronze", otif: 88.0, badges: [], progress: 80, trend: 0 },
    { rank: 7, name: "Henrique", teamLeader: "Wilson", points: 1100, level: "Bronze", otif: 85.0, badges: [], progress: 20, trend: -2 },
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
                        <th className="px-6 py-4 w-[100px] text-center">Posição</th>
                        <th className="px-6 py-4">Planejador</th>
                        <th className="px-6 py-4">Nível</th>
                        <th className="px-6 py-4 w-[200px]">Performance (OTIF)</th>
                        <th className="px-6 py-4 w-[150px] text-right">Pontos</th>
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
                                            <Shield size={10} />
                                            {planner.teamLeader}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            {/* Level */}
                            <td className="px-6 py-4">
                                <LevelBadge level={planner.level} />
                            </td>

                            {/* OTIF Progress */}
                            <td className="px-6 py-4">
                                <div className="w-full">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{planner.otif}%</span>
                                        <span className="text-[9px] text-muted-foreground font-medium uppercase">Target: 95%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={cn("h-full rounded-full transition-all duration-1000",
                                                planner.otif >= 95 ? "bg-emerald-500" :
                                                    planner.otif >= 90 ? "bg-yellow-500" : "bg-rose-500"
                                            )}
                                            style={{ width: `${planner.otif}%` }}
                                        />
                                    </div>
                                </div>
                            </td>

                            {/* Points */}
                            <td className="px-6 py-4 text-right">
                                <span className="font-mono font-bold text-primary text-sm">{planner.points.toLocaleString()}</span>
                                <span className="text-[10px] text-muted-foreground ml-1">xp</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
