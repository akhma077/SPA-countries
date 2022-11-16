import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { searchByCountry } from "../config";
import { Button } from "../components/Button";
import Info from "../components/Info";

const Details = ({ match }) => {
  const { name } = useParams();
  const { push, goBack } = useHistory();
  const [country, setCountry] = React.useState(null);

  console.log(country);

  React.useEffect(() => {
    axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
  }, [name]);

  return (
    <>
      <Button onClick={goBack}>
        <IoArrowBack /> Back
      </Button>

      {country && <Info push={push} {...country} />}
    </>
  );
};

export default Details;
