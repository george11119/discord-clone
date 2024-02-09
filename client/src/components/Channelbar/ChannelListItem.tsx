import styled from "styled-components"

const ChannelListItemWrapper = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 34px;
  bottom: -1px;
  top: -1px;
  border-radius: 4px;
  margin: 1px 0;
  font-size: 16px;
`
const SvgWrapper = styled.svg`
  margin-right: 6px;
`
const ChannelListItem = ({ name }: { name: string }) => {
  return (
    <ChannelListItemWrapper>
      <SvgWrapper
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"
          clipRule="evenodd"
        ></path>
      </SvgWrapper>
      {name}
    </ChannelListItemWrapper>
  )
}

export default ChannelListItem
