import React from "react";
import Main from "./components/Main";
import { Header } from "./components/Header";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Details from "./pages/Detail";
import NoteFound from "./pages/NoteFound";

const App = () => {
  const [countries, setCountries] = React.useState([]);
  return (
    <>
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <HomePage countries={countries} setCountries={setCountries} />
          </Route>
          <Route path="/country/:name" component={Details} />
          <Route component={NoteFound} />
        </Switch>
      </Main>
    </>
  );
};

export default App;
