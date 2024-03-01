import { Navigate, useLocation } from "react-router-dom"

const OAuthRedirect = () => {
  const { search } = useLocation()

  const token = new URLSearchParams(search).get("token")

  if (token) localStorage.setItem("discord-clone-jwt-token", token)

  return <Navigate to="/" replace={true} />
}

export default OAuthRedirect
