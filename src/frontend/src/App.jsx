import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RegisterPage } from "./pages/authentication/RegisterPage";
import { LoginPage } from "./pages/authentication/LoginPage";
import { LogoutPage } from "./pages/authentication/LogoutPage";
import { ActivatePage } from "./pages/authentication/ActivatePage";
import { EmailSentPage } from "./pages/authentication/EmailSentPage";
import { ResendActivationPage } from "./pages/authentication/ResendActivationPage";
import { PasswordResetPage } from "./pages/authentication/PasswordResetPage";
import { PasswordResetConfirmPage } from "./pages/authentication/PasswordResetConfirmPage";

import { PrivateRoute } from "./utils/PrivateRoute";

import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { PasswordChangePage } from "./pages/profile/PasswordChangePage";
import { EmailChangePage } from "./pages/profile/EmailChangePage";
import { UsernameChangePage } from "./pages/profile/UsernameChangePage";

import { NotFoundPage } from "./pages/NotFoundPage";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";

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
        <Route
          path="/auth/resend-activation/"
          element={<ResendActivationPage />}
        />
        <Route path="/auth/password/reset/" element={<PasswordResetPage />} />
        <Route
          path="/auth/password/reset/confirm/:uid/:token"
          element={<PasswordResetConfirmPage />}
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/change-password/"
          element={
            <PrivateRoute>
              <PasswordChangePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/change-email/"
          element={
            <PrivateRoute>
              <EmailChangePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/change-username/"
          element={
            <PrivateRoute>
              <UsernameChangePage />
            </PrivateRoute>
          }
        />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
