# Neuro Play

Web app responsivo que recomenda atividades terapêuticas e lúdicas para crianças com TEA (Transtorno do Espectro Autista). O app cruza o perfil da criança com um banco de atividades curadas e usa IA para explicar as recomendações em linguagem simples e acolhedora para os responsáveis.

**Público-alvo:** Pais, mães e cuidadores de crianças com TEA (1–12 anos).

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + Vite 8 |
| Linguagem | TypeScript 6 (strict) |
| Estilos | Tailwind CSS 3 + shadcn/ui |
| Estado global | Zustand 5 |
| Roteamento | React Router DOM 7 |
| IA | Google Gemini via `@google/genai` |
| Ícones | Lucide React |

---

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
git clone <url-do-repositório>
cd app_neuro_play
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz com sua chave da API do Google Gemini:

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
```
### Rodando em desenvolvimento

```bash
npm run dev
```

---

## Arquitetura do sistema

O app usa uma abordagem de RAG simplificado em duas camadas:

```
Perfil da criança
      ↓
Filtro TypeScript no cliente (activities.json)
      ↓
~8–12 atividades compatíveis
      ↓
Prompt para a IA (perfil + atividades filtradas)
      ↓
Feed de cards personalizados para o responsável
```

**Camada 1 – Filtro no código:** `src/lib/filterActivities.ts` seleciona do banco local (`src/data/activities.json`) apenas as atividades compatíveis com o perfil da criança — faixa etária, nível de suporte TEA e sensibilidades.

**Camada 2 – IA como explicador:** As atividades já filtradas + o perfil da criança são enviados ao Gemini. A IA **não cria atividades** — ela apenas explica, personaliza a linguagem e organiza as recomendações. Qualquer atividade mencionada pela IA que não conste no JSON filtrado é descartada.

---

## Estrutura de pastas

```
src/
├── components/       # Componentes de UI reutilizáveis
│   └── ui/           # Componentes shadcn/ui customizados
├── data/
│   └── activities.json  # Banco de atividades curadas (fonte da verdade)
├── lib/
│   ├── filterActivities.ts  # Motor de filtragem por perfil
│   ├── iaClient.ts          # Cliente da API Gemini
│   └── utils.ts             # Utilitários (cn, etc.)
├── pages/            # Telas da aplicação
├── store/
│   └── useAppStore.ts  # Estado global (Zustand)
└── types/
    └── index.ts      # Todos os tipos e interfaces TypeScript
```

---

## Fluxo de telas

```
Landing Page (boas-vindas)
    ↓
Auth Page (login / cadastro)
    ↓
Cadastro do Perfil da Criança (wizard 4 etapas)
    ↓  Etapa 1: Nome + faixa etária + nível TEA
    ↓  Etapa 2: Áreas de interesse
    ↓  Etapa 3: Sensibilidades
    ↓  Etapa 4: Objetivos da família
    ↓
Feed (atividades recomendadas com explicação da IA)
    ↓
Favoritos / Perfil
```

---

## Banco de atividades

`src/data/activities.json` é a fonte da verdade do app. Cada atividade segue o schema:

```ts
interface Activity {
  id: string;
  nome: string;
  descricao: string;
  como_fazer: string;
  faixa_etaria: { min: number; max: number };
  nivel_tea: (1 | 2 | 3)[];       // níveis de suporte DSM-5
  beneficios: string[];
  evitar_se: string[];             // sensibilidades contraindicadas
  nivel_barulho: "baixo" | "medio" | "alto";
  nivel_baguncia: "baixo" | "medio" | "alto";
  tempo_minutos: number;
  materiais: string[];
  areas_interesse: string[];
  objetivos: string[];
  fonte: string;
  tags: string[];
}
```

Uma atividade é **excluída** do resultado se qualquer item de `evitar_se` estiver presente nas sensibilidades cadastradas no perfil da criança.

---

## Design System

Tom visual: lúdico, colorido e acolhedor — sem aparência clínica.

- **Fontes:** Fredoka (títulos) + Nunito (corpo)
- **Paleta:** coral, mint, amarelo solar, azul céu, lavanda sobre fundo creme
- **Componentes:** cantos arredondados generosos (`rounded-3xl` / `rounded-full`), animações leves com easing bounce
- **Cores sempre via tokens HSL** do Tailwind — nunca valores HEX inline

Documentação completa em [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

---

## Convenções de código

- TypeScript estrito — sem `any`
- Tipos e interfaces exclusivamente em `src/types/`
- Sempre `import type` para importar apenas tipos
- Componentes: `PascalCase` | Hooks: `useXxx` | Funções puras: `camelCase`
- Nomes de arquivos e variáveis sempre em inglês; textos de UI em português
- Lógica de negócio em `src/lib/` ou hooks — nunca diretamente em componentes de UI
- Estilização exclusivamente via classes Tailwind

---

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção (type-check + Vite) |
| `npm run preview` | Serve o build localmente |
| `npm run lint` | Lint com ESLint |
