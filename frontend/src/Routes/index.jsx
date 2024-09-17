import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Root from "./Root"
import PerifericoPage from "./PerifericoPage";
import CreatePeriferico from "./CreatePeriferico";
import "../index.css"

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />
    },
    {
      path: "/periferico/:id",
      element: <PerifericoPage />
    },
    {
      path: "/createPeriferico",
      element: <CreatePeriferico />
    }
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;