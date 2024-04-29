import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import RootLayout from "../pages/Layouts/RootLayout.tsx"
import AuthLayout from "../pages/Layouts/AuthLayout.tsx"
import LoginPage from "../pages/Auth/Login/LoginPage.tsx"
import SignupPage from "../pages/Auth/Signup/SignupPage.tsx"
import OAuthRedirect from "../pages/Auth/components/OAuthRedirect.tsx"
import JoinServer from "../pages/JoinServer/JoinServer.tsx"
import RootPage from "../pages/Home/RootPage.tsx"

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
        { path: "@me", element: <RootPage /> },
        { path: ":serverId", element: <RootPage /> },
        { path: ":serverId/:channelId", element: <RootPage /> },
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
