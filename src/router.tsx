import {
  Outlet,
  Link,
  Route,
  ErrorComponent,
  Router,
  RootRoute,
  useLoader,
} from "@tanstack/react-router"
import { Stack, Typography } from "@mui/material"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { getRecipe } from "./helpers"
import { Search } from "./Components/Search"
import { Home } from "./Components/Home"

const rootRoute = new RootRoute({
  component: () => {
    return (
      <>
        <Stack direction="row" gap={1}>
          <Link
            to="/"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to={"/recipes"}
            activeProps={{
              className: "font-bold",
            }}
          >
            recipe Search
          </Link>
        </Stack>
        <hr />
        <Outlet />
        {/* Start rendering router matches */}
        <TanStackRouterDevtools position="bottom-right" />
      </>
    )
  },
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    return <Home />
  },
})

const recipesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "recipes",
  component: () => {
    return (
      <>
        <Search />
        <Outlet />
      </>
    )
  },
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

class NotFoundError extends Error {}

const RecipeComponent = () => {
  const recipe = useLoader({ from: recipeRoute.id })
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
  loader: async ({ params: { recipeId } }) => getRecipe(recipeId),
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
