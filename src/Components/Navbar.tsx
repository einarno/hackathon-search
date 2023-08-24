import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme()
  return (
    <Stack
      gap={2}
      borderRadius={1}
      direction="row"
      boxShadow={2}
      sx={{
        background: "#fff",
        // no blue for links
        "& a": {
          color: "inherit",
          textDecoration: "none",
        },
        "& a:hover": {
          textDecoration: "underline",
          color: "orangered",
        },
      }}
      borderBottom="1px solid #eee"
      p={1}
      pl={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack>
        <Typography noWrap>
          <Link
            to="/"
            search={{ searchOpen: false }}
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
        </Typography>
      </Stack>
      <Stack>
        <Link
          to={"/recipes"}
          search={{ searchOpen: false }}
          activeProps={{
            className: "font-bold",
          }}
        >
          <Typography noWrap>Recipe list</Typography>
        </Link>
      </Stack>
      <Grid container justifyContent="flex-end">
        <Button
          sx={{ bgcolor: theme.palette.grey[200], color: theme.palette.text.primary, borderColor: theme.palette.grey[400], borderRadius: 10 }}
          startIcon={<SearchIcon color="primary" />}
          variant="outlined"
          size="small"
          onClick={() => {
            navigate({ search: (prev) => ({ ...prev, searchOpen: true }) });
          }} >
          Search ⌘K
        </Button>
      </Grid>
    </Stack>
  );
};
