import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RegisterPage } from "./pages/authentication/RegisterPage";
import { LoginPage } from "./pages/authentication/LoginPage";
import { LogoutPage } from "./pages/authentication/LogoutPage";
import { ActivatePage } from "./pages/authentication/ActivatePage";
import { EmailSentPage } from "./pages/authentication/EmailSentPage";
import { ResendActivationPage } from "./pages/authentication/ResendActivationPage";

import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/register/" element={<RegisterPage />} />

        <Route path="/login/" element={<LoginPage />} />
        <Route path="/logout/" element={<LogoutPage />} />

        <Route path="/auth/activate/:uid/:token" element={<ActivatePage />} />
        <Route path="/auth/email-sent/" element={<EmailSentPage />} />
        <Route path="/auth/resend-activation/" element={<ResendActivationPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
