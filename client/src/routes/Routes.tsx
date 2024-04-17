import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Home from "../pages/Home/Home.tsx"
import RootLayout from "../pages/Layouts/RootLayout.tsx"
import AuthLayout from "../pages/Layouts/AuthLayout.tsx"
import LoginPage from "../pages/Auth/Login/LoginPage.tsx"
import SignupPage from "../pages/Auth/Signup/SignupPage.tsx"
import OAuthRedirect from "../pages/Auth/components/OAuthRedirect.tsx"
import JoinServer from "../pages/JoinServer/JoinServer.tsx"

const Routes = () => {
  const router = createBrowserRouter([
    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
      ],
    },
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
      path: "join/:inviteLinkId",
      element: <JoinServer />,
    },
  ])

  return <RouterProvider router={router} />
}

export default Routes
