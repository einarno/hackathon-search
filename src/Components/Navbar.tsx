import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button, Grid, Stack, Typography } from "@mui/material";

export const Navbar = () => {
  const navigate = useNavigate();
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
          variant="outlined"
          size="small"
          onClick={() => {
            navigate({ search: (prev) => ({ ...prev, searchOpen: true }) });
          }}
        >
          Search
        </Button>
      </Grid>
    </Stack>
  );
};
