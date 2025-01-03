import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from './queens/routes';
import AppLayout from "./components/app/layout";

export const App = () => {

  const router = createBrowserRouter([
    {
      path: "queens",
      children: routes,
      element: <AppLayout routes={routes} />,
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
