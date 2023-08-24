import { z } from "zod"
import recipesJSON from "../scripts/recipes.json" assert { type: "json" }
const recipesJSONWithId = recipesJSON.map((recipe, id) => ({ ...recipe, id }))

export const recipesSchema = z.object({
    id: z.number(),
    Name: z.string(),
    Description: z.string().nullable(),
    Author: z.string(),
    Ingredients: z.string().array(),
    Method: z.string().array(),
    url: z.string(),
}).transform(data => ({
    id: data.id,
    name: data.Name,
    description: data.Description,
    author: data.Author,
    ingredients: data.Ingredients,
    method: data.Method,
    url: data.url,
}
))
export type Recipe = {
    id: number
    name: string
    url: string
    description: string
    author: string
    ingredients: string[]
    method: string[]
}

type ReturnRecipes = {
    status: "success"
    recipes: Recipe[]
} |
{
    status: "error"
    errorCode: "not_found" | "invalid_request"
}

type ReturnRecipe = {
    status: "success"
    recipe: Recipe
} |
{
    status: "error"
    errorCode: "not_found" | "parse_error"
}

export const getRecipe = (id: string): ReturnRecipe => {
    const chosen = recipesJSONWithId.find(recipe => recipe.id === Number(id))
    if (!chosen) {
        return { status: "error", errorCode: "not_found", }
    }
    const res = recipesSchema.safeParse(chosen)
    if (res.success === false) {
        return { status: "error", errorCode: "parse_error" }
    }
    const parsed = res.data
    return {
        status: "success",
        recipe: parsed,
    }
}

export const getRecipes = (ids: string[]) => {
    const recipes = recipesSchema.array().parse(recipesJSON)
    const recipeMap = recipes.reduce<Record<string, Recipe>>((acc, employee) => {
        acc[employee.id] = employee
        return acc
    }, {})

    return ids.map(id => recipeMap[id])
}

