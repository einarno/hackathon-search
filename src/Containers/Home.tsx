import { Button, Divider, Stack, Typography } from "@mui/material";
import { ReviewList } from "../Components/ReviewList";
import { addRecipeReview } from "../localStorage";
import { Review } from "../types";

const reviewWords = ["terrible", "bad", "good", "great", "perfect!"];
export const Reviewers = [
  "Mathias",
  "Audun",
  "Mikael",
  "Einar",
  "Bob",
  "Alice",
];

export const Home = () => {
  const generateReview = () => {
    const recipeId = Math.floor(Math.random() * 100);
    const rating = Math.floor(Math.random() * 5 + 1);
    addRecipeReview(recipeId, {
      recipeId: recipeId,
      id: Math.floor(Math.random() * 100),
      userName: Reviewers[Math.floor(Math.random() * Reviewers.length)],
      rating: rating,
      comment: "This is a " + reviewWords[rating - 1] + " recipe",
    } as Review);
  };
  return (
    <Stack p={2} gap={2} pb={8}>
      <Typography variant="h2">Welcome to recipe search </Typography>
      <Typography variant="subtitle1">
        Click on the recipe search link to get started
      </Typography>
      <Divider />
      <Stack>
        <Typography variant="h4">
          Here's a list of the recipes you have given reviews to:
        </Typography>
        <ReviewList />
      </Stack>
      <Button variant="contained" onClick={() => generateReview()}>
        Generate review
      </Button>
    </Stack>
  );
};
