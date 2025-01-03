import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

import { useAuthStore } from "../../stores/authStore";

export const EmailSentPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { activationEmail, resendActivationEmail } = useAuthStore();

  const handleResendEmail = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await resendActivationEmail(activationEmail);
      setSuccess(response.success);
      setError(response.error);
    } catch (e) {
      setSuccess(false);
      setError(e?.response.response?.data || "Une erreur s'est produite. D");
    } finally {
      setLoading(false);
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
      <Typography variant="h5" sx={{ mb: 2 }}>
        Vérifiez votre boîte de réception
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Un e-mail d'activation a été envoyé à{" "}
        {activationEmail || "votre adresse e-mail"}. Cliquez sur le lien dans
        l'e-mail pour activer votre compte.
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleResendEmail}
          disabled={loading}
        >
          Renvoyer l'e-mail d'activation
        </Button>
      )}

      {error && error.email ? (
        <Alert severity="error" sx={{ mt: 4 }}>
          {error.email}
        </Alert>
      ) : null}

      {success ? (
        <Alert severity="success" sx={{ mt: 4 }}>
          L'e-mail d'activation a été renvoyé avec succès.
        </Alert>
      ) : null}

      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/login")}
        sx={{ mt: 2 }}
      >
        Aller à la page de connexion
      </Button>
    </Box>
  );
};
