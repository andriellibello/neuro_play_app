export type AgeRange = "2-4" | "5-7" | "8-12";

export interface Activity {
  id: string;
  nome: string;
  descricao: string;
  como_fazer: string;
  faixa_etaria: { min: number; max: number };
  nivel_tea: (1 | 2 | 3)[];
  beneficios: string[];
  evitar_se: string[];
  nivel_barulho: "baixo" | "medio" | "alto";
  nivel_baguncia: "baixo" | "medio" | "alto";
  tempo_minutos: number;
  materiais: string[];
  areas_interesse: string[];
  objetivos: string[];
  fonte: string;
  tags: string[];
}
export type SupportLevel = 1 | 2 | 3;

export interface Guardian {
  name: string;
  email: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  ageRange: AgeRange;
  supportLevel: SupportLevel;
  interests: string[];
  sensitivities: string[];
  goals: string[];
}

export type AuthMode = "login" | "signup";

export interface AuthFormState {
  name: string;
  email: string;
  password: string;
}

export interface AuthFieldErrors {
  name?: string;
  email?: string;
  password?: string;
}

export interface ChildProfileForm {
  name: string;
  ageRange: AgeRange | null;
  supportLevel: SupportLevel | null;
  interests: string[];
  sensitivities: string[];
  goals: string[];
}

export interface ChildFormErrors {
  name?: string;
  ageRange?: string;
  supportLevel?: string;
}

export interface AIActivityRecommendation {
  id: string;
  titulo: string;
  descricao_curta: string;
  explicacao: string;
  categoria: "sensorial" | "motora" | "cognitiva" | "social" | "criativa";
  tempo_minutos: number;
  nivel_barulho: "baixo" | "medio" | "alto";
  fonte: string;
}
