import { Button, Rating, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export const HitsForm = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (rating === 0) {
      return;
    }
    console.log(rating);
  }, [rating]);

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
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};
