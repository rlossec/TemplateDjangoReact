import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useAuthStore } from "../../stores/authStore";

export const PasswordResetConfirmPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { confirmResetPassword } = useAuthStore();

  const handlePasswordReset = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    if (!password || !passwordConfirm) {
      setError("Veuillez remplir les deux champs.");
      setSuccess(false);
      setLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas.");
      setSuccess(false);
      setLoading(false);
      return;
    }

    try {
      const response = await confirmResetPassword(uid, token, password);
      setSuccess(response.success);
      setError(response.error);
      if (response.success) {
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (e) {
      setSuccess(false);
      setError(e?.response.response?.data || "Une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Réinitialisation du mot de passe
        </Typography>

        {error && error.detail ? (
          <Typography color="error" gutterBottom>
            {error.detail}
          </Typography>
        ) : null}

        {error && error.new_password ? (
          <Alert severity="error">
            <AlertTitle>Erreur</AlertTitle>
            {error.new_password.map((errMsg, index) => (
              <div key={index}>{errMsg}</div>
            ))}
          </Alert>
        ) : null}

        {error && error.token ? (
          <Alert severity="error">
            <AlertTitle>Erreur</AlertTitle>
            {error.token.map((errMsg, index) => (
              <div key={index}>{errMsg}</div>
            ))}
          </Alert>
        ) : null}

        <TextField
          label="Nouveau mot de passe"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirmer le nouveau mot de passe"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handlePasswordReset}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Réinitialiser"}
        </Button>

        {success ? (
          <Typography color="primary" gutterBottom>
            Le mot de passe a été réinitialisé avec succès ! Vous allez être
            redirigé.
          </Typography>
        ) : null}
      </Box>
    </Container>
  );
};
