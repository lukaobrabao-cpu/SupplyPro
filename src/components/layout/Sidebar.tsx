"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CalendarDays,
    ListTodo,
    Trophy,
    FileBarChart,
    Settings,
    Moon,
    Sun,
    Truck,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const menuItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Status Planner",
        href: "/planner",
        icon: CalendarDays,
    },
    {
        title: "Plano de Ação",
        href: "/action-plan",
        icon: ListTodo,
    },
    {
        title: "Ranking",
        href: "/ranking",
        icon: Trophy,
        className: "text-secondary hover:text-secondary-foreground" // Highlight for Ranking
    },
    {
        title: "Relatórios",
        href: "/reports",
        icon: FileBarChart,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <aside className={cn(
            "h-screen bg-card border-r border-border flex flex-col transition-all duration-300 relative z-20",
            collapsed ? "w-20" : "w-64"
        )}>

            {/* Toggle Collapse Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-8 bg-primary text-primary-foreground rounded-full p-1 shadow-md hover:bg-primary/90 transition-colors"
            >
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {/* Logo */}
            <div className="p-6 flexItems-center gap-3 border-b border-border/50 h-20 flex items-center">
                <div className="bg-primary/10 p-2 rounded-xl shrink-0 border border-primary/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                {!collapsed && (
                    <div className="flex flex-col">
                        <span className="font-heading font-bold text-lg text-foreground tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">SupplyPro</span>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em] pl-0.5">Enterprise</span>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                collapsed && "justify-center"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110", isActive && "animate-pulse-subtle")} />
                            {!collapsed && <span>{item.title}</span>}
                            {isActive && !collapsed && (
                                <div className="absolute right-0 top-0 h-full w-1 bg-secondary animate-in fade-in slide-in-from-r-2" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User & Settings */}
            <div className="p-4 border-t border-border/50">
                <div className={cn("flex items-center gap-3 mb-4", collapsed && "justify-center flex-col")}>
                    {/* Dark Mode Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
                            title="Toggle Theme"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    )}
                    {!collapsed && <div className="h-4 w-[1px] bg-border" />}
                    {/* Settings (Mock) */}
                    {!collapsed && (
                        <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                            <Settings size={20} />
                        </button>
                    )}
                </div>

                <div className={cn("flex items-center gap-3 p-2 rounded-xl bg-muted/50 border border-border/50", collapsed ? "justify-center" : "")}>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm border-2 border-background">
                        LC
                    </div>
                    {!collapsed && (
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold truncate text-foreground">Lucas Cerqueira</p>
                            <p className="text-xs text-muted-foreground truncate">Admin</p>
                        </div>
                    )}
                    {!collapsed && (
                        <button className="text-muted-foreground hover:text-destructive transition-colors">
                            <LogOut size={16} />
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}
