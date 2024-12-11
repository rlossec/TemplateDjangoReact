import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

export function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h3" color="error" gutterBottom>
        404 - Page introuvable
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        La page que vous recherchez n'existe pas ou a été déplacée.
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ textTransform: "none" }}
        >
          Retourner à l'accueil
        </Button>
      </Box>
    </Container>
  );
}
