import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarApp } from "../components/NavbarApp";
import { useAppStore } from "../store/useAppStore";
import type {
  AgeRange,
  SupportLevel,
  ChildProfileForm,
  ChildFormErrors as FormErrors,
} from "../types";

// ── Data ───────────────────────────────────────────────────────────────────

const AGE_RANGES: { value: AgeRange; label: string }[] = [
  { value: "2-4", label: "2 a 4 anos" },
  { value: "5-7", label: "5 a 7 anos" },
  { value: "8-12", label: "8 a 12 anos" },
];

const SUPPORT_LEVELS: {
  value: SupportLevel;
  label: string;
  description: string;
}[] = [
  { value: 1, label: "Nível 1", description: "Necessita pouco suporte" },
  { value: 2, label: "Nível 2", description: "Suporte substancial" },
  { value: 3, label: "Nível 3", description: "Suporte muito substancial" },
];

const INTERESTS: { value: string; label: string }[] = [
  { value: "musica", label: "música" },
  { value: "artes", label: "artes e desenho" },
  { value: "animais", label: "animais" },
  { value: "agua", label: "água" },
  { value: "movimento", label: "movimento" },
  { value: "historias", label: "histórias e leitura" },
  { value: "fala", label: "fala e sons" },
  { value: "jogos", label: "jogos" },
  { value: "sensorial", label: "sensorial" },
  { value: "descoberta", label: "descoberta" },
  { value: "construcao", label: "construir" },
  { value: "culinaria", label: "cozinhar" },
  { value: "alimentacao", label: "alimentação" },
  { value: "interacao_social", label: "interação social" },
  { value: "criatividade", label: "criar / criatividade" },
  { value: "desafios", label: "aventura e desafios" },
  { value: "faz_de_conta", label: "faz de conta" },
];

const SENSITIVITIES = [
  { value: "barulhos_altos", label: "barulhos altos" },
  { value: "texturas", label: "texturas" },
  { value: "luzes_fortes", label: "luzes fortes" },
  { value: "restricao_alimentar", label: "restrição alimentar" },
  { value: "contato_fisico", label: "contato físico" },
];

