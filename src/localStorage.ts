import { Review } from "./types";

export const addRecipeReview = (recipeId: number, review: Review) => {
  const existing = localStorage.getItem(recipeId.toString());

  if (existing) {
    const reviews = JSON.parse(existing);
    reviews.push(review);
    localStorage.setItem(recipeId.toString(), JSON.stringify(reviews));
    return;
  }

  localStorage.setItem(recipeId.toString(), JSON.stringify([review]));
};

export const getAllRecipeReviews = () => {
  return Object.entries(localStorage).map(([key, value]) => ({
    recipeId: key,
    reviews: JSON.parse(value),
  }));
};

export const getRecipeReviews = (recipeId: number): Review[] => {
  const reviews = localStorage.getItem(recipeId.toString());
  if (reviews) {
    return JSON.parse(reviews);
  }
  return [];
};
