import styled from "styled-components"

const SvgWrapper = styled.svg``

const Wrapper = styled.div`
  padding-top: 16px;
  height: 24px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
`

const ChannelListCategory = ({ title }: { title: string }) => {
  return (
    <Wrapper>
      <SvgWrapper
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29 5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.42Z"
          className=""
        ></path>
      </SvgWrapper>
      {title.toUpperCase()}
    </Wrapper>
  )
}

export default ChannelListCategory
