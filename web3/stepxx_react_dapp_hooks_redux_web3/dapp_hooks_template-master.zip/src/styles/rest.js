import { createGlobalStyle } from "styled-components"
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    color: ${props => props.theme.textColorContent};
    font-family: monospace;
  }
`;

export const NavBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.navColor};
  min-height: 50px;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${props => props.theme.textColor};
  list-style: none;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;


export const NavLink = styled.div`
  display: block;
  padding: 1rem;
  transition: 250ms ease background-color;
  &:hover {
    cursor: pointer;
    background-color: skyblue;
  }
`;

export const NavToggle = styled(NavLink)`
  text-decoration: underline;
  position: static;
  color: red;
`;

export const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 0em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export const Container = styled.div`
  text-align: center;
`