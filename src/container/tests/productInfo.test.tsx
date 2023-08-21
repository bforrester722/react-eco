import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { configure, mount } from "enzyme";
import { expect } from "chai";
import { ProductInfo } from "../ProductInfo";
import "jsdom-global/register";

// Configure enzyme to work with React 16
configure({ adapter: new Adapter() });

describe("ProductInfo component", () => {
  it("should render product information", () => {
    const product = {
      name: "Sample Product",
      price: "$100",
      description: "This is a sample product.",
      rating: 4.5,
    };

    const wrapper = mount(<ProductInfo product={product} />);
    wrapper.update();
    const renderedName = wrapper.find("h3").first().text();
    const renderedPrice = wrapper.find("p").at(0).text();
    const renderedDescription = wrapper.find("p").at(1).text();
    const renderedRating = wrapper.find("p").at(2).text();

    expect(renderedName).to.equal("Sample Product");
    expect(renderedPrice).to.equal("$100");
    expect(renderedDescription).to.equal("This is a sample product.");
    expect(renderedRating).to.equal("Average Rating: 4.5");
  });

  it("should render loading message when no product is provided", () => {
    const wrapper = mount(<ProductInfo />);

    const renderedLoadingMessage = wrapper.find("p").text();

    expect(renderedLoadingMessage).to.equal("Loading...");
  });
});
