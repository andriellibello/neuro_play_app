import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import type { AuthMode as Mode, AuthFormState as FormState, AuthFieldErrors as FieldError } from "../types";

function validate(mode: Mode, form: FormState): FieldError {
  const errors: FieldError = {};
  if (mode === "signup" && !form.name.trim()) {
    errors.name = "Informe seu nome.";
  }
  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Informe um e-mail válido.";
  }
  if (form.password.length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres.";
  }
  return errors;
}

export function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode: Mode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const setGuardian = useAppStore((s) => s.setGuardian);

  const [form, setForm] = useState<FormState>({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<FieldError>({});
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldError]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fieldErrors = validate(mode, form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setGuardian({ name: form.name, email: form.email });
    navigate("/app/criancas/nova");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4"
      style={{ background: "linear-gradient(160deg, hsl(40 100% 97%) 0%, hsl(30 80% 94%) 100%)" }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground mb-8"
        aria-label="Voltar para a página inicial do NeuroPlay"
      >
        <span className="text-2xl" aria-hidden="true">🌈</span>
        NeuroPlay
      </Link>

      {/* Card */}
      <div className="w-full max-w-sm bg-card rounded-3xl shadow-pop p-8 animate-pop-in">
        {mode === "login" ? (
          <>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Bem-vindo</h1>
            <p className="text-muted-foreground text-sm mb-6">Que bom te ver de novo!</p>
          </>
        ) : (
          <>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Criar conta</h1>
            <p className="text-muted-foreground text-sm mb-6">Vamos começar conhecendo você.</p>
          </>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {mode === "signup" && (
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-semibold text-foreground">
                Seu nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Como podemos te chamar"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`h-11 px-4 rounded-xl border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                  errors.name ? "border-destructive" : "border-input"
                }`}
              />
              {errors.name && (
                <p id="name-error" className="text-destructive text-xs mt-0.5">{errors.name}</p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-semibold text-foreground">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`h-11 px-4 rounded-xl border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                errors.email ? "border-destructive" : "border-input"
              }`}
            />
            {errors.email && (
              <p id="email-error" className="text-destructive text-xs mt-0.5">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-semibold text-foreground">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                placeholder="Mínimo 6 caracteres"
                value={form.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                className={`h-11 w-full px-4 pr-11 rounded-xl border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                  errors.password ? "border-destructive" : "border-input"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-destructive text-xs mt-0.5">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-1 h-11 w-full rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-soft hover:shadow-pop transition-bouncy hover:-translate-y-0.5"
          >
            {mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-5">
          {mode === "login" ? (
            <>
              Não tem conta?{" "}
              <Link
                to="/auth?mode=signup"
                className="text-primary font-semibold hover:underline"
              >
                Crie uma
              </Link>
            </>
          ) : (
            <>
              Já tem conta?{" "}
              <Link
                to="/auth"
                className="text-primary font-semibold hover:underline"
              >
                Entrar
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
