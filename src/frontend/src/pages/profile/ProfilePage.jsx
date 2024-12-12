import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Edit, CameraAlt } from "@mui/icons-material";
import { CustomAppBar } from "../../components/CustomAppBar";
import { useAuthStore } from "../../stores/authStore";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, fetchUser, updateUser } = useAuthStore();
  const [formData, setFormData] = useState({ first_name: "", last_name: "" });
  const [isSaving, setIsSaving] = useState(false);

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
      });
    }
  }, [user, fetchUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    const success = await updateUser(user, formData);
    if (success) {
      console.log("Profil mis à jour avec succès");
    }
    setIsSaving(false);
  };

  const handleChangeEmail = () => navigate("/profile/change-email/");
  const handleChangePassword = () => navigate("/profile/change-password/");
  const handleChangeUsername = () => navigate("/profile/change-username/");

  const handleAvatarChange = async () => {
    if (avatarFile) {
      const success = await updateUser(user, { avatar: avatarFile });
      if (success) {
        setAvatarDialogOpen(false);
        await fetchUser(); // Recharger les données utilisateur
        console.log("Avatar mis à jour avec succès");
      } else {
        console.error("Erreur lors de la mise à jour de l'avatar");
      }
    }
  };

  return (
    <CustomAppBar page="Profil">
      <Container sx={{ p: 2 }}>
        <Grid container spacing={3}>
          {/* Profil utilisateur avec avatar, username en email */}
          {user ? (
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Avatar
                        src={user.avatar}
                        sx={{ height: 80, mb: 2, width: 80 }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          bgcolor: "white",
                        }}
                        onClick={() => setAvatarDialogOpen(true)}
                      >
                        <CameraAlt />
                      </IconButton>
                    </Box>

                    <Typography
                      gutterBottom
                      variant="h5"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {user.username}
                      <IconButton onClick={handleChangeUsername} sx={{ ml: 1 }}>
                        <Edit />
                      </IconButton>
                    </Typography>

                    <Typography color="textSecondary" variant="body2">
                      {user.email}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ) : null}

          {/* Formulaire d'édition des informations utilisateur */}
          <Grid item xs={12} md={8}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Card>
                <CardHeader title="Informations personnelles" />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        helperText="Indiquez votre prénom"
                        label="Prénom"
                        name="first_name"
                        onChange={handleChange}
                        required
                        value={formData.first_name}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        helperText="Indiquez votre nom"
                        label="Nom"
                        name="last_name"
                        onChange={handleChange}
                        required
                        value={formData.last_name}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={isSaving}
                  >
                    {isSaving ? "Sauvegarde en cours..." : "Sauvegarder"}
                  </Button>
                </CardActions>
              </Card>
            </form>

            {/* Section de sécurité pour changer l'email ou le mot de passe */}
            <Card sx={{ mt: 4 }}>
              <CardHeader
                title="Sécurité"
                subheader="Gérez votre mot de passe et votre email"
              />
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  {user && user.email ? (
                    <Grid item xs={8}>
                      <TextField
                        label="Adresse email"
                        variant="outlined"
                        value={user.email}
                        disabled
                        fullWidth
                      />
                    </Grid>
                  ) : null}

                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleChangeEmail}
                    >
                      Changer l'email
                    </Button>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleChangePassword}
                  >
                    Changer le mot de passe
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Dialogue de modification d'avatar */}
      <Dialog
        open={avatarDialogOpen}
        onClose={() => setAvatarDialogOpen(false)}
      >
        <DialogTitle>Changer l'avatar</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAvatarDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAvatarChange} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </CustomAppBar>
  );
};
