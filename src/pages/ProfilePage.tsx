import { Link, useNavigate } from "react-router-dom";
import { User, Plus, ChevronRight, LogOut } from "lucide-react";
import { NavbarApp } from "@/components/NavbarApp";
import { useAppStore } from "@/store/useAppStore";

const SUPPORT_LEVEL_LABEL: Record<1 | 2 | 3, string> = {
  1: "Nível 1 – Suporte pontual",
  2: "Nível 2 – Suporte moderado",
  3: "Nível 3 – Suporte intensivo",
};

const AGE_RANGE_LABEL: Record<string, string> = {
  "2-4": "2 a 4 anos",
  "5-7": "5 a 7 anos",
  "8-12": "8 a 12 anos",
};

export function ProfilePage() {
  const navigate = useNavigate();
  const { guardian, children, logout } = useAppStore();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarApp />

      <main className="container max-w-2xl py-8 px-4">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-2.5">
            <User className="w-8 h-8 text-primary" aria-hidden="true" />
            Perfil
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">
            Gerencie sua conta e os perfis das crianças.
          </p>
        </div>

        {/* Card do responsável */}
        <section aria-labelledby="guardian-heading" className="mb-6">
          <h2
            id="guardian-heading"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1"
          >
            Responsável
          </h2>
          <div className="bg-card rounded-3xl shadow-card p-5 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <User className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">
                {guardian?.name ?? "—"}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {guardian?.email ?? "—"}
              </p>
            </div>
          </div>
        </section>

        {/* Lista de crianças */}
        <section aria-labelledby="children-heading" className="mb-6">
          <h2
            id="children-heading"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1"
          >
            Crianças cadastradas
          </h2>

          <div className="flex flex-col gap-3">
            {children.length === 0 && (
              <div className="bg-card rounded-3xl shadow-card p-6 flex flex-col items-center gap-3 text-center">
                <span className="text-4xl" aria-hidden="true">
                  👶
                </span>
                <p className="text-muted-foreground text-sm">
                  Nenhuma criança cadastrada ainda.
                </p>
              </div>
            )}

            {children.map((child) => (
              <div
                key={child.id}
                className="bg-card rounded-3xl shadow-card p-5 flex items-center gap-4"
              >
                <div
                  className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-xl shrink-0"
                  aria-hidden="true"
                >
                  🧒
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {child.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {AGE_RANGE_LABEL[child.ageRange]} ·{" "}
                    {SUPPORT_LEVEL_LABEL[child.supportLevel]}
                  </p>
                  {child.interests.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap mt-2">
                      {child.interests.slice(0, 3).map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                      {child.interests.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                          +{child.interests.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <ChevronRight
                  className="w-5 h-5 text-muted-foreground shrink-0"
                  aria-hidden="true"
                />
              </div>
            ))}

            <Link
              to="/app/criancas/nova"
              className="flex items-center justify-center gap-2 h-12 rounded-3xl border-2 border-dashed border-border text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              aria-label="Adicionar nova criança"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Adicionar criança
            </Link>
          </div>
        </section>

        {/* Ações da conta */}
        <section aria-labelledby="account-heading">
          <h2
            id="account-heading"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1"
          >
            Conta
          </h2>
          <div className="bg-card rounded-3xl shadow-card overflow-hidden divide-y divide-border">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold text-destructive hover:bg-destructive/5 transition-colors"
              aria-label="Sair da conta"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              Sair da conta
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
