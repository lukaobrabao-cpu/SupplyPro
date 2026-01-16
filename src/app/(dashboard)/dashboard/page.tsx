"use client";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { AlertCircle, Archive, CheckCircle2, Package } from "lucide-react";

export default function DashboardPage() {
  const handleExport = () => {
    // Define headers and data for the Excel-compatible CSV
    const headers = ["Metric", "Value", "Trend", "Status"];
    const data = [
      ["OTIF Index", "94.2%", "-1.5% (vs target)", "Warning"],
      ["Critical Shortages", "23", "-5 (items vs week)", "Success"],
      ["Inconsistencies NF", "12", "+2 (awaiting approval)", "Neutral"],
      ["Inventory Value", "$ 4.2M", "+8.5% (YTD)", "Neutral"],
    ];

    // Convert arrays to CSV string
    const csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + data.map(e => e.join(",")).join("\n");

    // Trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "supply_chain_dashboard_metrics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header - Enterprise Style with Control Bar */}
      <div className="flex flex-col gap-6 pb-6 border-b border-border/40">

        {/* Top Section: Title & Last Sync */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-primary to-blue-600 rounded-full" />
              Executive Overview
            </h1>
            <p className="text-sm text-muted-foreground mt-2 ml-4">Global Supply Chain Performance Metrics • <span className="font-medium text-foreground">Jan 2026</span></p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground/80 bg-muted/40 px-3 py-1.5 rounded-full border border-border/40 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              System Online
            </span>
            <span className="text-xs font-medium text-muted-foreground bg-white dark:bg-slate-900 px-3 py-1.5 rounded-md border border-border/60 shadow-sm">
              Updated: 10:42 AM
            </span>
          </div>
        </div>

        {/* Control Bar: Filters & Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-[#0f172a]/50 p-2 rounded-xl border border-border/60 shadow-sm">
          {/* Filters (Mock) */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 px-1">
            <select className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground border-none focus:ring-0 cursor-pointer outline-none">
              <option>Global View</option>
              <option>North America</option>
              <option>Europe</option>
              <option>LATAM</option>
            </select>
            <div className="h-4 w-px bg-border max-md:hidden" />
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md hover:bg-muted/50 transition-colors">
              Last 30 Days
            </button>
            <button className="text-sm font-medium text-foreground bg-white dark:bg-slate-800 shadow-sm border border-border/50 px-3 py-1.5 rounded-md">
              This Quarter
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md hover:bg-muted/50 transition-colors">
              YTD
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleExport}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-[#0f172a] border border-border/60 rounded-lg text-sm font-semibold shadow-sm hover:bg-muted/30 transition-all text-foreground hover:shadow-md"
            >
              <Package size={16} className="text-muted-foreground" />
              Export CSV
            </button>
            <button className="flex-1 md:flex-none px-4 py-2 bg-[#0f172a] hover:bg-primary/90 text-white rounded-lg text-sm font-semibold shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2">
              <Archive size={16} className="text-white/80" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* KPI Grid - Tighter Gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="OTIF Index"
          value="94.2%"
          trend={-1.5}
          trendLabel="vs target (95%)"
          icon={CheckCircle2}
          status="warning"
        />
        <KpiCard
          title="Critical Shortages"
          value="23"
          trend={-5}
          trendLabel="items vs last week"
          icon={AlertCircle}
          status="success"
        />
        <KpiCard
          title="Inconsistencies NF"
          value="12"
          trend={2}
          trendLabel="awaiting approval"
          icon={Archive}
          status="neutral"
        />
        <KpiCard
          title="Inventory Value"
          value="$ 4.2M"
          trend={8.5}
          trendLabel="YTD accumulation"
          icon={Package}
          status="neutral" // Changed to neutral to be less alarming, or success if high inventory is good (usually bad in lean supply chain, so maybe warning? keeping neutral for safely)
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart
          title="OTIF Evolution (4 Weeks)"
          color="#0f172a" // Deep Navy
          data={[
            { name: "W1", value: 98 },
            { name: "W2", value: 96 },
            { name: "W3", value: 92 },
            { name: "W4", value: 94.2 },
          ]}
        />
        <TrendChart
          title="Shortages Trend (4 Weeks)"
          color="#f59e0b" // Amber
          data={[
            { name: "W1", value: 45 },
            { name: "W2", value: 30 },
            { name: "W3", value: 28 },
            { name: "W4", value: 23 },
          ]}
        />
      </div>
    </div>
  );
}
