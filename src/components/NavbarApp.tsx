import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sparkles, Heart, User, LogOut } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const NAV_LINKS = [
  { to: "/app/atividades", label: "Atividades", icon: Sparkles },
  { to: "/app/favoritos", label: "Favoritos", icon: Heart },
  { to: "/app/perfil", label: "Perfil", icon: User },
] as const;

export function NavbarApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAppStore((s) => s.logout);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-card/90 backdrop-blur-sm border-b border-border shadow-card">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/app/atividades"
          className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground"
          aria-label="NeuroPlay — página inicial"
        >
          <span className="text-2xl" aria-hidden="true">🌈</span>
          NeuroPlay
        </Link>

        <nav className="flex items-center gap-1" aria-label="Navegação principal">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          aria-label="Sair da conta"
          className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
