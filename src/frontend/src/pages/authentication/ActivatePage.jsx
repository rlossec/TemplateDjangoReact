import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  TextField,
} from "@mui/material";

import { useAuthStore } from "../../stores/authStore";

export const ActivatePage = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams(); // Récupération des paramètres de l'URL
  const { activateUser, resendActivationEmail } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const activateAccount = async () => {
      setLoading(true);
      setError(null);

      const result = await activateUser(uid, token);
      console.log(result);
      if (result.success) {
        setVerified(true);
        setError(null);
      } else {
        setVerified(false);
        setError(result.error);
      }
      setLoading(false);
    };

    activateAccount();
  }, [uid, token, activateUser]);

  const handleResendActivationEmail = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    const result = await resendActivationEmail(email);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }
    setLoading(false);
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
      <Typography variant="h4">Vérification de votre compte</Typography>

      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : verified ? (
        <>
          <Alert severity="success" sx={{ mt: 4 }}>
            Votre compte a été vérifié avec succès.
          </Alert>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
            sx={{ mt: 4 }}
          >
            Aller à la page de connexion
          </Button>
        </>
      ) : (
        <>
          <Alert severity="error" sx={{ mt: 4 }}>
            Erreur d'activation ou compte déjà actif.
          </Alert>

          <TextField
            label="Entrez votre e-mail"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mt: 4 }}
          />

          {/* Bouton pour renvoyer l'e-mail d'activation */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleResendActivationEmail}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              "Renvoyer l'e-mail d'activation"
            )}
          </Button>

          {/* Afficher le message de succès du renvoi */}
          {success && (
            <Alert severity="success" sx={{ mt: 4 }}>
              L'e-mail d'activation a été renvoyé avec succès. Vérifiez votre
              boîte de réception.
            </Alert>
          )}
        </>
      )}
    </Box>
  );
};
