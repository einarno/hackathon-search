import { Button, Divider, Stack, Typography } from "@mui/material"
import { ReviewList } from "../Components/ReviewList"
import { setRecipeReview } from "../localStorage"

const reviewWords = ["terrible", "bad", "good", "great", "perfect!"]
const reviewers = ["Mathias", "Audun", "Mikael", "Einar", "Bob", "Alice"]

export const Home = () => {
  const generateReview = () => {
    const recipeId = Math.floor(Math.random() * 100)
    const rating = Math.floor(Math.random() * 5 + 1)
    setRecipeReview(recipeId, {
      recipeId: recipeId,
      id: Math.floor(Math.random() * 100),
      userName: reviewers[Math.floor(Math.random() * reviewers.length)],
      rating: rating,
      comment: "This is a " + reviewWords[rating - 1] + " recipe",
    })
  }
  return (
    <Stack spacing={2}>
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
      <Button
        variant="contained"
        onClick={() => generateReview()}>
        Generate review
      </Button>
    </Stack>
  )
}
