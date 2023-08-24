import { useLoader, useNavigate, useSearch } from "@tanstack/react-router";
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
import { ReviewForm } from "./ReviewForm";
import { useGetImageUrl } from "./RecipeCard";

type StepProps = {
  steps: string[];
  initiallyOpen?: boolean;
  title: string;
  dense?: boolean;
  toggle: () => void;
};
const Steps = ({ steps, initiallyOpen, title, toggle, dense }: StepProps) => {
  return (
    <Stack gap={1}>
      <Stack
        direction="row"
        alignItems="justify"
        justifyContent="space-between"
        onClick={toggle}
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
            transform: initiallyOpen ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.2s",
          }}
        />
      </Stack>
      <Collapse in={initiallyOpen} timeout="auto" unmountOnExit>
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
            <ListItem
              key={i}
              onClick={(e) => {
                100;
                const checkbox = e.currentTarget.querySelector("input");
                checkbox?.click();
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyItems="stretch"
                pl="auto"
                gap={4}
                py={dense ? 0 : 1}
                justifyContent="space-between"
                sx={{ cursor: "pointer" }}
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
  const { expandMethod, expandIngredients } = useSearch({
    from: recipeRoute.id,
  });
  const navigate = useNavigate();

  const toggleMethod = () =>
    navigate({ search: (prev) => ({ ...prev, expandMethod: !expandMethod }) });
  const toggleIngredients = () =>
    navigate({
      search: (prev) => ({ ...prev, expandIngredients: !expandIngredients }),
    });
  const { recipe } = useLoader({ from: recipeRoute.id });

  const imageUrl = useGetImageUrl(recipe)
  return (
    <Stack maxWidth="md" gap={4} p={2} minHeight="calc(100vh - 200px)">
      <Stack gap={0}>
        <Typography color="orangered" variant="h4">
          {recipe.name}
        </Typography>
        <img
          object-fit="cover"
          width="500px"
          height="400px"
          src={imageUrl}
          alt="new"
        />
        <Typography variant="subtitle1" color="gray">
          By {recipe.author}
        </Typography>
      </Stack>
      <Typography variant="body1"> {recipe.description}</Typography>
      <Divider />
      <Steps
        toggle={toggleIngredients}
        steps={recipe.ingredients}
        title="Ingredients"
        initiallyOpen={expandIngredients}
        dense
      />
      <Steps
        steps={recipe.method}
        title="Steps"
        initiallyOpen={expandMethod}
        toggle={toggleMethod}
      />
      <Divider />
      <ReviewForm recipeId={recipe.id} />
    </Stack>
  );
};
