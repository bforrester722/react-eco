import * as React from "react";
import styled from "styled-components";

export interface IUserInfoProps {
  user?: {
    age: number;
    hairColor: string;
    hobbies: string[];
    id: string;
    name: string;
  };
}

const Wrapper = styled.div`
  padding-bottom: 32px;
`;
export const UserInfo = ({ user }: IUserInfoProps) => {
  const { name, age, hairColor, hobbies } = user || {};

  return user ? (
    <Wrapper>
      <h3>{name}</h3>
      <p>Age: {age} years</p>
      <p>Hair Color: {hairColor}</p>
      <h3>Hobbies:</h3>
      <ul>
        {hobbies.map((hobby: string) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </Wrapper>
  ) : (
    <p>Loading...</p>
  );
};
