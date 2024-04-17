import { Navigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import serverService from "../../services/serverService.ts"

const JoinServer = () => {
  const { inviteLinkId } = useParams()
  const token = localStorage.getItem("discord-clone-jwt-token")

  useEffect(() => {
    serverService.joinServer(token as string, inviteLinkId as string)
  }, [])

  return <Navigate to={"/channels/@me"} />
}

export default JoinServer
