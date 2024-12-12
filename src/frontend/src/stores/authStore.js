import { create } from "zustand";
import { apiFetch } from "../utils/apiFetch";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  // Fonction pour définir les tokens
  setTokens: (accessToken, refreshToken) => {
    set({ accessToken, refreshToken });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },

  // Fonction pour effacer les tokens
  clearTokens: () => {
    set({ accessToken: null, refreshToken: null, user: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  activationEmail: "",
  setActivationEmail: (value) => set(() => ({ activationEmail: value })),

  // Fonction d'inscription
  registerUser: async (formData) => {
    try {
      const response = await apiFetch("POST", "auth/users/", formData);
      return { isLoading: false, success: true, data: response.data };
    } catch (e) {
      return {
        isLoading: false,
        success: false,
        error: e.response?.data || "Une erreur s'est produite",
      };
    }
  },

  // Fonction de connexion
  loginUser: async (username, password) => {
    try {
      const response = await apiFetch("POST", "auth/jwt/create/", {
        username,
        password,
      });
      useAuthStore
        .getState()
        .setTokens(response.data.access, response.data.refresh);
      return { success: true };
    } catch (e) {
      console.log("Erreur lors de l'authentification avec l'API", e);
      return {
        success: false,
        error: e.response?.data || "Erreur inconnue lors de la connexion",
      };
    }
  },

  // Fonction de déconnexion
  logoutUser: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    });
  },

  // Fonction pour rafraîchir le token d'accès
  refreshAccessToken: async (refreshToken) => {
    try {
      const response = await apiFetch("POST", "auth/jwt/refresh/", {
        refresh: refreshToken,
      });
      return response.data;
    } catch (e) {
      console.error("Erreur lors du rafraîchissement du token", e);
    }
  },

  checkAuthStatus: () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      set({ accessToken, refreshToken });
    }
  },

  // Vérification de la validité du token
  verifyToken: async (token) => {
    try {
      await apiFetch("POST", "auth/jwt/verify/", { token });
      return { success: true };
    } catch (e) {
      console.log("Erreur de la vérification du token", e);
      return { success: false, error: e.response?.data };
    }
  },

  activateUser: async (uid, token) => {
    try {
      const response = await apiFetch("POST", "auth/users/activation/", {
        uid,
        token,
      });
      console.log(response);
      return { success: true };
    } catch (e) {
      return {
        success: false,
        error: e.response.response?.data || "Erreur d'activation",
      };
    }
  },

  resendActivationEmail: async (email) => {
    try {
      await apiFetch("POST", "auth/users/resend_activation/", { email });
      return { success: true };
    } catch (e) {
      console.log("Erreur lors du renvoi de l'e-mail d'activation", e);
      return {
        success: false,
        error: e.response?.data || "Erreur lors du renvoi de l'e-mail",
      };
    }
  },

  requestPasswordReset: async (email) => {
    try {
      await apiFetch("POST", "auth/users/reset_password/", { email });
      return { success: true };
    } catch (e) {
      console.log(e.response);
      return {
        success: false,
        error:
          e.response.response?.data ||
          "Erreur lors de la demande de réinitialisation.",
      };
    }
  },

  confirmResetPassword: async (uid, token, newPassword) => {
    try {
      await apiFetch("POST", "auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: newPassword,
      });
      return { success: true };
    } catch (e) {
      return {
        success: false,
        error:
          e.response?.response?.data ||
          "Erreur lors de la réinitialisation du mot de passe.",
      };
    }
  },

  fetchUser: async () => {
    try {
      const response = await apiFetch("GET", "auth/users/me/", null);
      set({ user: response.data });
    } catch (error) {
      console.error("Erreur API :", error);
    }
  },

  updateUser: async (user, data) => {
    try {
      await apiFetch("PATCH", `auth/users/${user?.id}/`, data);
      set({ user: { ...user, ...data } });
      return true;
    } catch (error) {
      console.error("Erreur :", error);
      return false;
    }
  },

  changeEmail: async (newEmail) => {
    const { user, clearTokens } = useAuthStore.getState();
    try {
      await apiFetch("PATCH", `auth/users/${user?.id}/`, { email: newEmail });
      clearTokens();
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'email", error);
      return {
        success: false,
        error: error.response?.data || "Une erreur s'est produite",
      };
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    try {
      await apiFetch("POST", "auth/users/set_password/", {
        current_password: currentPassword,
        new_password: newPassword,
      });

      // Le mot de passe a été changé avec succès, on déconnecte l'utilisateur
      useAuthStore.getState().clearTokens();

      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe", error);
      return {
        success: false,
        error: error.response?.data || "Une erreur s'est produite",
      };
    }
  },
}));
