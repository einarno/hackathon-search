import { Grid, Stack, Typography } from "@mui/material";
import { Recipe } from "../helpers";

type Props = {
    recipe: Recipe;
};

export const RecipeCard: React.FC<Props> = ({ recipe }) => {
    return (
        <Stack>
            <Typography variant="h5">{recipe.name}</Typography>
            <Stack direction="row">
                <Grid justifyContent="flex-end">
                    <Typography variant="caption">By {recipe.author}</Typography>

                </Grid>
            </Stack>
            <Typography variant="subtitle1">
                {recipe.description}
            </Typography>
        </Stack>
    );
};
