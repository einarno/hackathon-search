import {
    Outlet,
    ErrorComponent,
    useNavigate,
    RootRoute,
    useSearch,
    Route,
    Router,
} from "@tanstack/react-router"
import { Container, Dialog, DialogContent, DialogTitle, Paper, Stack, Typography } from "@mui/material"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { Home } from "./Containers/Home"
import { useEffect } from "react"
import { Navbar } from "./Components/Navbar"
import { Search } from "./Components/Search";
import { z } from "zod";
import { ViewRecipe } from "./Components/ViewRecipe";
import { getRecipe } from "./helpers";
import { RecipePage } from "./Containers/RecipePage"



const RootComponent = () => {
    const navigate = useNavigate()
    const keyDownHandler = (event: KeyboardEvent) => {
        if ((event.ctrlKey || event.metaKey) && (event.key === "K" || event.key === "k")) {
            event.preventDefault()
            navigate({ search: (prev) => ({ ...prev, searchOpen: true }) });
        }
        if (event.key === "Escape") {
            navigate({ search: (prev) => ({ ...prev, searchOpen: false }) });
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler);
    });
    return (
        <Stack gap={1}>
            <Navbar />
            <Container maxWidth="md" component={Paper} elevation={2} >
                <Outlet />
            </Container>

            {/* Start rendering router matches */}
            <TanStackRouterDevtools position="bottom-right" />
        </Stack>
    )
}

const rootRoute = new RootRoute({
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
            <DialogTitle>Search for recipes</DialogTitle>
            <DialogContent>
                <Search />
            </DialogContent>
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
    const { searchOpen } = useSearch({ from: selectedRecipeRoute.id })
    const navigate = useNavigate()
    return (<>
        <Dialog
            onClose={() => {
                navigate({ search: (prev) => ({ ...prev, searchOpen: false }) });
            }
            }
            fullWidth={true}
            open={searchOpen}
        >
            <DialogTitle>Search for recipes</DialogTitle>
            <DialogContent>
                <Search />
            </DialogContent>
        </Dialog>
        <Outlet />
    </>)
}

export const selectedRecipeRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "recipes",
    validateSearch: z.object({
        searchOpen: z.boolean().default(false),
    }),
    component: RecipesComponent
})

const recipeIndexRouter = new Route({
    getParentRoute: () => selectedRecipeRoute,
    path: "/",
    component: () => (
        <Stack>
            <RecipePage />
        </Stack>
    ),
})

class NotFoundError extends Error { }

export const recipeRoute = new Route({
    getParentRoute: () => selectedRecipeRoute,
    path: "$recipeId",
    key: false,
    loader: async ({ params: { recipeId } }) => {
        const res = getRecipe(recipeId)
        if (res.status === "success") {
            return { recipe: res.recipe }
        }
        throw new NotFoundError("Recipe not found")
    },
    validateSearch: z.object({
        expandIngredients: z.boolean().default(false),
        expandMethod: z.boolean().default(false),
    }),
    errorComponent: ({ error }) => {
        if (error instanceof NotFoundError) {
            return <div>{error.message}</div>
        }

        return <ErrorComponent error={error} />
    },
    component: ViewRecipe,
})

const routeTree = rootRoute.addChildren([
    selectedRecipeRoute.addChildren([recipeRoute, recipeIndexRouter]),
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
