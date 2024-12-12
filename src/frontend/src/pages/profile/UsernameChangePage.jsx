import { useRef, useState } from "react";
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

export const UsernameChangePage = () => {
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const { changeUsername } = useAuthStore();

  const newUsernameRef = useRef();
  const currentPasswordRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    const newUsername = newUsernameRef.current.value;
    const currentPassword = currentPasswordRef.current.value;

    console.log(newUsername, currentPassword);
    const result = await changeUsername(newUsername, currentPassword);
    setIsSaving(false);
    if (result.success) {
      navigate("/login/");
    } else {
      setError(result.error);
    }
  };

  return (
    <CustomAppBar page="Profil - Nom d'utilisateur">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Modifier le nom d'utilisateur" />
              <CardContent>
                {error && error.detail ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error.detail}
                  </Alert>
                ) : null}

                <form onSubmit={handleSubmit}>
                  <TextField
                    inputRef={newUsernameRef}
                    fullWidth
                    label="Nouveau nom d'utilisateur"
                    variant="outlined"
                    required
                  />
                  <TextField
                    inputRef={currentPasswordRef}
                    fullWidth
                    label="Mot de passe actuel"
                    type="password"
                    variant="outlined"
                    required
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
