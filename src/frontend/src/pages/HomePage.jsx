import { Container, Typography } from "@mui/material";

import { CustomAppBar } from "../components/CustomAppBar";

export const HomePage = () => {
  return (
    <CustomAppBar page="Accueil">
      <Container component="h1" variant="h2">
        <Typography>Bienvenue sur la page d'accueil!</Typography>
      </Container>
    </CustomAppBar>
  );
};
