export type Recipe = {
  id: number
  name: string
  description: string
  author: string
  ingredients: string[]
  method: string[]
}

export type Review = {
  recipeId: number
  userName: string
  comment: string
  rating: number
}
