import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/Home/Home.tsx"
import RootLayout from "../pages/Layouts/RootLayout.tsx"
import AuthLayout from "../pages/Layouts/AuthLayout.tsx"
import LoginPage from "../pages/Auth/Login/LoginPage.tsx"
import SignupPage from "../pages/Auth/Signup/SignupPage.tsx"
import { AnimatePresence } from "framer-motion"
import OAuthRedirect from "../pages/Auth/components/OAuthRedirect.tsx"

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [{ index: true, element: <Home /> }],
    },
    {
      path: "jwt",
      element: <OAuthRedirect />,
    },
    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
      ],
    },
  ])

  return (
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  )
}

export default Routes
