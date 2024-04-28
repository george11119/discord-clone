import styled from "styled-components"
import CloseIcon from "../../../../../shared/svg/CloseIcon.tsx"
import SearchIcon from "../../../../../shared/svg/SearchIcon.tsx"
import { useRef } from "react"

const Wrapper = styled.div`
  display: flex;
  margin: 16px 20px 8px 30px;
  padding: 1px;
  background-color: rgb(30, 31, 34);
  border-radius: 4px;
`

const Searchbar = styled.input`
  height: 30px;
  margin: 1px;
  background-color: rgb(30, 31, 34);
  padding: 0 8px;
  color: rgb(219, 222, 225);
  font-size: 15px;

  &::placeholder {
    color: #8a9199;
  }
`

const IconContainer = styled.div`
  color: #8a9199;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const RelationshipsSearchbar = ({
  searchValue,
  setSearchValue,
}: {
  searchValue: string
  setSearchValue: (x: string) => void
}) => {
  const ref = useRef<HTMLInputElement | null>(null)
  return (
    <Wrapper>
      <Searchbar
        ref={ref}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={"Search"}
      />

      {searchValue === "" ? (
        <IconContainer
          onClick={() => (ref.current ? ref.current?.focus() : null)}
        >
          <SearchIcon size={20} />
        </IconContainer>
      ) : (
        <IconContainer onClick={() => searchValue !== "" && setSearchValue("")}>
          <CloseIcon size={20} fill={"#8a9199"} />
        </IconContainer>
      )}
    </Wrapper>
  )
}

export default RelationshipsSearchbar
