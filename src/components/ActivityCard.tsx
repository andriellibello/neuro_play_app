import { Link } from "react-router-dom";
import { Heart, Clock, Volume2, Sparkles } from "lucide-react";
import type { AIActivityRecommendation } from "@/types";
import { useAppStore } from "@/store/useAppStore";

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

const NOISE_LABEL: Record<AIActivityRecommendation["nivel_barulho"], string> = {
  baixo: "baixo",
  medio: "médio",
  alto:  "alto",
};

interface ActivityCardProps {
  activity: AIActivityRecommendation;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const { activeChildId, favorites, toggleFavorite } = useAppStore();
  const favorited = activeChildId
    ? (favorites[activeChildId] ?? []).some((f) => f.id === activity.id)
    : false;
  const config = CATEGORY_CONFIG[activity.categoria] ?? CATEGORY_CONFIG.sensorial;

  return (
    <article className="bg-card rounded-3xl shadow-card hover:shadow-pop transition-bouncy hover:-translate-y-1 overflow-hidden flex flex-col relative cursor-pointer">
      {/* Link invisível cobrindo todo o card */}
      <Link
        to={`/app/atividade/${activity.id}`}
        state={{ rec: activity }}
        className="absolute inset-0 z-10 rounded-3xl"
        aria-label={`Ver detalhes de ${activity.titulo}`}
        tabIndex={0}
      />

      {/* Faixa colorida de categoria */}
      <div className={`h-1.5 w-full ${config.gradient}`} aria-hidden="true" />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Header: badge de categoria + botão favoritar */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {config.label}
          </span>
          <button
            type="button"
            onClick={() => activeChildId && toggleFavorite(activeChildId, activity)}
            aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            aria-pressed={favorited}
            className={`relative z-20 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              favorited
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
            }`}
          >
            <Heart
              className="w-4 h-4"
              fill={favorited ? "currentColor" : "none"}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Título */}
        <h3 className="font-heading text-lg font-semibold text-foreground leading-snug">
          {activity.titulo}
        </h3>

        {/* Descrição curta */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {activity.descricao_curta}
        </p>

        {/* Caixa de explicação da IA */}
        <div className="bg-accent/20 rounded-2xl p-3.5 flex gap-2.5">
          <Sparkles
            className="w-4 h-4 text-accent-foreground flex-shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-sm text-foreground leading-relaxed italic">
            {activity.explicacao}
          </p>
        </div>

        {/* Rodapé: tempo, barulho, fonte */}
        <div className="flex items-center gap-4 mt-auto pt-1 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {activity.tempo_minutos} min
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
            {NOISE_LABEL[activity.nivel_barulho]}
          </span>
          <span className="ml-auto text-xs font-semibold bg-muted text-muted-foreground px-3 py-1 rounded-full max-w-[160px] truncate">
            {activity.fonte}
          </span>
        </div>
      </div>
    </article>
  );
}
