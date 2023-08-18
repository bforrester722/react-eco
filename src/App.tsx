import React from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import TodoList from "./todos/TodoList";

import { Container } from "./container/Container";

const AppContainer = styled.div`
  margin: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  color: #222222;
`;

const App = () => (
  <AppContainer>
    <TodoList />
    <Container />
  </AppContainer>
);
export default hot(module)(App);
