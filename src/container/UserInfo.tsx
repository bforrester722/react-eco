import React, { useState } from "react";
interface IProps {
  user?: {
    age: number;
    hairColor: string;
    hobbies: string[];
    id: string;
    name: string;
  };
}
export const UserInfo = ({ user }: IProps) => {
  const { name, age, hairColor, hobbies } = user || {};

  return user ? (
    <>
      <h3>{name}</h3>
      <p>Age: {age} years</p>
      <p>Hair Color: {hairColor}</p>
      <h3>Hobbies:</h3>
      <ul>
        {hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </>
  ) : (
    <p>Loading...</p>
  );
};
