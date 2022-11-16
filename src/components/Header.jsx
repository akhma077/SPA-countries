import React from "react";
import styled from "styled-components";
import { Container } from "./Container";
import { IoMoon, IoMoonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const HeaderEl = styled.div`
  box-shadow: var(--shadow);
  background-color: var(--colors-ui-base);
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;
const Title = styled(Link).attrs({
  to: "/",
})`
    color: var(--colors-text)
    font-size: var(--fs-sm);
    text-decoration: none;
    font-weight: var(--fw-bold)
`;
const ModeSwitcher = styled.div`
    color: var(--colors-text)
    font-size: var(--fs-sm);
    text-transform: capitalize;
`;

export const Header = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("app-theme") || "light"
  );
  React.useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Title>Где мир?</Title>
          <ModeSwitcher onClick={toggleTheme}>
            <IoMoon />
            <span style={{ marginLeft: ".75rem" }}> Light theme</span>
          </ModeSwitcher>
        </Wrapper>
      </Container>
    </HeaderEl>
  );
};
