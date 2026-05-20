# NeuroPlay — Design System

Documento de referência visual do protótipo. Tudo é construído em **HSL** (não usar HEX direto) e via **tokens semânticos** do Tailwind.

---

## 1. Conceito

- **Tom:** lúdico, colorido, acolhedor — sem aparência clínica/medicinal.
- **Público:** pais e cuidadores de crianças atípicas.
- **Sensação:** brincadeira, leveza, segurança, curadoria humana.

---

## 2. Tipografia

| Uso | Fonte | Peso |
|---|---|---|
| Títulos (h1–h6) | **Fredoka** | 500–700 |
| Texto / corpo / botões | **Nunito** | 400–800 |

Importadas do Google Fonts em `index.html`.

```css
font-family: 'Fredoka', system-ui, sans-serif;   /* headings */
font-family: 'Nunito', system-ui, sans-serif;    /* body */
```

Classes Tailwind: `font-heading` e `font-body`.

Tamanhos do hero: `text-5xl md:text-6xl lg:text-7xl`, com `leading-[1.05]` e `tracking-[-0.01em]`.

---

## 3. Paleta de cores (HSL)

### Modo claro (`:root`)
| Token | HSL | Cor |
|---|---|---|
| `--background` | `40 100% 98%` | Creme suave |
| `--foreground` | `240 25% 18%` | Azul-noite escuro |
| `--primary` (Coral) | `12 92% 64%` | 🟠 Coral playful |
| `--secondary` (Mint) | `165 70% 55%` | 🟢 Menta |
| `--accent` (Amarelo) | `45 100% 65%` | 🟡 Amarelo solar |
| `--sky` | `200 90% 65%` | 🔵 Azul céu |
| `--lavender` | `265 75% 72%` | 🟣 Lavanda |
| `--muted` | `40 40% 94%` | Bege claro |
| `--destructive` | `0 75% 60%` | 🔴 Vermelho |
| `--border` | `35 30% 88%` | Bege borda |

### Modo escuro (`.dark`)
- `--background: 240 25% 10%`
- `--foreground: 40 30% 95%`
- Cores primárias mantidas para consistência da marca.

---

## 4. Gradientes

```css
bg-gradient-hero    /* coral → amarelo → mint, 135° */
bg-gradient-sunset  /* coral → rosa, 135° */
bg-gradient-sky     /* azul → lavanda, 135° */
bg-gradient-mint    /* mint → ciano, 135° */
bg-gradient-soft    /* creme → bege, 180° */
```

Mapeamento por categoria de atividade:
- **sensorial** → `bg-gradient-sunset`
- **motora** → `bg-gradient-mint`
- **cognitiva** → `bg-gradient-sky`
- **social** → `bg-gradient-hero`
- **criativa** → `bg-accent`

---

## 5. Sombras

```css
shadow-soft   /* botões — 0 8px 24px -8px coral/18% */
shadow-pop    /* hover, hero — 0 12px 32px -10px lavanda/25% */
shadow-card   /* cards — 0 4px 16px -4px noite/8% */
```

---

## 6. Border-radius

`--radius: 1.25rem` (20px) — cantos generosos, sensação fofa.

| Classe | Tamanho | Uso |
|---|---|---|
| `rounded-full` | 9999px | Botões, chips, badges |
| `rounded-2xl` | 1rem | Inputs, mini-cards, tags |
| `rounded-3xl` | 1.5rem | Cards de feature, atividades |
| `rounded-[2rem]` | 2rem | Cards grandes, imagem hero |

---

## 7. Botões

Padrão (`src/components/ui/button.tsx`):

| Variante | Estilo |
|---|---|
| `default` | `bg-primary text-primary-foreground` (coral sólido) |
| `outline` | borda + fundo transparente |
| `ghost` | só hover (header) |
| `secondary` | mint |
| `destructive` | vermelho |

Tamanhos: `sm` (h-9) · `default` (h-10) · `lg` (h-11 px-8) · `icon`.

**Padrão NeuroPlay:** sempre `rounded-full`, CTA principal com `shadow-pop`.

```tsx
<Button className="rounded-full shadow-pop">Começar grátis</Button>
<Button variant="outline" className="rounded-full">Já tenho conta</Button>
```

---

## 8. Cards

```tsx
<div className="bg-card rounded-3xl shadow-card
                hover:shadow-pop transition-bouncy
                hover:-translate-y-1 p-8">
```

- Faixa colorida superior (`h-2`) indica categoria.
- Hover: sobe 1px + sombra "pop".
- Texto secundário em `text-muted-foreground`.

---

## 9. Animações & Transições

`transition-bouncy` → `cubic-bezier(0.34, 1.56, 0.64, 1)` por 0.3s.

| Classe | Efeito | Uso |
|---|---|---|
| `animate-float` | sobe-desce 10px (4s) | Elementos flutuantes |
| `animate-wiggle` | rotação ±2° (2s) | Logo |
| `animate-pop-in` | escala 0.8→1 + fade (0.4s) | Entrada de hero/cards |
| `animate-blob` | morph orgânico (8s) | Blob de fundo do hero |
| `transition-bouncy` | bounce easing (0.3s) | Hover de cards/botões |

---

## 10. Iconografia

- **Lucide React** para ícones (Heart, Clock, Sparkles, Brain, Users, ShieldCheck…).
- Emojis como elementos de marca/categoria: 🎮 🧩 🎨 🎵 🤸 ✨ ❤️.

---

## 11. Tags / Chips

```tsx
<span className="px-4 py-2 rounded-full bg-muted text-sm font-semibold">
  Integração Sensorial (Ayres)
</span>
```

Banner "Sparkles":
```tsx
<div className="inline-flex items-center gap-2 bg-accent/30
                text-accent-foreground px-4 py-2 rounded-full
                text-sm font-semibold">
```

---

## 12. Estrutura de página

- Container central: `container` (max 1400px, padding 2rem).
- Espaçamento vertical de seções: `py-12 md:py-20` ou `py-16`.
- Hero em grid 2 colunas a partir de `lg:`.

---

## 13. Regras de uso

1. **Nunca** use cores HEX direto em componentes — sempre tokens (`bg-primary`, `text-foreground`).
2. **Sempre HSL** ao definir novas cores no `index.css`.
3. Cantos arredondados generosos (`rounded-full`/`rounded-3xl`) — nunca quadrados secos.
4. Botões principais sempre com sombra `shadow-pop` ou `shadow-soft`.
5. Texto auxiliar em `text-muted-foreground`, nunca cinza fixo.
6. Animações leves e amigáveis — evitar movimentos bruscos.

---

## Arquivos do design system

- `src/index.css` — tokens, gradientes, sombras, animações
- `tailwind.config.ts` — mapeamento de tokens → classes Tailwind
- `DESIGN_SYSTEM.md` — este documento
