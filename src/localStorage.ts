import { Review } from "./types"

export const setRecipeReview = (recipeId: number, review: Review) => {
  localStorage.setItem(recipeId.toString(), JSON.stringify(review))
}

export const getRecipeReviews = () => {
  return Object.entries(localStorage).map(([key, value]) => ({
    recipeId: key,
    review: JSON.parse(value),
  }))
}
