import { Recipe } from "../helpers";
import { Hit } from "meilisearch";
import { Rating, Stack } from "@mui/material";
import { getRecipeReview } from "../localStorage";

type HitProps = {
  recipe: Recipe;
};
export function Hit(props: HitProps) {
  const review = getRecipeReview(props.recipe.id);
  const data = props.recipe;
  return (
    <>
      <Stack direction="row" spacing={2}>
        <h3>{data.name}</h3>
        <p>{data.description}</p>
        <Rating name="read-only" value={review?.rating} readOnly />
      </Stack>
    </>
  );
}
