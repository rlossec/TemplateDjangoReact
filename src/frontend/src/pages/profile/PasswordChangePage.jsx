import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { apiFetch } from "../../utils/apiFetch";

export const PasswordChangePage = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    // Validation basique des mots de passe
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      setIsSaving(false);
      return;
    }

    try {
      await apiFetch("POST", "auth/users/set_password/'", {
        current_password: currentPassword,
        new_password: newPassword,
      });
      navigate("/profile");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe", error);
    }

    setIsSaving(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Changer le mot de passe
      </Typography>
      <Card>
        <CardHeader title="Modifier le mot de passe" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mot de passe actuel"
                  type="password"
                  variant="outlined"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nouveau mot de passe"
                  type="password"
                  variant="outlined"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Confirmer le mot de passe"
                  type="password"
                  variant="outlined"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={isSaving}
            >
              {isSaving ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
