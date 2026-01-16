import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8 relative">
                <div className="max-w-7xl mx-auto space-y-8 pb-10">
                    {children}
                </div>
                <footer className="mt-auto py-6 border-t border-border/40 text-center">
                    <p className="text-xs text-muted-foreground">
                        Sistema desenvolvido por <span className="font-semibold text-primary">Lucas Cerqueira</span>
                    </p>
                </footer>
            </main>
        </div>
    );
}
