import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { NewChildPage } from "./pages/NewChildPage";
import { FeedPage } from "./pages/FeedPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { ActivityDetailPage } from "./pages/ActivityDetailPage";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main>
                <LandingPage />
              </main>
            </>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app/criancas/nova" element={<NewChildPage />} />
        <Route path="/app/atividades" element={<FeedPage />} />
        <Route path="/app/favoritos" element={<FavoritesPage />} />
        <Route path="/app/atividade/:id" element={<ActivityDetailPage />} />
        <Route path="/app/perfil" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
