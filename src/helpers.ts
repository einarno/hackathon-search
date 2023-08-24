import { z } from "zod"
import recipesJSON from "../scripts/recipes.json" assert { type: "json" }

const recipesSchema = z.object({
    id: z.number(),
    Name: z.string(),
    Description: z.string(),
    Author: z.string(),
    Ingredients: z.string().array(),
    Method: z.string().array(),
}).transform(data => ({
    id: data.id,
    name: data.Name,
    description: data.Description,
    author: data.Author,
    ingredients: data.Ingredients,
    method: data.Method,
}
))
export type Recipes = {
    id: number
    name: string
    description: string
    author: string
    ingredients: string[]
    method: string[]
}



export const getRecipe = (id: string) => {
    const recipes = recipesSchema.array().parse(recipesJSON)
    return recipes.find(recipe => recipe.id === Number(id))
}

export const getRecipes = (ids: string[]) => {
    const recipes = recipesSchema.array().parse(recipesJSON)
    const recipeMap = recipes.reduce<Record<string, Recipes>>((acc, employee) => {
        acc[employee.id] = employee
        return acc
    }, {})

    return ids.map(id => recipeMap[id])
}
