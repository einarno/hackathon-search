import { Review } from "./types";

export const addRecipeReview = (review: Review) => {
    console.log("will add", review)
  const exists = !!localStorage.getItem("reviews");
  if (!exists) {
    localStorage.setItem("reviews", JSON.stringify([review]));
    return;
  }
  const data = localStorage.getItem("reviews");
  if (!data) {
    return;
  }
  const existing = JSON.parse(data);
  existing.push(review);
  localStorage.setItem("reviews", JSON.stringify(existing));
};

export function getAllRecipeReviews(): Review[] {
  const raw = localStorage.getItem("reviews");
  if (!raw) {
    return [];
  }
  const reviews = JSON.parse(raw);
  return reviews;
}

export const getRecipeReviews = (recipeId: number): Review[] => {
  const reviews = localStorage.getItem(recipeId.toString());
  if (reviews) {
    return JSON.parse(reviews);
  }
  return [];
};
