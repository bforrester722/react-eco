import React, { useState } from "react";
import styled from "styled-components";

export const partiallyApply = (Component, partialProps) => {
  return (props) => {
    return <Component {...partialProps} {...props} />;
  };
};

const BaseButton = styled.button`
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  display: inline-block;
`;

export const Button = ({ size, color, text, ...props }) => {
  return (
    <BaseButton
      style={{
        padding: size === "large" ? "32px" : "8px",
        fontSize: size === "large" ? "32px" : "16px",
        backgroundColor: color,
      }}
      {...props}
    >
      {text}
    </BaseButton>
  );
};

export const CompletedButton = partiallyApply(Button, { color: "#22ee22" });
export const RemoveButton = partiallyApply(Button, { color: "#ee2222" });
