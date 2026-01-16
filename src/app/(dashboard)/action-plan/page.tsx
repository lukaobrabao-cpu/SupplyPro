"use client";

import { ActionPlanGrid } from "@/components/action-plan/action-grid";

export default function ActionPlanPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Action Plan 2026</h1>
                    <p className="text-muted-foreground">Operational Excellence & Continuous Improvement Tracking</p>
                </div>
            </div>

            <ActionPlanGrid />
        </div>
    );
}
