import Icon from "./Icon.tsx"
import CreateServer from "../../../../shared/svg/CreateServer.tsx"

const CreateServerIcon = () => {
  return (
    <Icon
      name="Add a Server"
      link={"#"}
      icon={<CreateServer />}
      hoverColor="#23a559"
      onClick={() => console.log("asdf")}
    />
  )
}

export default CreateServerIcon
