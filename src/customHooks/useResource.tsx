import { useState, useEffect } from "react";
import axios from "axios";

// generic custom hook to get a resource
export const useResource = (resourceUrl: string) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(resourceUrl);
      setResource(response.data);
    })();
  }, [resourceUrl]);

  return resource;
};
