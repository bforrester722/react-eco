import * as React from "react";
export interface IProductProps {
  product?: {
    description: string;
    name: string;
    price: string;
    rating: number;
  };
}
export const ProductInfo = ({ product }: IProductProps) => {
  const { name, price, description, rating } = product || {};

  return product ? (
    <>
      <h3>{name}</h3>
      <p>{price}</p>
      <h3>Description:</h3>
      <p>{description}</p>
      <p>Average Rating: {rating}</p>
    </>
  ) : (
    <p>Loading...</p>
  );
};
