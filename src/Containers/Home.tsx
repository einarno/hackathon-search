import { Button, Divider, Stack, Typography } from "@mui/material"
import { ReviewList } from "../Components/ReviewList"
import { setRecipeReview } from "../localStorage"

export const Home = () => {
  const generateReview = () => {
    const recipeId = Math.floor(Math.random() * 100)
    setRecipeReview(
      {
        id: recipeId,
        name: "The best recipe",
        description: "",
        author: "",
        ingredients: [],
        method: [],
      },
      {
        recipeId: recipeId,
        id: Math.floor(Math.random() * 100),
        userName: "Mathias",
        rating: Math.floor(Math.random() * 5 + 1),
        comment: "This is a great recipe",
      }
    )
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
