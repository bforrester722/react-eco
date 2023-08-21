import * as Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import * as React from "react";
import { configure, mount } from "enzyme";
import { expect } from "chai";
import { DataSource } from "../DataSource";
import "jsdom-global/register";

// Configure enzyme to work with React 16
configure({ adapter: new Adapter() });

describe("DataSource component", () => {
  it("should render children with state data", async () => {
    const mockGetDataFunc = sinon.fake.resolves({ data: "testData" });

    const wrapper = mount(
      <DataSource getDataFunc={mockGetDataFunc} resourceName="user">
        <div key="child">Child Component</div>
      </DataSource>
    );

    await new Promise((resolve) => setImmediate(resolve));

    wrapper.update();

    const renderedChild = wrapper.find("div").first();
    const childElements = React.Children.toArray(
      renderedChild.props().children as React.ReactNode
    ) as React.ReactElement[];

    // Access the user property from the first child's props
    const actual = childElements[0].props.user;

    expect(renderedChild.text()).to.equal("Child Component");

    expect(actual).to.deep.equal({
      data: "testData",
    });
  });

  it("should render children without state data", () => {
    const wrapper = mount(
      <DataSource getDataFunc={() => {}} resourceName="user">
        <div key="child">Child Component</div>
      </DataSource>
    );

    const renderedChild = wrapper.find("div").first();

    const childElements = React.Children.toArray(
      renderedChild.props().children as React.ReactNode
    ) as React.ReactElement[];

    // Access the user property from the first child's props
    const actual = childElements[0].props.user;

    expect(actual).to.equal(null);
  });
});
