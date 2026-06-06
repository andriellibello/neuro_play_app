import { GoogleGenAI } from "@google/genai";
import type { ChildProfile, Activity, AIActivityRecommendation } from "@/types";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY as string,
});

const AGE_LABELS: Record<string, string> = {
  "2-4": "2 a 4 anos",
  "5-7": "5 a 7 anos",
  "8-12": "8 a 12 anos",
};

function buildPrompt(profile: ChildProfile, activities: Activity[]): string {
  const activitiesPayload = activities.map((a) => ({
    id: a.id,
    nome: a.nome,
    descricao: a.descricao,
    objetivos: a.objetivos,
    beneficios: a.beneficios,
    areas_interesse: a.areas_interesse,
    tempo_minutos: a.tempo_minutos,
    nivel_barulho: a.nivel_barulho,
    fonte: a.fonte,
  }));

  return `Você é um especialista em TEA que ajuda pais a entender atividades terapêuticas para seus filhos.

Criança: ${profile.name}
Faixa etária: ${AGE_LABELS[profile.ageRange]}
Nível de suporte TEA: ${profile.supportLevel} (DSM-5)
Sensibilidades: ${profile.sensitivities.join(", ") || "nenhuma informada"}
Objetivos da família: ${profile.goals.join(", ") || "nenhum informado"}
Interesses: ${profile.interests.join(", ") || "nenhum informado"}

As atividades abaixo já foram selecionadas como seguras e compatíveis para ${profile.name}. Para cada uma, escreva uma explicação personalizada de 2 a 3 frases que ajude os pais a entender POR QUE essa atividade é boa especificamente para ${profile.name}. Use linguagem acolhedora, prática e sem jargões clínicos. Mencione a sensibilidade ou objetivo quando for relevante.

Retorne APENAS um array JSON válido, sem nenhum texto antes ou depois, sem markdown, sem blocos de código. Cada objeto deve ter exatamente estes campos:
- "id": o mesmo id da atividade (string)
- "titulo": o mesmo nome da atividade (string)
- "descricao_curta": descrição em até 12 palavras (string)
- "explicacao": explicação personalizada de 2 a 3 frases (string)
- "categoria": uma de "sensorial", "motora", "cognitiva", "social" ou "criativa" (string)
- "tempo_minutos": duração em minutos (number)
- "nivel_barulho": "baixo", "medio" ou "alto" (string)
- "fonte": fonte/protocolo da atividade (string)

Atividades compatíveis com ${profile.name}:
${JSON.stringify(activitiesPayload, null, 2)}`;
}

export async function getRecommendations(
  profile: ChildProfile,
  activities: Activity[],
): Promise<AIActivityRecommendation[]> {
  if (activities.length === 0) return [];

  const prompt = buildPrompt(profile, activities);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: { thinkingConfig: { thinkingBudget: 0 } },
  });

  const text = response.text ?? "";
  const cleaned = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  return JSON.parse(cleaned) as AIActivityRecommendation[];
}
