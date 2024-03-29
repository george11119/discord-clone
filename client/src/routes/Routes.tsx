import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
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
      element: <Navigate to="/channels/@me" replace={true} />,
    },
    {
      path: "/channels",
      element: <RootLayout />,
      children: [
        { path: "@me", element: <Home /> },
        { path: ":serverId", element: <Home /> },
        { path: ":serverId/:channelId", element: <Home /> },
      ],
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
