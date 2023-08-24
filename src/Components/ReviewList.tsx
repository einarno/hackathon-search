import { List, ListItem, ListItemText } from "@mui/material"
import { getRecipeReviews } from "../localStorage"

export const ReviewList = () => {
  const recipeReviews = getRecipeReviews()
  return (
    <List>
      {recipeReviews.map(({ recipeId, review }) => (
        <ListItem key={review.id}>
          <ListItemText primary={recipeId} />
          <ListItemText primary={review.name} />
          <ListItemText primary={review.rating} />
          <ListItemText primary={review.comment} />
        </ListItem>
      ))}
    </List>
  )
}
