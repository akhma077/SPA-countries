import React from "react";
import styled from "styled-components";
import axios from "axios";
import { filterByCode } from "../config";

const Wrapper = styled.section`
  width: 100%;
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;
const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const InfoTitle = styled.h1`
  margin: 0;
  font-weigth: var(--fw-normal);
`;
const ListGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const ListItem = styled.li`
  line-height: 1.8;

  & > b {
    font-weigth: var(--fw-normal);
  }
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;

  & > b {
    font-weigth: var(--fw-normal);
  }
  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;
const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;
const Tag = styled.span`
    padding: 0 1rem;
    background-color var(--colors-ui-base);
    box-shadow: var(--shadow);
    line-height: 1.5;
    cursor: pointer
`;
const Info = (props) => {
  const {
    name,
    flags,
    capital,
    population,
    region,
    subregion,
    idd,
    currencies = [],
    languages = [],
    borders = [],
    push,
  } = props;
  const [neighbours, setNeighbours] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(filterByCode(borders))
      .then(({ data }) => setNeighbours(data.map((d) => d.name.common)));
  }, [borders]);
  return (
    <Wrapper>
      <InfoImage src={flags.png} />
      <div>
        <InfoTitle>{name.common}</InfoTitle>
        <ListGroup>
          <List>
            <ListItem>
              <b> Native Name: {name.official}</b>
            </ListItem>
            <ListItem>
              <b> Population: {population}</b>
            </ListItem>
            <ListItem>
              <b> Region: {region}</b>
            </ListItem>
            <ListItem>
              <b>Sub Region: {subregion}</b>
            </ListItem>
            <ListItem>
              <b> Capital: {capital}</b>
            </ListItem>
            <ListItem>
              <b> Telephone code: {idd.root}</b>
            </ListItem>
          </List>

          <List>
            <ListItem>
              <b>Currency: </b>
              {Object.keys(currencies).map((c) => (
                <span> {c}</span>
              ))}
            </ListItem>
            <ListItem>
              <b>Languanges: </b>
              {Object.keys(languages).map((l) => (
                <span>{l} </span>
              ))}
            </ListItem>
          </List>
        </ListGroup>
        <Meta>
          <b>Border countries: </b>
          {!borders.length ? (
            <span>Thete is no border countries</span>
          ) : (
            <TagGroup>
              {neighbours.map((b) => (
                <Tag onClick={() => push(`/country/${b}`)}>{b}</Tag>
              ))}
            </TagGroup>
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};

export default Info;