const GOALS: { value: string; label: string }[] = [
  { value: "socializacao", label: "socialização" },
  { value: "linguagem", label: "linguagem" },
  { value: "fala", label: "fala" },
  { value: "coordenacao_motora", label: "coordenação motora" },
  { value: "atencao", label: "atenção" },
  { value: "autorregulacao", label: "autorregulação" },
  { value: "regulacao_sensorial", label: "regulação sensorial" },
  { value: "autonomia", label: "autonomia" },
  { value: "criatividade", label: "criatividade" },
  { value: "sequenciamento", label: "sequenciamento" },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

function validate(form: ChildProfileForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Informe o nome ou apelido.";
  if (!form.ageRange) errors.ageRange = "Selecione uma faixa etária.";
  if (!form.supportLevel) errors.supportLevel = "Selecione o nível de suporte.";
  return errors;
}

// ── Component ──────────────────────────────────────────────────────────────

export function NewChildPage() {
  const navigate = useNavigate();
  const addChild = useAppStore((s) => s.addChild);

  const [form, setForm] = useState<ChildProfileForm>({
    name: "",
    ageRange: null,
    supportLevel: null,
    interests: [],
    sensitivities: [],
    goals: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      const firstErrorKey = Object.keys(fieldErrors)[0];
      document
        .getElementById(firstErrorKey)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    addChild({
      id: generateId(),
      name: form.name,
      ageRange: form.ageRange!,
      supportLevel: form.supportLevel!,
      interests: form.interests,
      sensitivities: form.sensitivities,
      goals: form.goals,
    });
    navigate("/app/atividades");
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, hsl(40 100% 97%) 0%, hsl(30 80% 94%) 100%)",
      }}
    >
      <NavbarApp />

      <main className="container max-w-2xl py-10 px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Conta sobre sua criança 💛
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Quanto mais souber, mais personalizadas serão as sugestões.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          {/* ── Section 1: Identification ─────────────────────────────── */}
          <section
            className="bg-card rounded-3xl p-6 shadow-card flex flex-col gap-5"
            aria-labelledby="secao-identificacao"
          >
            <h2 id="secao-identificacao" className="sr-only">
              Identificação e nível TEA
            </h2>

            {/* Name */}
            <div className="flex flex-col gap-1.5" id="name">
              <label
                htmlFor="name-input"
                className="text-sm font-semibold text-foreground"
              >
                Nome ou apelido
              </label>
              <input
                id="name-input"
                type="text"
                autoComplete="off"
                placeholder="Insira aqui o nome ou apelido da sua criança"
                value={form.name}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name)
                    setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`h-11 px-4 rounded-xl border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                  errors.name ? "border-destructive" : "border-input"
                }`}
              />
              {errors.name && (
                <p id="name-error" className="text-destructive text-xs">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Age range */}
            <div className="flex flex-col gap-2" id="ageRange">
              <span className="text-sm font-semibold text-foreground">
                Faixa etária
              </span>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Selecione a faixa etária"
              >
                {AGE_RANGES.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={form.ageRange === value}
                    onClick={() => {
                      setForm((prev) => ({ ...prev, ageRange: value }));
                      if (errors.ageRange)
                        setErrors((prev) => ({
                          ...prev,
                          ageRange: undefined,
                        }));
                    }}
                    className={`h-10 px-5 rounded-full text-sm font-semibold border transition-bouncy ${
                      form.ageRange === value
                        ? "bg-primary text-primary-foreground border-primary shadow-soft"
                        : "bg-background text-foreground border-input hover:border-primary/50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {errors.ageRange && (
                <p className="text-destructive text-xs">{errors.ageRange}</p>
              )}
            </div>

            {/* Support level */}
            <div className="flex flex-col gap-2" id="supportLevel">
              <span className="text-sm font-semibold text-foreground">
                Nível de suporte (DSM-5)
              </span>
              <div
                className="grid grid-cols-3 gap-2"
                role="group"
                aria-label="Selecione o nível de suporte TEA"
              >
                {SUPPORT_LEVELS.map(({ value, label, description }) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={form.supportLevel === value}
                    onClick={() => {
                      setForm((prev) => ({ ...prev, supportLevel: value }));
                      if (errors.supportLevel)
                        setErrors((prev) => ({
                          ...prev,
                          supportLevel: undefined,
                        }));
                    }}
                    className={`flex flex-col items-start gap-0.5 p-3 rounded-2xl border text-left transition-bouncy ${
                      form.supportLevel === value
                        ? "bg-primary/10 border-primary text-primary shadow-soft"
                        : "bg-background border-input text-foreground hover:border-primary/50"
                    }`}
                  >
                    <span className="text-sm font-bold">{label}</span>
                    <span
                      className={`text-xs leading-tight ${form.supportLevel === value ? "text-primary/80" : "text-muted-foreground"}`}
                    >
                      {description}
                    </span>
                  </button>
                ))}
              </div>
              {errors.supportLevel && (
                <p className="text-destructive text-xs">
                  {errors.supportLevel}
                </p>
              )}
            </div>
          </section>

          {/* ── Section 2: Interests ──────────────────────────────────── */}
          <section
            className="bg-card rounded-3xl p-6 shadow-card"
            aria-labelledby="secao-interesses"
          >
            <h2
              id="secao-interesses"
              className="text-base font-bold text-foreground mb-4"
            >
              Interesses ✨
            </h2>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Selecione os interesses da criança"
            >
              {INTERESTS.map(({ value, label }) => {
                const selected = form.interests.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        interests: toggle(prev.interests, value),
                      }))
                    }
                    className={`h-9 px-4 rounded-full text-sm border transition-bouncy ${
                      selected
                        ? "bg-secondary text-secondary-foreground border-secondary shadow-soft"
                        : "bg-background text-foreground border-input hover:border-secondary/60"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Section 3: Sensitivities ──────────────────────────────── */}
          <section
            className="bg-card rounded-3xl p-6 shadow-card"
            aria-labelledby="secao-sensibilidades"
          >
            <h2
              id="secao-sensibilidades"
              className="text-base font-bold text-foreground mb-1"
            >
              Sensibilidades 🩶
            </h2>
            <p className="text-muted-foreground text-xs mb-4">
              Vamos evitar atividades que possam incomodar.
            </p>
            <ul
              className="flex flex-col gap-3"
              role="group"
              aria-label="Selecione as sensibilidades da criança"
            >
              {SENSITIVITIES.map(({ value, label }) => {
                const checked = form.sensitivities.includes(value);
                return (
                  <li key={value}>
                    <label className="flex items-center gap-3 cursor-pointer group select-none">
                      <span
                        role="checkbox"
                        aria-checked={checked}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            setForm((prev) => ({
                              ...prev,
                              sensitivities: toggle(prev.sensitivities, value),
                            }));
                          }
                        }}
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            sensitivities: toggle(prev.sensitivities, value),
                          }))
                        }
                        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-colors flex items-center justify-center ${
                          checked
                            ? "bg-primary border-primary"
                            : "border-primary/50 group-hover:border-primary"
                        }`}
                      >
                        {checked && (
                          <span
                            className="block w-2 h-2 rounded-full bg-primary-foreground"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      <span className="text-sm text-foreground">{label}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* ── Section 4: Goals ─────────────────────────────────────── */}
          <section
            className="bg-card rounded-3xl p-6 shadow-card"
            aria-labelledby="secao-objetivos"
          >
            <h2
              id="secao-objetivos"
              className="text-base font-bold text-foreground mb-4"
            >
              Objetivos da família 🎯
            </h2>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Selecione os objetivos da família"
            >
              {GOALS.map(({ value, label }) => {
                const selected = form.goals.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        goals: toggle(prev.goals, value),
                      }))
                    }
                    className={`h-9 px-4 rounded-full text-sm border transition-bouncy ${
                      selected
                        ? "bg-accent text-accent-foreground border-accent shadow-soft"
                        : "bg-background text-foreground border-input hover:border-accent/60"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── CTA ──────────────────────────────────────────────────── */}
          <button
            type="submit"
            className="h-14 w-full rounded-full bg-primary text-primary-foreground font-heading text-base font-bold shadow-soft hover:shadow-pop transition-bouncy hover:-translate-y-0.5 mt-2"
          >
            Ver atividades sugeridas →
          </button>
        </form>
      </main>
    </div>
  );
}
