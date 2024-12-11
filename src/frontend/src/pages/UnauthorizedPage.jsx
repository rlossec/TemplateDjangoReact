import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

export const UnauthorizedPage = () => (
  <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
    <Typography variant="h2" color="warning.main" gutterBottom>
      403 - Accès non autorisé
    </Typography>
    <Typography variant="body1" color="textSecondary" gutterBottom>
      Vous n'avez pas l'autorisation d'accéder à cette page.
    </Typography>
    <Box mt={4}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ textTransform: "none" }}
      >
        Retourner à la page d'accueil
      </Button>
    </Box>
  </Container>
);
