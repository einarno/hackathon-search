import { useHits } from "react-instantsearch";
import { recipesSchema } from "../helpers";
import { RecipeCard } from "./RecipeCard";
import { Grid } from "@mui/material";



export const RecipeList = () => {
    const { hits } = useHits();
    return (
        <Grid container spacing={2}>
            {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                hits.map((hit) => {
                    const recipe = recipesSchema.parse(hit);

                    return <Grid item xs={5}> <RecipeCard key={recipe.id} recipe={recipe} /> </Grid>
                })
            }
        </Grid>
    );
};
