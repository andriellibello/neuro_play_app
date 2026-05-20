import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground"
          aria-label="NeuroPlay — página inicial"
        >
          <span className="text-2xl animate-wiggle inline-block" aria-hidden="true">🌈</span>
          NeuroPlay
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            to="/auth"
            className="px-4 py-2 rounded-full text-sm font-semibold text-foreground hover:bg-muted transition-bouncy"
            aria-label="Entrar na sua conta"
          >
            Entrar
          </Link>
          <Link
            to="/auth?mode=signup"
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-soft hover:shadow-pop transition-bouncy hover:-translate-y-0.5"
            aria-label="Começar gratuitamente"
          >
            Começar grátis
          </Link>
        </nav>
      </div>
    </header>
  );
}
