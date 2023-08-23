import * as React from "react";
import { useResource } from "../customHooks/useResource";
export interface IUserInfoProps {
  user?: {
    age: number;
    hairColor: string;
    hobbies: string[];
    id: string;
    name: string;
  };
}
export const UserInfo = ({ userId }: { userId?: string }) => {
  const user: IUserInfoProps["user"] = useResource(
    `http://localhost:8080/users/${userId}`
  );
  const { name, age, hairColor, hobbies } = user || {};

  return user ? (
    <>
      <h3>{name}</h3>
      <p>Age: {age} years</p>
      <p>Hair Color: {hairColor}</p>
      <h3>Hobbies:</h3>
      <ul>
        {hobbies.map((hobby: string) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </>
  ) : (
    <p>Loading...</p>
  );
};
