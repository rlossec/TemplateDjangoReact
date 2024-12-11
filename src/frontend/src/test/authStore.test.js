import { jest } from "@jest/globals";
import { useAuthStore } from "../stores/authStore";
import { apiFetch } from "../utils/apiFetch"; //

// Mock de apiFetch
jest.mock("../utils/apiFetch", () => ({
  apiFetch: jest.fn(),
}));

describe("useAuthStore", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise les mocks avant chaque test
  });

  // Tests pour registerUser
  describe("registerUser", () => {
    it("should handle success", async () => {
      const mockResponse = { data: { detail: "Inscription réussie !" } };
      apiFetch.mockResolvedValue(mockResponse);

      const store = useAuthStore.getState();
      const result = await store.registerUser({
        username: "testuser",
        email: "test@example.com",
        password: "password",
      });

      expect(apiFetch).toHaveBeenCalledWith("POST", "/auth/users/", {
        username: "testuser",
        email: "test@example.com",
        password: "password",
      });
      expect(result).toEqual(mockResponse.data);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBeNull();
    });

    it("should handle error", async () => {
      const mockError = {
        response: {
          response: { data: { email: ["Email déjà utilisé."] } },
        },
      };
      apiFetch.mockRejectedValue(mockError); // Mock de l'erreur

      const store = useAuthStore.getState();
      await store.registerUser({
        username: "testuser",
        email: "test@example.com",
        password: "password",
      });

      const updatedStore = useAuthStore.getState(); // Récupère l'état du store après mise à jour

      // Attendez que l'état du store soit mis à jour
      expect(apiFetch).toHaveBeenCalled();
      expect(updatedStore.error).toEqual(mockError.response.response.data);
      expect(updatedStore.isLoading).toBe(false);
    });
  });

  // Tests pour loginUser
  describe("loginUser", () => {
    it("should handle success", async () => {
      const mockResponse = {
        access_token: "access_token_example",
        refresh_token: "refresh_token_example",
      };
      apiFetch.mockResolvedValue(mockResponse);

      const store = useAuthStore.getState();
      const result = await store.loginUser("testuser", "password");

      const updatedStore = useAuthStore.getState();

      expect(apiFetch).toHaveBeenCalledWith("POST", "auth/jwt/create/", {
        username: "testuser",
        password: "password",
      });

      expect(result.success).toBe(true);
      expect(updatedStore.accessToken).toBe(mockResponse.access_token);
      expect(updatedStore.refreshToken).toBe(mockResponse.refresh_token);
      expect(updatedStore.isLoading).toBe(false);
    });

    it("should handle error", async () => {
      const mockError = {
        response: {
          response: {
            data: {
              username: ["Ce champ est obligatoire."],
              password: ["Ce champ est obligatoire."],
            },
          },
        },
      };

      apiFetch.mockRejectedValue(mockError);

      const store = useAuthStore.getState();
      await store.loginUser("", ""); // Username et password manquants

      const updatedStore = useAuthStore.getState();
      console.log(updatedStore);
      expect(updatedStore.error).toEqual(mockError.response.response.data);
      expect(updatedStore.isLoading).toBe(false);
    });
  });
});
