import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Plus, RefreshCw } from "lucide-react";
import { NavbarApp } from "@/components/NavbarApp";
import { ActivityCard } from "@/components/ActivityCard";
import { useAppStore } from "@/store/useAppStore";
import { filterActivities } from "@/lib/filterActivities";
import { getRecommendations } from "@/lib/iaClient";
import activitiesData from "@/data/activities.json";
import type { Activity } from "@/types";

type FeedStatus = "loading" | "success" | "error" | "empty";

function SkeletonCard() {
  return (
    <div className="bg-card rounded-3xl shadow-card overflow-hidden animate-pulse">
      <div className="h-1.5 w-full bg-muted" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 w-20 bg-muted rounded-full" />
        <div className="h-5 w-3/4 bg-muted rounded-full" />
        <div className="h-4 w-full bg-muted rounded-full" />
        <div className="h-4 w-2/3 bg-muted rounded-full" />
        <div className="h-24 w-full bg-muted rounded-2xl mt-1" />
        <div className="flex gap-4 mt-2">
          <div className="h-3 w-14 bg-muted rounded-full" />
          <div className="h-3 w-14 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function FeedPage() {
  const navigate = useNavigate();
  const { children, activeChildId, setActiveChild, recommendationsCache, setRecommendationsCache } = useAppStore();

  const activeChild =
    children.find((c) => c.id === activeChildId) ?? children[0] ?? null;

  const recommendations = activeChild ? (recommendationsCache[activeChild.id] ?? []) : [];
  const hasCache = Boolean(activeChild && recommendationsCache[activeChild.id]);

  const [fetchState, setFetchState] = useState<{
    childId: string | null;
    status: "loading" | "error" | "empty";
  }>({ childId: null, status: "loading" });
  const [retryCount, setRetryCount] = useState(0);

  const currentFetchStatus =
    fetchState.childId === activeChild?.id ? fetchState.status : "loading";
  const status: FeedStatus = hasCache ? "success" : currentFetchStatus;

  useEffect(() => {
    if (!activeChild) {
      navigate("/app/criancas/nova");
      return;
    }

    if (hasCache) return;

    let cancelled = false;

    async function fetchRecommendations() {
      const filtered = filterActivities(activeChild!, activitiesData as Activity[]);

      if (filtered.length === 0) {
        if (!cancelled) setFetchState({ childId: activeChild!.id, status: "empty" });
        return;
      }

      try {
        const data = await getRecommendations(activeChild!, filtered);
        if (!cancelled) {
          setRecommendationsCache(activeChild!.id, data);
        }
      } catch {
        if (!cancelled) setFetchState({ childId: activeChild!.id, status: "error" });
      }
    }

    fetchRecommendations();

    return () => {
      cancelled = true;
    };
  }, [activeChild, hasCache, navigate, retryCount, setRecommendationsCache]);

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

        {/* Título da seção */}
        {activeChild && (
          <div className="mb-8">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-2.5">
              <Sparkles className="w-8 h-8 text-primary animate-wiggle" aria-hidden="true" />
              Atividades para {activeChild.name}
            </h1>
            <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">
              Selecionadas pela IA, baseadas em métodos validados e no perfil de{" "}
              {activeChild.name}.
            </p>
          </div>
        )}

        {/* Estado: carregando */}
        {status === "loading" && (
          <div>
            <div className="flex flex-col items-center gap-3 py-10 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" aria-hidden="true" />
              </div>
              <p className="text-muted-foreground font-semibold text-sm">
                Buscando atividades para {activeChild?.name}...
              </p>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              aria-hidden="true"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        )}

        {/* Estado: sem atividades compatíveis */}
        {status === "empty" && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="text-5xl">🧩</div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Nenhuma atividade encontrada
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm">
              Não encontramos atividades compatíveis com o perfil atual. Tente editar as
              sensibilidades ou objetivos do perfil.
            </p>
          </div>
        )}

        {/* Estado: erro */}
        {status === "error" && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="text-5xl">😕</div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Algo deu errado
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm">
              Não conseguimos carregar as atividades. Verifique sua conexão e tente
              novamente.
            </p>
            <button
              type="button"
              onClick={() => setRetryCount((c) => c + 1)}
              className="flex items-center gap-2 h-10 px-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-pop transition-bouncy"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Tentar novamente
            </button>
          </div>
        )}

        {/* Estado: sucesso — grid de cards */}
        {status === "success" && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            aria-label={`Atividades recomendadas para ${activeChild?.name}`}
          >
            {recommendations.map((rec) => (
              <ActivityCard key={rec.id} activity={rec} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
