import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { configure, mount } from "enzyme";
import { expect } from "chai";
import { UserInfo } from "../UserInfo";
import * as sinon from "sinon";
import "jsdom-global/register";
import * as useResourceModule from "../../customHooks/useResource";
// Configure enzyme to work with React 16
configure({ adapter: new Adapter() });

describe("UserInfo component", () => {
  it("renders loading state initially", () => {
    // Stubbing the useResource hook to return undefined
    const useResourceStub = sinon.stub(useResourceModule, "useResource");
    useResourceStub.returns(undefined);

    const wrapper = mount(<UserInfo />);
    expect(wrapper.text()).to.include("Loading...");

    // Restore the stub after the test
    useResourceStub.restore();
  });

  it("renders user information when provided", () => {
    const user = {
      age: 25,
      hairColor: "Brown",
      hobbies: ["Reading", "Swimming"],
      id: "123",
      name: "John Doe",
    };
    // Stubbing the useResource hook to return the user object
    const useResourceStub = sinon.stub(useResourceModule, "useResource");
    useResourceStub.returns(user);
    const wrapper = mount(<UserInfo user={user} />);

    expect(wrapper.find("h3").at(0).text()).to.equal("John Doe");
    expect(wrapper.find("p").at(0).text()).to.equal("Age: 25 years");
    expect(wrapper.find("p").at(1).text()).to.equal("Hair Color: Brown");
    expect(wrapper.find("h3").at(1).text()).to.equal("Hobbies:");
    expect(wrapper.find("li")).to.have.lengthOf(2);

    // Restore the stub after the test
    useResourceStub.restore();
  });

  it("renders loading state when user is undefined", () => {
    // Stubbing the useResource hook to return undefined
    const useResourceStub = sinon.stub(useResourceModule, "useResource");
    useResourceStub.returns(undefined);

    const wrapper = mount(<UserInfo />);
    expect(wrapper.text()).to.include("Loading...");

    // Restore the stub after the test
    useResourceStub.restore();
  });
});
