import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Paper,
  Box,
  Typography,
  Link,
  TextField,
  Button,
  Alert,
  AlertTitle,
  Avatar,
} from "@mui/material";

import { useAuthStore } from "../../stores/authStore";

export function LoginPage() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await loginUser(username, password);
      if (response.success) {
        navigate("/", { replace: true });
      } else {
        setError(response.error || "Identifiants incorrects. D");
      }
    } catch (e) {
      setError(e || "Identifiants incorrects.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: "50vh" }}>
      <Paper
        elevation={0}
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Avatar sx={{ margin: 1, backgroundColor: "#ef5350" }}></Avatar>
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, width: "100%" }}
        >
          <TextField
            label="Nom d'utilisateur"
            name="username"
            type="text"
            fullWidth
            required
            margin="normal"
          />
          {error?.username ? (
            <Alert severity="error">
              <AlertTitle>Erreur</AlertTitle>
              {error.username.map((errMsg, index) => (
                <div key={index}>{errMsg}</div>
              ))}
            </Alert>
          ) : null}

          <TextField
            label="Mot de passe"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
          />
          {error?.password ? (
            <Alert severity="error">
              <AlertTitle>Erreur</AlertTitle>
              {error.password.map((errMsg, index) => (
                <div key={index}>{errMsg}</div>
              ))}
            </Alert>
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link href="/auth/password/reset/" variant="body2" underline="hover">
            Mot de passe oublié ?
          </Link>
          <Link href="/register/" variant="body2" underline="hover">
            S'inscrire
          </Link>
        </Box>

        {error?.detail ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            <AlertTitle>Erreur</AlertTitle>
            {error.detail}
          </Alert>
        ) : null}
      </Paper>
    </Container>
  );
}
