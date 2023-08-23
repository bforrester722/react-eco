import * as React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { withEditableResource } from "../withEditableResource";
import "jsdom-global/register";

interface IMock {
  user: {
    name: string;
  };
  onResetUser: () => {};
  onSaveUser: () => {};
}
// Import the component to be wrapped
const MockComponent = ({ user }: IMock) => (
  <div>{user ? user.name : "No user data"}</div>
);

describe("withEditableResource HOC", () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  it("fetches data and passes props to wrapped component", async () => {
    const responseData = {
      id: "123",
      name: "John Doe",
    };
    mock.onGet("http://localhost:8080/resourcePath").reply(200, responseData);

    const WrappedComponent = withEditableResource(
      MockComponent,
      "/resourcePath",
      "user"
    );

    const wrapper = mount(<WrappedComponent />);
    await new Promise(setImmediate); // Wait for useEffect to complete

    expect(wrapper.text()).to.include("John Doe");
  });

  it("updates data on change and resets form", async () => {
    const responseData = {
      id: "123",
      name: "John Doe",
    };
    mock.onGet("http://localhost:8080/resourcePath").reply(200, responseData);

    const WrappedComponent = withEditableResource(
      MockComponent,
      "/resourcePath",
      "user"
    );

    const wrapper = mount(<WrappedComponent />);
    await new Promise(setImmediate); // Wait for useEffect to complete
    // Simulate change and save
    // @ts-ignore
    wrapper.find("MockComponent").props().onChangeUser({ name: "Jane Doe" });

    wrapper.update(); // Update the component after state change
    expect(wrapper.text()).to.include("Jane Doe");

    // // Simulate reset
    // @ts-ignore
    wrapper.find("MockComponent").props().onResetUser();
    wrapper.update(); // Update the component after state change
    expect(wrapper.text()).to.include("John Doe");
  });
});
