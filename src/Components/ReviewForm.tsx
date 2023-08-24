import { Button, Rating, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { getRecipeReview } from "../localStorage";
import { Recipe } from "../helpers";

type ReviewFormProps = {
  recipe: Recipe;
};
export const ReviewForm = (props: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const recipe = props.recipe;
  const review = getRecipeReview(recipe.id);

  useEffect(() => {
    if (review?.rating) setRating(review?.rating);
    if (review?.comment) setComment(review?.comment);
  }, [review, setRating, setComment]);

  const onChangeRating = (_: unknown, value: number | null) => {
    if (value) setRating(value);
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setComment(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack direction="row" spacing={2}>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={onChangeRating}
          />
          <TextField
            helperText="Comment"
            value={comment}
            onChange={onChangeDescription}
          />
          <Button type="submit">Add review</Button>
        </Stack>
      </form>
    </>
  );
};
