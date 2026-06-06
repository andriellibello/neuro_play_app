import { useNavigate } from "react-router-dom";
import { Brain, Heart, ShieldCheck, Users } from "lucide-react";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="container py-16 md:py-24 lg:py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Texto */}
        <div className="animate-pop-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/30 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span aria-hidden="true">✨</span>
            Atividades pensadas para cada criança
          </div>

          {/* Título */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.15] tracking-[-0.01em] mb-6">
            Brincar é o caminho{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 px-2">do desenvolvimento.</span>
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-xl bg-gradient-hero opacity-90"
              />
            </span>
          </h1>

          {/* Descrição */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
            NeuroPlay sugere atividades lúdicas, sensoriais e cognitivas para
            crianças atípicas — personalizadas pelo perfil da sua criança e
            baseadas em métodos reconhecidos de Terapia Ocupacional.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              onClick={() => navigate("/auth?mode=signup")}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-pop hover:shadow-soft transition-bouncy hover:-translate-y-0.5 text-sm md:text-base"
              aria-label="Criar perfil da sua criança"
            >
              Criar perfil da criança
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-bouncy text-sm md:text-base"
              aria-label="Entrar na sua conta existente"
            >
              Já tenho conta
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            Sem tom medicinal. Sempre com curadoria humana e referências.
          </p>
        </div>

        {/* Imagem hero */}
        <div className="flex justify-center lg:justify-end animate-float">
          <div className="rounded-[2rem] overflow-hidden shadow-pop bg-[hsl(195_60%_93%)] w-full">
            <img
              src={`${import.meta.env.BASE_URL}hero-kids.jpg`}
              alt="Crianças brincando juntas de forma lúdica e acolhedora"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const HOW_IT_WORKS = [
  {
    icon: <Heart className="w-7 h-7 text-white" aria-hidden="true" />,
    gradient: "bg-gradient-sunset",
    number: "1.",
    title: "Perfil acolhedor",
    description:
      "Você cadastra idade, interesses, sensibilidades e objetivos da família.",
  },
  {
    icon: <Brain className="w-7 h-7 text-white" aria-hidden="true" />,
    gradient: "bg-gradient-mint",
    number: "2.",
    title: "IA com curadoria",
    description:
      "Nossa IA seleciona atividades de um banco validado por especialistas — nunca inventa.",
  },
  {
    icon: <Users className="w-7 h-7 text-white" aria-hidden="true" />,
    gradient: "bg-gradient-sky",
    number: "3.",
    title: "Comunidade que apoia",
    description:
      "Outros pais compartilham como adaptaram cada atividade no dia a dia.",
  },
];

const METHODS = [
  "Integração Sensorial (Ayres)",
  "DIR/Floortime",
  "TEACCH",
  "Terapia Ocupacional Pediátrica",
  "Mindfulness aplicado",
];

function HowItWorksSection() {
  return (
    <section
      className="bg-gradient-soft py-16 md:py-24"
      aria-label="Como funciona"
    >
      <div className="container">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-foreground mb-12">
          Como funciona
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.title}
              className="bg-card rounded-3xl shadow-card hover:shadow-pop transition-bouncy hover:-translate-y-1 p-8"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${item.gradient} flex items-center justify-center mb-5 shadow-soft`}
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                {item.number} {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* IA que não inventa */}
        <div className="bg-card rounded-3xl shadow-card p-8 md:p-10">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck
              className="w-6 h-6 text-secondary"
              aria-hidden="true"
            />
            <h3 className="font-heading text-2xl font-semibold text-foreground">
              IA que não inventa
            </h3>
          </div>
          <p className="text-muted-foreground mb-5">
            Toda atividade vem de um banco curado, baseado em métodos
            reconhecidos:
          </p>
          <div
            className="flex flex-wrap gap-3"
            role="list"
            aria-label="Métodos terapêuticos"
          >
            {METHODS.map((method) => (
              <span
                key={method}
                role="listitem"
                className="px-4 py-2 rounded-full bg-muted text-foreground text-sm font-semibold"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container flex justify-center">
        <p className="text-sm text-muted-foreground text-center">
          <span aria-hidden="true">🌈</span> NeuroPlay · Projeto acadêmico · Não
          substitui acompanhamento profissional.
        </p>
      </div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}
