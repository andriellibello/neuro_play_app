import { Link } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { NavbarApp } from "@/components/NavbarApp";
import { ActivityCard } from "@/components/ActivityCard";
import { useAppStore } from "@/store/useAppStore";

export function FavoritesPage() {
  const { children, activeChildId, setActiveChild, favorites } = useAppStore();

  const activeChild = children.find((c) => c.id === activeChildId) ?? children[0] ?? null;
  const favoritedActivities = activeChild ? (favorites[activeChild.id] ?? []) : [];

  return (
    <div className="min-h-screen bg-background">
      <NavbarApp />

      <main className="container max-w-5xl py-8 px-4">
        {/* Seletor de crianças */}
        <div className="flex items-center gap-2 flex-wrap mb-8" role="group" aria-label="Selecionar criança">
          {children.map((child) => (
            <button
              key={child.id}
              type="button"
              onClick={() => setActiveChild(child.id)}
              aria-pressed={child.id === activeChild?.id}
              className={`h-9 px-5 rounded-full text-sm font-semibold transition-bouncy ${
                child.id === activeChild?.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {child.name}
            </button>
          ))}
          <Link
            to="/app/criancas/nova"
            className="flex items-center gap-1.5 h-9 px-4 rounded-full text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Adicionar nova criança"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Nova criança
          </Link>
        </div>

        {/* Título */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-2.5">
            <Heart className="w-8 h-8 text-primary" fill="currentColor" aria-hidden="true" />
            Favoritos
          </h1>
          {activeChild && (
            <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">
              Atividades salvas para {activeChild.name}.
            </p>
          )}
        </div>

        {/* Estado vazio */}
        {favoritedActivities.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="text-5xl">💛</div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Nenhum favorito ainda
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm">
              Toque no coração de qualquer atividade para salvá-la aqui e acessar rápido depois.
            </p>
            <Link
              to="/app/atividades"
              className="flex items-center gap-2 h-10 px-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-pop transition-bouncy"
            >
              Ver atividades
            </Link>
          </div>
        )}

        {/* Grid de favoritos */}
        {favoritedActivities.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            aria-label={`Atividades favoritas de ${activeChild?.name}`}
          >
            {favoritedActivities.map((rec) => (
              <ActivityCard key={rec.id} activity={rec} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
