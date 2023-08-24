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

export function getAllRecipeReviews(): Review[] {
  const reviews: Review[] = [
    {
      id: 1,
      recipeId: 1,
      userName: "bob",
      rating: 5,
      comment: "This is a great recipe!",
      added: new Date(),
    },
  ];
  return reviews;
}

export const getRecipeReviews = (recipeId: number): Review[] => {
  const reviews = localStorage.getItem(recipeId.toString());
  if (reviews) {
    return JSON.parse(reviews);
  }
  return [];
};
