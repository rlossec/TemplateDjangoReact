import { useState } from "react";

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  AlertTitle,
  CircularProgress,
} from "@mui/material";
import { useAuthStore } from "../../stores/authStore";

export const PasswordResetPage = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { requestPasswordReset } = useAuthStore();

  const handleRequestReset = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    if (!email) {
      setError("Veuillez entrer une adresse e-mail valide.");
      setLoading(false);
      return;
    }

    try {
      const response = await requestPasswordReset(email);
      console.log(response);
      setSuccess(response.success);
      setError(response.error);
    } catch (e) {
      console.log("Appel d'API manqué", e);
      setError(e?.response?.data);
    } finally {
      setLoading(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Réinitialisation du mot de passe
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleRequestReset}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Envoyer"}
        </Button>

        {error && error.email ? (
          <Alert severity="error">
            <AlertTitle>Erreur</AlertTitle>
            {error.email.map((errMsg, index) => (
              <div key={index}>{errMsg}</div>
            ))}
          </Alert>
        ) : null}

        {error && error.detail ? (
          <Typography color="error" gutterBottom>
            {error.detail}
          </Typography>
        ) : null}

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Un lien de réinitialisation a été envoyé à votre adresse e-mail.
          </Alert>
        )}
      </Box>
    </Container>
  );
};
