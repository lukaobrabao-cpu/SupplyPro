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

// ... imports
import { Crown, Sparkles, TrendingUp } from "lucide-react";

// ... interfaces (PlannerRank)

// ... RANKING_DATA (keep same data)

function Podium({ planners }: { planners: PlannerRank[] }) {
    const [first, second, third] = planners;

    const PodiumItem = ({ planner, rank, className }: { planner: PlannerRank, rank: number, className?: string }) => (
        <div className={cn("relative flex flex-col items-center", className)}>
            {/* Crown/Medal */}
            <div className={cn("absolute -top-6 animate-bounce", rank === 1 ? "text-yellow-500" : rank === 2 ? "text-slate-400" : "text-amber-600")}>
                <Crown size={rank === 1 ? 32 : 24} fill="currentColor" />
            </div>

            {/* Avatar Ring */}
            <div className={cn(
                "relative z-10 rounded-full p-1 bg-gradient-to-b shadow-lg mb-3 hover:scale-105 transition-transform duration-300",
                rank === 1 ? "from-yellow-300 to-amber-500 h-24 w-24" :
                    rank === 2 ? "from-slate-200 to-slate-400 h-20 w-20" :
                        "from-amber-200 to-amber-600 h-20 w-20"
            )}>
                <div className="h-full w-full rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 overflow-hidden flex items-center justify-center">
                    {planner.avatar ? <img src={planner.avatar} className="h-full w-full object-cover" /> : <span className="text-2xl font-bold text-slate-500">{planner.name[0]}</span>}
                </div>
                {/* Rank Badge */}
                <div className={cn(
                    "absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold text-white shadow-sm border border-white/20",
                    rank === 1 ? "bg-amber-500" : rank === 2 ? "bg-slate-500" : "bg-amber-700"
                )}>
                    #{rank}
                </div>
            </div>

            {/* Info */}
            <div className="text-center">
                <h3 className={cn("font-bold text-lg", rank === 1 ? "text-2xl" : "text-base")}>{planner.name}</h3>
                <p className="text-xs text-muted-foreground font-medium">{planner.level}</p>

                <div className="mt-2 flex items-center justify-center gap-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-3 py-1 rounded-full border border-black/5 shadow-sm">
                    <Sparkles size={12} className="text-amber-500" />
                    <span className="font-bold text-foreground">{planner.points.toLocaleString()}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">pts</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex items-end justify-center gap-4 md:gap-12 mb-12 pt-8">
            <PodiumItem planner={second} rank={2} className="-mb-4" />
            <PodiumItem planner={first} rank={1} className="z-10 scale-110" />
            <PodiumItem planner={third} rank={3} className="-mb-4" />
        </div>
    );
}

export function RankingList() {
    return (
        <div className="space-y-8">
            {/* Podium Section */}
            <Podium planners={[RANKING_DATA[0], RANKING_DATA[1], RANKING_DATA[2]]} />

            {/* List for the rest */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 pl-2 flex items-center gap-2">
                    <TrendingUp size={16} /> Leaderboard
                </h3>
                <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">
                            <th className="px-4 pb-2 text-center">Pos</th>
                            <th className="px-4 pb-2">Planejador</th>
                            <th className="px-4 pb-2 text-center">Abertas</th>
                            <th className="px-4 pb-2 text-center">Concluídas</th>
                            <th className="px-4 pb-2 text-right">XP Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {RANKING_DATA.slice(3).map((planner) => (
                            <tr key={planner.rank} className="group hover:scale-[1.01] transition-all duration-300">
                                {/* Rank */}
                                <td className="bg-white dark:bg-slate-800/80 shadow-sm rounded-l-xl px-4 py-3 text-center border-y border-l border-border/50 group-hover:border-primary/30">
                                    <span className="font-bold text-muted-foreground">#{planner.rank}</span>
                                </td>

                                {/* Info */}
                                <td className="bg-white dark:bg-slate-800/80 shadow-sm px-4 py-3 border-y border-border/50 group-hover:border-primary/30">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-xs">
                                            {planner.name.substring(0, 2)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-foreground">{planner.name}</div>
                                            <div className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-muted-foreground w-fit mt-0.5">
                                                {planner.level}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Abertas */}
                                <td className="bg-white dark:bg-slate-800/80 shadow-sm px-4 py-3 text-center border-y border-border/50 group-hover:border-primary/30">
                                    <span className="font-medium text-blue-600 dark:text-blue-400">{planner.actionsOpened}</span>
                                </td>

                                {/* Concluidas */}
                                <td className="bg-white dark:bg-slate-800/80 shadow-sm px-4 py-3 text-center border-y border-border/50 group-hover:border-primary/30">
                                    <span className="font-medium text-emerald-600 dark:text-emerald-400">{planner.actionsCompleted}</span>
                                </td>

                                {/* Points */}
                                <td className="bg-white dark:bg-slate-800/80 shadow-sm rounded-r-xl px-4 py-3 text-right border-y border-r border-border/50 group-hover:border-primary/30">
                                    <div className="font-mono font-bold text-primary">{planner.points.toLocaleString()}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
