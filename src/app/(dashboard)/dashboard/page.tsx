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
      {/* Header - Enterprise Style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white flex items-center gap-2">
            <div className="h-8 w-1 bg-primary rounded-full" />
            Executive Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1 ml-3">Métricas de Desempenho da Cadeia de Suprimentos • Jan 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md border border-border/50">
            Última sincronização: 10:42
          </span>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#0f172a] border border-border rounded-md text-sm font-semibold shadow-sm hover:bg-muted/50 transition-all text-foreground"
          >
            <Package size={16} className="text-muted-foreground" />
            Exportar Dados
          </button>
          <button className="px-4 py-2 bg-[#0f172a] text-white rounded-md text-sm font-semibold shadow hover:bg-primary/90 transition-all">
            Baixar Relatório
          </button>
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
