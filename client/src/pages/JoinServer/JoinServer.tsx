import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import serverService from "../../api/services/serverService.ts"

const JoinServer = () => {
  const { inviteLinkId } = useParams()
  const token = localStorage.getItem("discord-clone-jwt-token")
  const navigate = useNavigate()

  useEffect(() => {
    serverService.joinServer(token as string, inviteLinkId as string)
    navigate("/channels/@me")
    window.location.reload()
  }, [])

  return <div>Server joined, redirecting...</div>
}

export default JoinServer
