import React from "react";
import axios from "axios";
import Controls from "../components/Controls";
import { ALL_COUNTRIES } from "../config";
import List from "../components/List";
import Card from "../components/Card";
import { useHistory } from "react-router-dom";
const HomePage = ({ countries, setCountries }) => {
  const [filteredCountries, setFilteredCountries] = React.useState(countries);
  const { push } = useHistory();

  const handleSearch = (search, region) => {
    let data = [...countries];

    if (region) data = data.filter((c) => c.region.includes(region));

    if (search)
      data = data.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      );
    setFilteredCountries(data);
  };

  React.useEffect(() => {
    if (!countries.length) {
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
    }
  }, []);
  React.useEffect(() => {
    handleSearch();
  }, [countries]);

  console.log(countries);
  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filteredCountries.map((c) => {
          const countriInfo = {
            img: c.flags.png,
            name: c.name.common,
            info: [
              {
                title: "Population",
                description: c.population.toLocaleString(),
              },
              {
                title: "Region",
                description: c.region,
              },
              {
                title: "Capital",
                description: c.capital,
              },
            ],
          };
          return (
            <Card
              key={c.name}
              onClick={() => push(`/country/${c.name.common}`)}
              {...countriInfo}
            />
          );
        })}
      </List>
    </>
  );
};

export default HomePage;
