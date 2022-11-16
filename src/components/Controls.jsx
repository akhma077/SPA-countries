import React from "react";
import { Search } from "./Search";
import styled from "styled-components";
import { CustomSelect } from "./CustomSelect";

const Controls = ({ onSearch }) => {
  const [search, setSearch] = React.useState("");
  const [region, setRegion] = React.useState("");

  const options = [
    { value: "Africa", label: "Africa" },
    { value: "America", label: "America" },
    { value: "Europe", label: "Europe" },
    { value: "Asia", label: "Asia" },
    { value: "Oceania", label: "Oceania" },
  ];

  React.useEffect(() => {
    const regionValue = region?.value || "";
    onSearch(search, regionValue);
  }, [search, region]);
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (min-width: 767px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `;
  return (
    <Wrapper>
      <Search search={search} setSearch={setSearch} />
      <CustomSelect
        options={options}
        placeholder="Фильтрация по странам"
        isClearable
        isSearchable={false}
        value={region}
        onChange={setRegion}
      />
    </Wrapper>
  );
};

export default Controls;
