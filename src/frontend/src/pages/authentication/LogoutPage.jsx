import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { useAuthStore } from "../../stores/authStore";
import { CONFIG } from "../../config";

export function LogoutPage() {
  const navigate = useNavigate();
  const { logoutUser } = useAuthStore();

  useEffect(() => {
    logoutUser();
    const timer = setTimeout(() => {
      navigate("/");
    }, CONFIG.LOGOUT_REDIRECT_DELAY);

    return () => clearTimeout(timer);
  }, [navigate, logoutUser]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <CircularProgress color="primary" size={48} />
        <Typography variant="h6" color="textPrimary" sx={{ mt: 2 }}>
          Vous vous êtes déconnecté avec succès.
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Vous allez être redirigé vers la page d'accueil dans un instant...
        </Typography>
      </Box>
    </Container>
  );
}
