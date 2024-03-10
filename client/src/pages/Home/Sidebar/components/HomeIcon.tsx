import Icon from "./Icon.tsx"
import Logo from "../../../../shared/svg/Logo.tsx"

const HomeIcon = () => {
  return <Icon name="Direct Messages" link="/channels/@me" icon={<Logo />} />
}

export default HomeIcon
