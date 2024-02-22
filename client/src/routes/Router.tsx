import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "../App.tsx"
import RootLayout from "../pages/layouts/RootLayout.tsx"
import AuthLayout from "../pages/layouts/AuthLayout.tsx"
import Login from "../pages/Login.tsx"

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [{ index: true, element: <App /> }],
    },
    {
      element: <AuthLayout />,
      children: [{ path: "login", element: <Login /> }],
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
