import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { configure, mount } from "enzyme";
import { expect } from "chai";
import { UserInfo } from "../UserInfo";
import "jsdom-global/register";

// Configure enzyme to work with React 16
configure({ adapter: new Adapter() });

describe("UserInfo component", () => {
  it("should render user information", () => {
    const user = {
      id: "1",
      name: "John Doe",
      age: 30,
      hairColor: "Brown",
      hobbies: ["Reading", "Swimming"],
    };

    const wrapper = mount(<UserInfo user={user} />);

    const renderedName = wrapper.find("h3").first().text();
    const renderedAge = wrapper.find("p").at(0).text();
    const renderedHairColor = wrapper.find("p").at(1).text();
    const renderedHobbies = wrapper.find("li").map((li) => li.text());

    expect(renderedName).to.equal("John Doe");
    expect(renderedAge).to.equal("Age: 30 years");
    expect(renderedHairColor).to.equal("Hair Color: Brown");
    expect(renderedHobbies).to.deep.equal(["Reading", "Swimming"]);
  });

  it("should render loading message when no user is provided", () => {
    const wrapper = mount(<UserInfo />);

    const renderedLoadingMessage = wrapper.find("p").text();

    expect(renderedLoadingMessage).to.equal("Loading...");
  });
});
