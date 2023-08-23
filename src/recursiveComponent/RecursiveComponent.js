import * as React from "react";
const isObject = (x) => typeof x === "object" && x !== null;

export const RecursiveComponent = ({ data }) => {
  if (!isObject(data)) {
    return data;
  }

  const pairs = Object.entries(data);

  return (
    <>
      {pairs.map(([key, value]) => {
        if (Number.isInteger(Number(key))) {
          return (
            <p>
              -
              <RecursiveComponent data={value} />
            </p>
          );
        }
        return (
          <p>
            {key}:
            <RecursiveComponent data={value} />
          </p>
        );
      })}
    </>
  );
};
