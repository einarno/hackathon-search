import { useHits } from "react-instantsearch";
import { recipesSchema } from "../helpers";
import { RecipeCard } from "./RecipeCard";



export const RecipeList = () => {
    const { hits } = useHits();
    return (
        <ol>
            {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                hits.map((hit) => {
                    const recipe = recipesSchema.parse(hit);

                    return <RecipeCard key={recipe.id} recipe={recipe} />
                })
            }
        </ol>
    );
};
