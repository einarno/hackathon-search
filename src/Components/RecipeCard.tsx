import React, { useEffect } from "react";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Recipe } from "../helpers";
import { createApi } from 'unsplash-js';
import { Link } from "@tanstack/react-router";


const unsplash = createApi({
    accessKey: '',
    fetch: fetch
});

type Props = {
    recipe: Recipe;
};

export const RecipeCard: React.FC<Props> = ({ recipe }) => {
    const [image, setImage] = React.useState<string>("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1920px-Good_Food_Display_-_NCI_Visuals_Online.jpg");
    useEffect(() => {
        if (!image) {
            unsplash.search.getPhotos({ query: recipe.name, page: 1, perPage: 1 }).then((result) => {
                if (result.errors) {
                    // handle error here
                    console.log('error occurred: ', result.errors[0]);
                } else {
                    // handle success here
                    setImage(result.response?.results[0].urls.small)
                }
            });
        }
    }, []);


    return (
        <Card variant="elevation">
            <CardContent>
                <Stack>
                    <Link to="/recipes/$recipeId" params={{ recipeId: recipe.id.toString() }} search={{ searchOpen: false, expandIngredients: true, expandMethod: false }}>
                        <Typography variant="h5">
                            {recipe.name}
                        </Typography>
                    </Link>
                    <img
                        object-fit="cover"
                        width="300px"
                        height="230px"
                        src={image}
                        alt="new"
                    />
                    <Stack direction="row">
                        <Grid justifyContent="flex-end">
                            <Typography variant="caption">By {recipe.author}</Typography>
                        </Grid>
                    </Stack>

                    <Typography variant="subtitle1">
                        {recipe.description}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};
