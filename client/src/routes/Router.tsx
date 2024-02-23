import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "../pages/App/App.tsx"
import RootLayout from "../pages/layouts/RootLayout.tsx"
import AuthLayout from "../pages/layouts/AuthLayout.tsx"
import LoginPage from "../pages/Auth/Login/LoginPage.tsx"
import SignupPage from "../pages/Auth/Signup/SignupPage.tsx"

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [{ index: true, element: <App /> }],
    },
    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
