import { Link, useLocation } from "@tanstack/react-router";
import { Home, User, Sparkles, NotebookPen, BarChart3, Mic } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "总览", icon: Home },
  { to: "/profile", label: "画像", icon: User },
  { to: "/briefing", label: "备课", icon: Sparkles },
  { to: "/review", label: "复盘", icon: NotebookPen },
  { to: "/dashboard", label: "看板", icon: BarChart3 },
  { to: "/badge", label: "工牌", icon: Mic },
];

export function MobileShell({
  title,
  subtitle,
  children,
  back,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  back?: string;
}) {
  const loc = useLocation();
  return (
    <div className="mobile-shell">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-[var(--background)]/85 backdrop-blur border-b border-[var(--color-gray-200)]">
        <div className="px-4 pt-3 pb-2.5 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-6 h-6 rounded-md bg-brand-500 text-[var(--color-gray-900)] text-[11px] font-bold flex items-center justify-center">美</span>
            <span className="text-[12px] text-[var(--color-gray-500)]">美团 × DP 教练助理</span>
          </div>
          <div className="ml-auto text-[11px] text-[var(--color-gray-400)]">教练 · 王思敏</div>
        </div>
        <div className="px-4 pb-3">
          <h1 className="text-[18px] leading-tight font-semibold text-[var(--color-green-700)]">{title}</h1>
          {subtitle && <div className="text-[12px] text-[var(--color-gray-500)] mt-0.5">{subtitle}</div>}
        </div>
        {back && (
          <Link to={back} className="absolute top-3 right-3 text-[11px] text-[var(--color-gray-500)]">
            返回
          </Link>
        )}
      </header>

      <main className="px-4 py-4 space-y-4">{children}</main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur border-t border-[var(--color-gray-200)] z-30">
        <div className="grid grid-cols-6">
          {tabs.map((t) => {
            const active = loc.pathname === t.to;
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`flex flex-col items-center py-2 gap-0.5 transition ${
                  active ? "text-[var(--color-orange-500)]" : "text-[var(--color-gray-400)]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px]">{t.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function Card({
  children,
  className = "",
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "tier-1" | "tier-2" | "tier-3" | "muted";
}) {
  const base = "rounded-[14px] p-4";
  const variantClass =
    variant === "default"
      ? "bg-white border border-[var(--color-gray-200)]"
      : variant === "muted"
      ? "bg-[var(--color-gray-100)]"
      : variant;
  return <div className={`${base} ${variantClass} ${className}`}>{children}</div>;
}

export function Tag({ children, color = "neutral" }: { children: ReactNode; color?: "brand" | "orange" | "green" | "neutral" | "info" | "warning" }) {
  const map = {
    brand: "bg-brand-50 text-brand-700",
    orange: "bg-orange-50 text-orange-700",
    green: "bg-green-50 text-green-700",
    neutral: "bg-[var(--color-gray-100)] text-[var(--color-gray-700)]",
    info: "bg-[var(--color-info-bg)] text-[var(--color-info)]",
    warning: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  } as const;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${map[color]}`}>
      {children}
    </span>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className = "",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-[10px] py-3 text-[14px] font-semibold bg-brand-500 text-[var(--color-gray-900)] active:bg-brand-600 disabled:opacity-50 transition ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[10px] py-2.5 px-3 text-[13px] font-medium border border-[var(--color-gray-200)] text-[var(--color-gray-700)] bg-white active:bg-[var(--color-gray-100)] transition ${className}`}
    >
      {children}
    </button>
  );
}
