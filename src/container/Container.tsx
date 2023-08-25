import React from "react";
import { DataSource } from "./DataSource";
import axios from "axios";
import { ProductInfo } from "./ProductInfo";
import styled from "styled-components";
import { UserInfoForm } from "../higherOrder/UserInfoForm";

const Max = styled.div`
  max-width: 800px;
  margin: 48px auto;
  background-color: aliceblue;
  padding: 32px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  margin: 32px 16px;
  padding: 16px 32px;
  position: relative;
  box-shadow: 0 4px 8px grey;
  width: 100%;
`;

export const getServerData = (url: string) => async () => {
  const response = await axios.get(`http://localhost:8080${url}`);
  return response.data;
};

export const Container = () => {
  const users = ["123", "234", "345"];
  const products = ["1234", "2345", "3456"];
  return (
    <Max>
      <h1 style={{ textAlign: "center" }}>Container Section </h1>
      <h3>Users:</h3>
      <Wrapper>
        {users.map((user) => (
          <ItemContainer key={user}>
            <UserInfoForm resourcePath={`/users/${user}`} />
          </ItemContainer>
        ))}
      </Wrapper>
      <h3>Products:</h3>
      {products.map((product) => (
        <DataSource
          getDataFunc={getServerData(`/products/${product}`)}
          key={product}
          resourceName="product"
        >
          <ProductInfo />
        </DataSource>
      ))}
    </Max>
  );
};
