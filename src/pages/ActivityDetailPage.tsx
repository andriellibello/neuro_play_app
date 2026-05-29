import { useParams, useLocation, Link } from "react-router-dom";
import { ArrowLeft, Clock, Volume2, Sparkles, Wind } from "lucide-react";
import { NavbarApp } from "@/components/NavbarApp";
import activitiesData from "@/data/activities.json";
import type { Activity, AIActivityRecommendation } from "@/types";

const CATEGORY_CONFIG: Record<
  AIActivityRecommendation["categoria"],
  { label: string; gradient: string }
> = {
  sensorial: { label: "Sensorial", gradient: "bg-gradient-sunset" },
  motora:    { label: "Motora",    gradient: "bg-gradient-mint" },
  cognitiva: { label: "Cognitiva", gradient: "bg-gradient-sky" },
  social:    { label: "Social",    gradient: "bg-gradient-hero" },
  criativa:  { label: "Criativa",  gradient: "bg-accent" },
};

const LEVEL_LABEL: Record<"baixo" | "medio" | "alto", string> = {
  baixo: "baixo",
  medio: "médio",
  alto:  "alto",
};

interface LocationState {
  rec?: AIActivityRecommendation;
}

export function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { rec } = (location.state ?? {}) as LocationState;

  const activity = (activitiesData as Activity[]).find((a) => a.id === id);

  if (!activity) {
    return (
      <div className="min-h-screen bg-background">
        <NavbarApp />
        <main className="container max-w-2xl py-20 px-4 text-center">
          <p className="text-muted-foreground text-lg">Atividade não encontrada.</p>
          <Link
            to="/app/atividades"
            className="text-primary font-semibold mt-4 inline-block hover:underline"
          >
            ← Voltar para atividades
          </Link>
        </main>
      </div>
    );
  }

  const categoria = rec?.categoria ?? "sensorial";
  const config = CATEGORY_CONFIG[categoria] ?? CATEGORY_CONFIG.sensorial;
  const titulo = rec?.titulo ?? activity.nome;
  const descricaoCurta = rec?.descricao_curta ?? activity.descricao;
  const explicacao = rec?.explicacao;

  return (
    <div className="min-h-screen bg-background">
      <NavbarApp />

      <main className="container max-w-2xl py-8 px-4">
        {/* Voltar */}
        <Link
          to="/app/atividades"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          aria-label="Voltar para lista de atividades"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Voltar
        </Link>

        {/* Card de cabeçalho */}
        <div className="bg-card rounded-3xl shadow-card overflow-hidden mb-5">
          <div className={`h-2 w-full ${config.gradient}`} aria-hidden="true" />
          <div className="p-6 sm:p-8">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {config.label}
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mt-2 leading-tight">
              {titulo}
            </h1>
            <p className="text-muted-foreground mt-2 leading-relaxed">{descricaoCurta}</p>

            <div className="flex items-center gap-5 mt-5 flex-wrap">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {activity.tempo_minutos} min
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Volume2 className="w-4 h-4" aria-hidden="true" />
                Barulho: {LEVEL_LABEL[activity.nivel_barulho]}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Wind className="w-4 h-4" aria-hidden="true" />
                Bagunça: {LEVEL_LABEL[activity.nivel_baguncia]}
              </span>
            </div>
          </div>
        </div>

        {/* Como fazer */}
        <div className="bg-card rounded-3xl shadow-card p-6 sm:p-8 mb-5">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
            Como fazer
          </h2>
          <p className="text-muted-foreground leading-relaxed">{activity.como_fazer}</p>
        </div>

        {/* Por que ajuda — só exibe se tiver explicação da IA */}
        {explicacao && (
          <div
            className="rounded-3xl p-6 sm:p-8 mb-5"
            style={{ backgroundColor: "hsl(165 70% 55% / 0.12)" }}
          >
            <h2 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-secondary" aria-hidden="true" />
              Por que ajuda
            </h2>
            <p className="text-foreground leading-relaxed">{explicacao}</p>
          </div>
        )}

        {/* Materiais */}
        <div className="bg-card rounded-3xl shadow-card p-6 sm:p-8">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
            Materiais
          </h2>
          <div className="flex flex-wrap gap-2 mb-5">
            {activity.materiais.map((material) => (
              <span
                key={material}
                className="text-sm bg-muted text-muted-foreground px-3 py-1.5 rounded-full"
              >
                {material}
              </span>
            ))}
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span aria-hidden="true">🏅</span>
              Baseado em:{" "}
              <span className="font-semibold text-primary">{activity.fonte}</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
