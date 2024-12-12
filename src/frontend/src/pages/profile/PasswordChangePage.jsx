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
  Alert,
} from "@mui/material";
import { CustomAppBar } from "../../components/CustomAppBar";
import { useAuthStore } from "../../stores/authStore";

export const PasswordChangePage = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const { changePassword } = useAuthStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    // Validation basique des mots de passe
    if (newPassword !== confirmPassword) {
      setError({ detail: "Les mots de passe ne correspondent pas." });
      setIsSaving(false);
      return;
    }

    const result = await changePassword(newPassword, currentPassword);

    setIsSaving(false);

    if (result.success) {
      navigate("/login/");
    } else {
      setError(result.error);
    }
  };

  return (
    <CustomAppBar page="Profil - Mot de passe">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Modifier le mot de passe" />
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Mot de passe actuel"
                    type="password"
                    variant="outlined"
                    required
                    error={!!error?.current_password}
                    helperText={
                      error?.current_password ? error.current_password : ""
                    }
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    sx={{ my: 1 }}
                  />
                  <TextField
                    fullWidth
                    label="Nouveau mot de passe"
                    type="password"
                    variant="outlined"
                    required
                    error={!!error?.new_password}
                    helperText={error?.new_password ? error.new_password : ""}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={{ my: 1 }}
                  />
                  <TextField
                    fullWidth
                    label="Confirmer le mot de passe"
                    type="password"
                    variant="outlined"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{ my: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={isSaving}
                    sx={{ my: 1 }}
                  >
                    {isSaving ? "Sauvegarde..." : "Sauvegarder"}
                  </Button>
                </form>
                {error && error.detail ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error.detail}
                  </Alert>
                ) : null}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </CustomAppBar>
  );
};
