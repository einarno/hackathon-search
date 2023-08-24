import { Recipe } from "../helpers";
import { Rating, Stack } from "@mui/material";
import CommentIcon from "@mui/icons-material/CommentRounded";
import { getRecipeReviews } from "../localStorage";
import { useNavigate } from "@tanstack/react-router";

type HitProps = {
  recipe: Recipe;
  selected?: boolean;
  onClick: (id: number) => void;
};

export function Hit({ recipe, selected }: HitProps) {
  const navigate = useNavigate();
  const reviews = getRecipeReviews(recipe.id);
  const rating = reviews[0]?.rating || 0;
  return (
    <Stack
      onClick={() => navigate({ to: `/recipes/${recipe.id}` })}
      className="search-item"
      borderColor="red"
      border={selected ? "1px solid #0072e5" : "1px solid #fff"}
      p={1}
      borderRadius="10px"
      data-hit-id={recipe.id}
      data-selected={selected ? "1" : "0"}
      sx={{
        transition: "0.1s ease-in-out",
        "background-color": selected ? "#ebf5ff" : "#fff",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Stack direction="column" spacing={2}>
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={
            {
              // highlight if selected
            }
          }
          style={{ colorScheme: "light", alignItems: "center" }}
        >
          <Rating name="read-only" value={rating} readOnly />
          {<CommentIcon />}
        </Stack>
      </Stack>
    </Stack>
  );
}
