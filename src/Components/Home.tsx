import { Divider, Stack, Typography } from "@mui/material";

export const Home = () => (
  <Stack spacing={2}>
    <Typography variant="h2">Welcome to recipe search </Typography>
    <Typography variant="subtitle1">
      Click on the recipe search link to get started
    </Typography>
    <Divider />
    <Stack>
      <Typography variant="h4">
        Here's a list of the recipes you have given reviews to:
      </Typography>
    </Stack>
  </Stack>
);
