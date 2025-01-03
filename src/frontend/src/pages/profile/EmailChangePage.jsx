import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Alert,
} from "@mui/material";
import { CustomAppBar } from "../../components/CustomAppBar";
import { useAuthStore } from "../../stores/authStore";

export const EmailChangePage = () => {
  const [newEmail, setNewEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const { changeEmail, setActivationEmail } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    const result = await changeEmail(newEmail);
    setIsSaving(false);
    if (result.success) {
      setActivationEmail(newEmail);
      navigate("/auth/email-sent/");
    } else {
      setError(result.error);
    }
  };

  return (
    <CustomAppBar page="Profil - Email">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Modifier l'adresse email" />
              <CardContent>
                {error &&
                  error.detail(
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error.detail}
                    </Alert>
                  )}
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Nouvelle adresse email"
                    variant="outlined"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={isSaving}
                    sx={{ mt: 2 }}
                  >
                    {isSaving ? "Sauvegarde..." : "Sauvegarder"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </CustomAppBar>
  );
};
