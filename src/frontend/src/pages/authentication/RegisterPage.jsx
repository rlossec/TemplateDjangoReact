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
  Avatar,
} from "@mui/material";

import { useAuthStore } from "../../stores/authStore";

export function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { registerUser, setActivationEmail } = useAuthStore();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidEmail(formData.email)) {
      setError({ email: "L'adresse email n'est pas valide." });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.re_password) {
      setError({
        re_password: "Les mots de passe ne correspondent pas.",
        password: "Les mots de passe ne correspondent pas.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(formData);
      setError(response.error);
      if (response.success) {
        setActivationEmail(formData.email);
        navigate("/auth/email-sent/");
      }
    } catch (e) {
      console.log("Erreur d'inscription D", e);
    } finally {
      setLoading(false);
    }
  };

  const renderErrorMessages = (excludedFields = []) => {
    if (!error) return null;

    if (typeof error === "string") {
      return <Alert severity="error">{error}</Alert>;
    }

    return Object.keys(error)
      .filter((key) => !excludedFields.includes(key))
      .map((key) => (
        <Alert severity="error" key={key}>
          {Array.isArray(error[key]) ? error[key].join(" ") : error[key]}
        </Alert>
      ));
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: "50vh" }}>
      <Paper
        elevation={0}
        sx={{
          marginTop: 2,
          padding: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ margin: 1, backgroundColor: "#ef5350" }}></Avatar>
        <Typography component="h1" variant="h5">
          S'inscrire
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="username"
            label="Nom d'utilisateur"
            name="username"
            value={formData.username}
            autoComplete="username"
            onChange={handleChange}
            error={!!error?.username}
            helperText={error?.username ? error.username : ""}
            variant="outlined"
            required
            fullWidth
            autoFocus
            margin="normal"
          />

          <TextField
            id="email"
            label="Adresse email"
            name="email"
            value={formData.email}
            autoComplete="email"
            onChange={handleChange}
            error={!!error?.email}
            helperText={error?.email ? error.email : ""}
            variant="outlined"
            required
            fullWidth
            margin="normal"
          />

          <TextField
            id="password"
            label="Mot de passe"
            name="password"
            value={formData.password}
            type="password"
            autoComplete="Enter your password"
            onChange={handleChange}
            error={!!error?.password}
            helperText={error?.password ? error.password : ""}
            variant="outlined"
            required
            fullWidth
            margin="normal"
          />

          <TextField
            id="re_password"
            label="Confirmer le mot de passe"
            name="re_password"
            value={formData.re_password}
            type="password"
            autoComplete="Confirm your password"
            onChange={handleChange}
            error={!!error?.re_password}
            helperText={error?.re_password ? error.re_password : ""}
            variant="outlined"
            required
            fullWidth
            margin="normal"
          />

          {/* Affichage des erreurs générales */}
          {renderErrorMessages([
            "username",
            "email",
            "password",
            "re_password",
          ])}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            disabled={loading}
          >
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </Button>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          ></Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <Link
              href="/auth/resend-activation/"
              variant="body2"
              underline="hover"
            >
              Valider son email
            </Link>
          </Box>
          <Box>
            <Link href="/login/" variant="body2" underline="hover">
              Se connecter
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
