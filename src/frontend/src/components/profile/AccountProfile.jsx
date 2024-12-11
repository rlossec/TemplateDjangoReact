import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";

export const AccountProfile = () => {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user?.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            {user?.username}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
