import { useState, useEffect } from "react";
import * as React from "react";
import styled from "styled-components";

interface IDataSourceProps {
  children: JSX.Element | JSX.Element[];
  resourceName: string;
  getDataFunc: () => void;
}

const ItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  margin-bottom: 32px;
  padding: 16px 32px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;

export const DataSource = ({
  getDataFunc = () => {},
  resourceName,
  children,
}: IDataSourceProps) => {
  const [state, setState] = useState(null);

  // uses passed in function to get and set data passed to children
  useEffect(() => {
    (async () => {
      const data = await getDataFunc();
      setState(data);
    })();
  }, [getDataFunc]);
  // console.log("React.Children", React.Children);
  return (
    <ItemContainer>
      {React.Children.map(children, (child) => {
        // console.log("child", child);
        return React.isValidElement(child)
          ? React.cloneElement(child, { [resourceName]: state })
          : child;
      })}
    </ItemContainer>
  );
};
