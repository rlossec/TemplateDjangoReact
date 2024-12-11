import { useState } from "react";

import {
  TextField,
  Button,
  Alert,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

import { useAuthStore } from "../../stores/authStore";

export const ResendActivationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { activationEmail, setActivationEmail, resendActivationEmail } =
    useAuthStore();

  const handleResendEmail = async () => {
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    if (!activationEmail) {
      setError("Veuillez entrer une adresse e-mail valide.");
      setSuccess(false);
      setIsLoading(false);
      return;
    }
    try {
      const response = await resendActivationEmail(activationEmail);
      setError(response.error);
      setSuccess(response.success);
      setIsLoading(false);
    } catch (e) {
      setError(e?.reponse.response?.data || "Une erreur s'est produite.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 10,
      }}
    >
      <Typography variant="h4">Renvoyer l'e-mail d'activation</Typography>
      <TextField
        label="Entrez votre e-mail"
        variant="outlined"
        sx={{ mt: 4, mb: 2 }}
        value={activationEmail}
        onChange={(e) => setActivationEmail(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleResendEmail}
        disabled={isLoading || !activationEmail}
      >
        {isLoading ? (
          <CircularProgress size={24} />
        ) : (
          "Renvoyer l'e-mail d'activation"
        )}
      </Button>

      {/* Affichage des messages de succès ou d'erreur */}
      {error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error.email}
        </Alert>
      ) : null}

      {success ? (
        <Alert severity="success" sx={{ mt: 2 }}>
          L'e-mail d'activation a été renvoyé avec succès. Vérifiez votre boîte
          de réception.
        </Alert>
      ) : null}
    </Box>
  );
};
