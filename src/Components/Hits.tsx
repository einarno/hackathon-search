import { useHits } from "react-instantsearch";
import { recipesSchema } from "../helpers";
import { useNavigate } from "@tanstack/react-router";



export const Hits = () => {
    const { hits, } = useHits()
    const navigate = useNavigate()
    return (
        <ol >
            {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                hits.map((hit) => {
                    const recipe = recipesSchema.parse(hit)
                    return (
                        <li key={recipe.id} onClick={() => {
                            navigate({ to: `/recipes/${recipe.id}` })
                        }}>
                            <h3>{recipe.name}</h3>
                            <h4>{recipe.description}</h4>
                        </li>
                    )
                })
            }
        </ol >
    )
}
