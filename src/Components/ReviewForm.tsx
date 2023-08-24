import { IconButton, Rating, Stack, TextField } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useState } from "react";
import { addRecipeReview } from "../localStorage";
import { Review } from "../types";
import { Reviewers } from "../Containers/Home";

type Props = {
  recipeId: number;
};
export const ReviewForm = (props: Props) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const recipeId = props.recipeId;
  const onChangeRating = (_: unknown, value: number | null) => {
    if (value) setRating(value);
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setComment(event.target.value);
  };

  const onSubmit = () => {
    addRecipeReview(recipeId, {
      recipeId: recipeId,
      id: Math.floor(Math.random() * 100),
      userName: Reviewers[Math.floor(Math.random() * Reviewers.length)],
      rating: rating,
      comment: comment,
    } as Review);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack direction="row" spacing={2}>
          <TextField
            helperText="Comment"
            value={comment}
            onChange={onChangeDescription}
          />
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={onChangeRating}
          />
          <IconButton type="submit" aria-label="add review" color="primary">
            <AddCommentIcon />
          </IconButton>
        </Stack>
      </form>
    </>
  );
};
