import { Button, Rating, Stack, TextField } from "@mui/material";
import { useState } from "react";

export const HitsForm = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const onChangeRating = (_: unknown, value: number | null) => {
    if (value) setRating(value);
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setDescription(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: store to localstorage
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
            helperText="Description"
            value={description}
            onChange={onChangeDescription}
          />
          <Button type="submit">Add rating</Button>
        </Stack>
      </form>
    </>
  );
};
