import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { NewChildPage } from "./pages/NewChildPage";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
