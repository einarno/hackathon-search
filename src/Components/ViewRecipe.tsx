import { useLoader } from "@tanstack/react-router";
import { recipeRoute } from "../router";
import {
  Checkbox,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState } from "react";

type StepProps = {
  steps: string[];
  initiallyOpen?: boolean;
  title: string;
  dense?: boolean;
};
const Steps = ({ steps, initiallyOpen, title, dense }: StepProps) => {
  const [open, setOpen] = useState(initiallyOpen ?? false);

  return (
    <Stack gap={1}>
      <Stack
        direction="row"
        alignItems="justify"
        justifyContent="space-between"
        onClick={() => setOpen(!open)}
        p={1}
        sx={{
          cursor: "pointer",
          borderLeft: "6px solid #fff",
          ":hover": { borderLeft: "6px solid #eee" },
          userSelect: "none",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            transition: "transform 5s",
          }}
        >
          {title}
        </Typography>
        <ExpandMore
          sx={{
            transform: open ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.2s",
          }}
        />
      </Stack>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          sx={{
            "& .MuiListItem-root": {
              padding: 0,
              ":hover": { background: "#eee", borderRadius: "5px" },
              userSelect: "none",
            },
          }}
          disablePadding
        >
          {steps.map((step, i) => (
            <ListItem key={i}>
              <Stack
                direction="row"
                alignItems="center"
                justifyItems="stretch"
                pl="auto"
                gap={4}
                py={dense ? 0 : 1}
                justifyContent="space-between"
                sx={{ cursor: "pointer" }}
                onClick={(e) => {
                  100;
                  const checkbox = e.currentTarget.querySelector("input");
                  checkbox?.click();
                }}
              >
                <Checkbox />
                <ListItemText primary={step} />
              </Stack>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Stack>
  );
};

export const ViewRecipe = () => {
    console.log("view recipe")
  const { recipe } = useLoader({ from: recipeRoute.id });
  return (
    <Stack
      maxWidth="md"
      component={Paper}
      gap={4}
      elevation={1}
      p={2}
      minHeight="calc(100vh - 200px)"
    >
      <Stack gap={0}>
        <Typography color="orangered" variant="h4">
          {recipe.name}
        </Typography>
        <Typography variant="subtitle1" color="gray">
          By {recipe.author}
        </Typography>
      </Stack>
      <Typography variant="body1"> {recipe.description}</Typography>
      <Divider />
      <Steps
        steps={recipe.ingredients}
        title="Ingredients"
        initiallyOpen
        dense
      />
      <Steps steps={recipe.method} title="Steps" />
    </Stack>
  );
};
