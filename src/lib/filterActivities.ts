import type { ChildProfile, Activity, AgeRange } from "@/types";

// Maps profile sensitivity value → evitar_se values that it blocks in activities.json
const SENSITIVITY_MAP: Record<string, string[]> = {
  barulhos_altos: ["hipersensibilidade_auditiva_severa"],
  texturas: [
    "hipersensibilidade_tatil_severa",
    "hipersensibilidade_tatil_severa_sem_acompanhamento_terapeutico",
    "hipersensibilidade_tatil_na_cabeca",
    "aversao_intensa_a_sujeira",
  ],
  contato_fisico: [
    "hipersensibilidade_tatil_severa",
    "hipersensibilidade_tatil_severa_sem_acompanhamento_terapeutico",
    "hipersensibilidade_tatil_na_cabeca",
    "aversao_intensa_a_sujeira",
  ],
  restricao_alimentar: ["restricao_alimentar_por_prescricao_medica"],
  luzes_fortes: [],
};

// Maps profile goal value → objetivos values that it matches in activities.json
const GOALS_MAP: Record<string, string[]> = {
  socializacao: [
    "atencao_compartilhada",
    "atencao_conjunta",
    "vinculo_com_cuidador",
    "interacao_social",
    "estimulacao_da_imitacao",
    "imitacao_motora",
  ],
  linguagem: [
    "estimulacao_da_linguagem",
    "estimulacao_da_linguagem_expressiva",
    "atencao_conjunta",
    "imitacao_vocal",
    "estimulacao_pre_verbal",
    "estimulacao_pre_verbal_e_verbal",
    "fortalecimento_muscular_oral",
    "pre_requisitos_para_articulacao",
    "comunicacao_funcional",
  ],
  fala: [
    "fortalecimento_muscular_oral",
    "pre_requisitos_para_articulacao",
    "controle_respiratorio",
    "imitacao_vocal",
    "estimulacao_pre_verbal",
    "estimulacao_pre_verbal_e_verbal",
    "estimulacao_da_linguagem_expressiva",
    "comunicacao_funcional",
  ],
  coordenacao_motora: [
    "coordenacao_motora_fina",
    "coordenacao_motora_global",
    "coordenacao_bimanual",
    "pinca_digital",
    "fortalecimento_motor_fino",
    "equilibrio_estatico_e_dinamico",
    "controle_corporal",
    "lateralidade",
    "postura_ereta",
    "consciencia_corporal",
  ],
  atencao: [
    "atencao_compartilhada",
    "atencao_conjunta",
    "concentracao",
    "atencao_e_instrucoes",
    "atencao_sustentada",
    "atencao_visual",
    "foco_visual",
  ],
  autorregulacao: [
    "autorregulacao",
    "reducao_de_ansiedade",
  ],
  regulacao_sensorial: [
    "exploracao_sensorial",
    "exploracao_sensorial_multimodal",
    "tolerancia_tatil",
    "dessensibilizacao_gradual",
    "nomeacao_de_sensacoes",
  ],
  autonomia: ["autonomia"],
  criatividade: ["expressao_criativa", "curiosidade"],
  sequenciamento: ["sequenciamento", "lateralidade", "rotina_positiva"],
};

function parseAgeRange(ageRange: AgeRange): { min: number; max: number } {
  const [min, max] = ageRange.split("-").map(Number);
  return { min, max };
}

export function filterActivities(
  profile: ChildProfile,
  activities: Activity[]
): Activity[] {
  const { min: profileAgeMin, max: profileAgeMax } = parseAgeRange(profile.ageRange);

  const blockedConditions = new Set(
    profile.sensitivities.flatMap((s) => SENSITIVITY_MAP[s] ?? [])
  );

  const matchingObjetivos = new Set(
    profile.goals.flatMap((g) => GOALS_MAP[g] ?? [])
  );

  return activities.filter((activity) => {
    // 1. Faixa etária — sobreposição numérica de intervalos (hard)
    if (
      activity.faixa_etaria.min > profileAgeMax ||
      activity.faixa_etaria.max < profileAgeMin
    )
      return false;

    // 2. Nível TEA (hard)
    if (!activity.nivel_tea.includes(profile.supportLevel)) return false;

    // 3. Sensibilidades — exclui se qualquer evitar_se for bloqueado (hard)
    if (activity.evitar_se.some((e) => blockedConditions.has(e))) return false;

    // 4. Interesses e objetivos — inclusão por relevância (soft — basta um match)
    const noPreferences =
      profile.interests.length === 0 && profile.goals.length === 0;
    if (noPreferences) return true;

    const matchesInterest = activity.areas_interesse.some((a) =>
      profile.interests.includes(a)
    );
    const matchesGoal = activity.objetivos.some((o) => matchingObjetivos.has(o));

    return matchesInterest || matchesGoal;
  });
}
