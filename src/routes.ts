import App from "./app";
import pages from "./pages";

import { userAction } from "./redux/actions";

export default [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: pages.Home,
        loadData: () => [userAction.loadAll()],
      },
      {
        component: pages.NotFound,
      },
    ],
  },
];
