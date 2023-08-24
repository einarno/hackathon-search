import { Recipe } from "../helpers";
import { Rating, Stack } from "@mui/material";
import CommentIcon from "@mui/icons-material/CommentRounded";
import { getRecipeReview } from "../localStorage";
import { useNavigate } from "@tanstack/react-router";

type HitProps = {
  recipe: Recipe;
};

const style = {
  border: "1px solid grey ",
  "border-radius": "5px",
  padding: "10px",
  "&:hover": {
    cursor: "pointer",
    "background-color": "red",
  },
};
export function Hit(props: HitProps) {
  const navigate = useNavigate();
  const review = getRecipeReview(props.recipe.id);
  const recipe = props.recipe;
  return (
    <>
      <div
        onClick={() => navigate({ to: `/recipes/${recipe.id}` })}
        className="search-item"
        style={style}
      >
        <Stack direction="row" spacing={2}>
          <Stack direction="column" spacing={2}>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            style={{ colorScheme: "light", alignItems: "center" }}
          >
            <Rating name="read-only" value={review?.rating} readOnly />
            {<CommentIcon />}
          </Stack>
        </Stack>
      </div>
    </>
  );
}
