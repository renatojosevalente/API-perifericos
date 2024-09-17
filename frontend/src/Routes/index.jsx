import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Root from "./Root"
import PerifericoPage from "./PerifericoPage";
import CreatePeriferico from "./CreatePeriferico";
import EditPeriferico from "./EditPeriferico";
import "../index.css";

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
    },
    {
      path: "/editPeriferico/:id",
      element: <EditPeriferico />
    }
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;