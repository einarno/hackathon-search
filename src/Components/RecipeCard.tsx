import React, { useEffect } from "react";
import { Card, CardContent, Grid, Stack, Typography, useTheme } from "@mui/material";
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

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const foodArray = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1920px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b2/Traditional_fruitcake.jpg",
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Ginger_Bread_House_PC210088.JPG/1024px-Ginger_Bread_House_PC210088.JPG',
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Panettone_-_Nicolettone_2017_-_IMG_7085_%2831752542285%29.jpg/1920px-Panettone_-_Nicolettone_2017_-_IMG_7085_%2831752542285%29.jpg",

]

export const addOpacity = (color: string, opacity: number) => {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
};

export const useGetImageUrl = (recipe: Recipe) => {
    const [image, setImage] = React.useState<string | undefined>();
    useEffect(() => {
        if (!image) {
            unsplash.search.getPhotos({ query: recipe.name, page: 1, perPage: 1 }).then((result) => {
                if (result.errors) {
                    // handle error here
                    setImage(foodArray[getRandomInt(foodArray.length - 1)])
                    console.log('error occurred: ', result.errors[0]);
                } else {
                    // handle success here
                    setImage(result.response?.results[0].urls.small)
                }
            });
        }
    }, []);
    return image;
}
export const RecipeCard: React.FC<Props> = ({ recipe }) => {
    const image = useGetImageUrl(recipe);
    const theme = useTheme()
    const menuLinkStyle = { color: theme.palette.text.primary, textDecoration: "none" };
    const activeMenuLinkStyle = {
        color: theme.palette.text.primary,
        backgroundColor: addOpacity(theme.palette.primary.light, 0.26),
        borderRadius: "8px",
    };
    return (
        <Card variant="elevation">
            <CardContent>
                <Stack>
                    <Link
                        style={menuLinkStyle}
                        activeProps={{ style: activeMenuLinkStyle }}
                        to="/recipes/$recipeId"
                        params={{ recipeId: recipe.id.toString() }}
                        search={{ searchOpen: false, expandIngredients: true, expandMethod: false }}
                    >
                        <Typography variant="h5" color={theme.palette.text.primary}>
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
