import {
    Outlet,
    Link,
    Route,
    ErrorComponent,
    Router,
    RootRoute,
    useLoader
} from "@tanstack/react-router"
import { Stack, Typography } from "@mui/material"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { getEmployee } from "./helpers"
import { Search } from "./Components/Search"


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
                        to={"/employees"}
                        activeProps={{
                            className: "font-bold",
                        }}
                    >
                        Employee Search
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
        return (
            <Stack>
                <Typography>Welcome to employee search find your colleges</Typography>
            </Stack>
        )
    },
})

const employeesRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "employees",
    component: () => {

        return (
            <>
                <Search />
                <Outlet />
            </>)
    },
})


const employeeIndexRouter = new Route({
    getParentRoute: () => employeesRoute,
    path: "/",
    component: () => <Stack>
        <Typography>Search for an employee</Typography>
        <Typography>The selected result will show up here</Typography>
    </Stack>
})

class NotFoundError extends Error { }


const EmployeeComponent = () => {
    const employee = useLoader({ from: employeeRoute.id })
    if (!employee) {
        return null
    }
    return (
        <Stack>
            <Typography>{employee.name}</Typography>
            <Typography>{employee.role}</Typography>
            <Typography>{employee.description}</Typography>
        </Stack>
    )
}
const employeeRoute = new Route({
    getParentRoute: () => employeesRoute,
    path: "$employeeId",
    key: false,
    loader: async ({ params: { employeeId } }) => getEmployee(employeeId),
    errorComponent: ({ error }) => {
        if (error instanceof NotFoundError) {
            return <div>{error.message}</div>
        }

        return <ErrorComponent error={error} />
    },
    component: EmployeeComponent
})


const routeTree = rootRoute.addChildren([
    employeesRoute.addChildren([employeeRoute, employeeIndexRouter]),
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
