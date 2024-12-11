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
import { useAuthStore } from "../../stores/authStore";
import { apiFetch } from "../../utils/apiFetch";

export const EmailChangePage = () => {
  const [newEmail, setNewEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await apiFetch("PATCH", `auth/users/${user.id}/`, { email: newEmail });
      navigate("/profile");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'email", error);
    }
    setIsSaving(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Changer l'email
      </Typography>
      <Card>
        <CardHeader title="Modifier l'adresse email" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nouvelle adresse email"
                  variant="outlined"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
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
