import { useHits } from "react-instantsearch";
import { recipesSchema } from "../helpers";
import { RecipeCard } from "./RecipeCard";
import { Grid, Typography } from "@mui/material";



export const RecipeList = () => {
    const { hits } = useHits();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h2">Featured recipes </Typography>
            </Grid>
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
