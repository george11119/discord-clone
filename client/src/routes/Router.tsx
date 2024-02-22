import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "../App.tsx"
import RootLayout from "../pages/layouts/RootLayout.tsx"
import AuthLayout from "../pages/layouts/AuthLayout.tsx"
import LoginPage from "../pages/Auth/Login/LoginPage.tsx"

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [{ index: true, element: <App /> }],
    },
    {
      element: <AuthLayout />,
      children: [{ path: "login", element: <LoginPage /> }],
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
