"use client";

import { RankingList } from "@/components/ranking/ranking-list";
import { Trophy, Info } from "lucide-react";

export default function RankingPage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 pb-4 border-b border-border/40">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <Trophy className="text-[#0f172a] dark:text-white h-6 w-6" />
                        Ranking de Planejadores
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                        Acompanhamento de desempenho trimestral baseado em OTIF, Acuracidade de Estoque e Plano de Ação.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
                    <Info size={14} />
                    <span>Atualizado: 15 min atrás</span>
                </div>
            </div>

            {/* List View */}
            <RankingList />
        </div>
    );
}
