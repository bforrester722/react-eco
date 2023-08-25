import React from "react";
import { withEditableResource } from "./withEditableResource";
import { IProductProps } from "../container/ProductInfo";

interface IProductInfoFormProps {
  product: IProductProps["product"];
  onChangeProduct: ({
    description,
    name,
    price,
    rating,
  }: IProductProps["product"]) => void;
  onSaveProduct: () => void;
  onResetProduct: () => void;
}
export const ProductInfoForm = withEditableResource(
  ({
    product,
    onChangeProduct,
    onSaveProduct,
    onResetProduct,
  }: IProductInfoFormProps) => {
    const { name, description, price, rating } = product || {};

    return product ? (
      <>
        <label>
          Name:
          <input
            value={name}
            onChange={(e) =>
              onChangeProduct({ ...product, name: e.target.value })
            }
          />
        </label>
        <label>
          Description:
          <input
            value={description}
            onChange={(e) =>
              onChangeProduct({ ...product, description: e.target.value })
            }
          />
        </label>
        <label>
          Average Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) =>
              onChangeProduct({ ...product, rating: Number(e.target.value) })
            }
          />
        </label>
        <label>
          Price:
          <input
            value={price}
            onChange={(e) =>
              onChangeProduct({ ...product, price: e.target.value })
            }
          />
        </label>
        <button onClick={onResetProduct}>Reset</button>
        <button onClick={onSaveProduct}>Save Changes</button>
      </>
    ) : (
      <p>Loading...</p>
    );
  },

  "product"
);
