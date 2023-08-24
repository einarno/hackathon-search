import { Recipe, Review } from "./types"

export const setRecipeReview = (recipe: Recipe, review: Review) => {
  localStorage.setItem(recipe.id.toString(), JSON.stringify(review))
}

export const getRecipeReviews = () => {
  return Object.entries(localStorage).map(([key, value]) => ({
    recipeId: key,
    review: JSON.parse(value),
  }))
}
