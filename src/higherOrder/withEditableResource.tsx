import * as React from "react";
import { useState, useEffect, FC } from "react";
import axios from "axios";
import { IUserInfoProps } from "../container/UserInfo";
import { IProductProps } from "../container/ProductInfo";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const withEditableResource = (
  Component: FC,
  resourcePath: string,
  resourceName: string
) => {
  return () => {
    const [originalData, setOriginalData] = useState(null);
    const [data, setData] = useState(null);

    // intial get data and sets original data to use on form reset
    useEffect(() => {
      (async () => {
        const response = await axios.get(
          `http://localhost:8080${resourcePath}`
        );
        setOriginalData(response.data);
        setData(response.data);
      })();
    }, []);

    // updates data when form changed
    const onChange = (
      changes: IUserInfoProps["user"] | IProductProps["product"]
    ) => {
      setData({ ...data, ...changes });
    };

    // saves updated data to database
    const onSave = async () => {
      const response = await axios.post(
        `http://localhost:8080${resourcePath}`,
        { [resourceName]: data }
      );
      setOriginalData(response.data);
      setData(response.data);
    };

    // resets form to initial state
    const onReset = () => {
      setData(originalData);
    };

    const resourceProps = {
      [resourceName]: data,
      [`onChange${capitalize(resourceName)}`]: onChange,
      [`onSave${capitalize(resourceName)}`]: onSave,
      [`onReset${capitalize(resourceName)}`]: onReset,
    };

    return <Component {...resourceProps} />;
  };
};
