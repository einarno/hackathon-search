import {
    Outlet,
    Link,
    Route,
    ErrorComponent,
    Router,
    RootRoute,
    useLoader,
    useSearch,
    useNavigate,
} from "@tanstack/react-router"
import { Button, Dialog, Grid, Stack, Typography } from "@mui/material"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { getRecipe } from "./helpers"
import { Search } from "./Components/Search"
import { z } from "zod"
import { Home } from "./Containers/Home"




const RootComponent = () => {
    const navigate = useNavigate()
    return (
        <>
            <Stack direction="row" gap={1}>
                <Stack>
                    <Typography noWrap>
                        <Link
                            to="/"
                            activeProps={{
                                className: "font-bold",
                            }}
                            activeOptions={{ exact: true }}
                        >
                            Home
                        </Link>
                    </Typography>
                </Stack>
                <Stack>
                    <Link
                        to={"/recipes"}
                        search={{ searchOpen: false }}
                        activeProps={{
                            className: "font-bold",
                        }}
                    >
                        <Typography noWrap>
                            Recipe list
                        </Typography>
                    </Link>
                </Stack>
                <Grid container justifyContent="flex-end" >
                    <Button variant="outlined" size="small" onClick={() => {
                        navigate({ search: (prev) => ({ ...prev, searchOpen: true }) });
                    }} >
                        Search
                    </Button>
                </Grid>
            </Stack >
            <hr />
            <Outlet />

            {/* Start rendering router matches */}
            <TanStackRouterDevtools position="bottom-right" />
        </>
    )
}

const rootRoute = new RootRoute({
    validateSearch: z.object({
        searchOpen: z.boolean().default(false),
    }),
    component: RootComponent
},)


const IndexComponent = () => {
    const { searchOpen } = useSearch({ from: indexRoute.id })
    const navigate = useNavigate()
    return (<>  <Home />
        <Dialog
            fullWidth={true}
            open={searchOpen}
            onClose={() => {
                navigate({ search: (prev) => ({ ...prev, searchOpen: false }) });
            }
            }
        >
            <Search />
        </Dialog>
    </>)
}
const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    validateSearch: z.object({
        searchOpen: z.boolean().default(false),
    }),
    component: IndexComponent
})


const RecipesComponent = () => {
    const { searchOpen } = useSearch({ from: recipeRoute.id })
    const navigate = useNavigate()
    return (<>
        <Home />
        <Dialog
            onClose={() => {
                navigate({ search: (prev) => ({ ...prev, searchOpen: false }) });
            }
            }
            fullWidth={true}
            open={searchOpen}
        >
            <Search />
        </Dialog>
    </>)
}

const recipesRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "recipes",
    validateSearch: z.object({
        searchOpen: z.boolean().default(false),
    }),
    component: RecipesComponent
})

const recipeIndexRouter = new Route({
    getParentRoute: () => recipesRoute,
    path: "/",
    component: () => (
        <Stack>
            <Typography>Search for an recipe</Typography>
            <Typography>The selected result will show up here</Typography>
        </Stack>
    ),
})

class NotFoundError extends Error { }

const RecipeComponent = () => {
    const { recipe } = useLoader({ from: recipeRoute.id })
    if (!recipe) {
        return null
    }
    return (
        <Stack>
            <Typography>{recipe.name}</Typography>
            <Typography>{recipe.author}</Typography>
            <Typography>{recipe.description}</Typography>
        </Stack>
    )
}
const recipeRoute = new Route({
    getParentRoute: () => recipesRoute,
    path: "$recipeId",
    key: false,
    loader: async ({ params: { recipeId } }) => {
        const res = getRecipe(recipeId)
        if (res.status === "success") {
            return { recipe: res.recipe }
        }
        throw new NotFoundError("Recipe not found")
    },
    errorComponent: ({ error }) => {
        if (error instanceof NotFoundError) {
            return <div>{error.message}</div>
        }

        return <ErrorComponent error={error} />
    },
    component: RecipeComponent,
})

const routeTree = rootRoute.addChildren([
    recipesRoute.addChildren([recipeRoute, recipeIndexRouter]),
    indexRoute,
])

// Set up a Router instance
export const router = new Router({
    routeTree,
    defaultPreload: "intent",
})

// Register things for typesafety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}
