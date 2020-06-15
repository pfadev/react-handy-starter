import pages from "./pages";

export default [
    {
        path: "/",
        exact: true,
        component: pages.Home,
    },
    {
        component: pages.NotFound,
    }
];
