import { Recipe } from "../helpers";
import { Rating } from "@mui/material";
import { getRecipeReview } from "../localStorage";
import { useNavigate } from "@tanstack/react-router";

type HitProps = {
  recipe: Recipe;
};
export function Hit(props: HitProps) {
  const navigate = useNavigate();
  const review = getRecipeReview(props.recipe.id);
  const recipe = props.recipe;
  return (
    <>
      <div onClick={() => navigate({ to: `/recipes/${recipe.id}` })}>
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
        <Rating name="read-only" value={review?.rating} readOnly />
      </div>
    </>
  );
}
