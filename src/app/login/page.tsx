"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Loader2, Lock, Mail, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // If Supabase "Confirm Email" is disabled, we get a session immediately
            if (data.session) {
                router.push("/dashboard");
            } else {
                // Otherwise, we still need to tell them (unless the user disables it in Supabase)
                setError("Conta criada! Se a confirmação de e-mail estiver ativa, verifique sua caixa de entrada.");
                // Optional: auto-switch to login tab not needed if we redirect
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            router.push("/dashboard");
        }
    } catch (err: any) {
        // Translate common Supabase errors
        let msg = err.message;
        if (msg.includes("Invalid login credentials")) msg = "E-mail ou senha incorretos.";
        if (msg.includes("Email not confirmed")) msg = "E-mail não confirmado. Verifique sua caixa de entrada.";
        if (msg.includes("User already registered")) msg = "Usuário já registrado. Tente fazer login.";
        setError(msg);
    } finally {
        setIsLoading(false);
    }
};

return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-[#0f172a]/90 to-transparent" />

        {/* Login Card */}
        <div className="w-full max-w-md relative z-10 px-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-primary/20 p-4 rounded-2xl mb-6 border border-primary/20 shadow-lg shadow-primary/10 ring-1 ring-white/10">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-heading font-bold tracking-tight text-white">
                            SupplyPro <span className="text-primary">Enterprise</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-3">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Portal Seguro</span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-300 uppercase tracking-wider ml-1">E-mail Corporativo</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all"
                                placeholder="nome@empresa.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-300 uppercase tracking-wider ml-1">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-10 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className={cn(
                            "p-3 rounded-lg text-xs flex items-center gap-2 border",
                            error.includes("criada")
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-200"
                                : "bg-rose-500/10 border-rose-500/20 text-rose-200"
                        )}>
                            <div className={cn(
                                "h-1.5 w-1.5 rounded-full animate-pulse",
                                error.includes("criada") ? "bg-emerald-500" : "bg-rose-500"
                            )} />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            isSignUp ? "Criar Conta" : "Entrar no Sistema"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError(null);
                        }}
                        className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                        {isSignUp ? "Já tem uma conta? Fazer Login" : "Primeiro acesso? Criar conta"}
                    </button>
                </div>
            </div>

            {/* Footer */}
            <p className="text-center text-slate-600 text-xs mt-8">
                &copy; 2026 SupplyChain Pro. Secure Enterprise System.
            </p>
        </div>
    </div>
);
    }
