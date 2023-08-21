import React from "react";
import chai, { expect } from "chai";

import * as sinon from "sinon";
import { getServerData } from "../Container";
import axios from "axios";

describe("fetchData", () => {
  it("should fetch server data successfully", async () => {
    const url = "/users/123";
    const mockData = { message: "He" };

    // Create a stub for axios.get to simulate a successful response
    const axiosStub = sinon.stub(axios, "get").resolves({ data: mockData });

    // Call the function and await the returned asynchronous function
    const asyncFunction = getServerData(url);
    const result = await asyncFunction();

    // Assertions
    expect(result).to.deep.equal(mockData);
    sinon.assert.calledOnce(axiosStub);

    // Restore the axios.get stub
    axiosStub.restore();
  });
});
