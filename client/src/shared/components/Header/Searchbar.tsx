import styled from "styled-components"
import SearchIcon from "../../svg/SearchIcon.tsx"

const SearchbarWrapper = styled.div`
  height: 24px;
  width: 144px;
  margin: 0px 8px;
  background-color: #1e1f22;
  border-radius: 4px;
  font-weight: 400;
  font-size: 13px;
  color: rgb(148, 155, 164);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Searchbar = () => {
  return (
    <SearchbarWrapper>
      <div style={{ padding: 6 }}>Search</div>
      <div
        style={{
          padding: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon size={16} />
      </div>
    </SearchbarWrapper>
  )
}

export default Searchbar
