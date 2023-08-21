import * as Adapter from "enzyme-adapter-react-16";
import * as sinon from "sinon";
import { expect } from "chai";
import * as React from "react";
import { DataSource } from "../DataSource";
import { configure, mount } from "enzyme";
import "jsdom-global/register";

// Configure enzyme to work with React 16
configure({ adapter: new Adapter() });

describe("DataSource component", () => {
  it("should render children with state data", async () => {
    const mockGetDataFunc = sinon.fake.resolves({ data: "testData" });

    const wrapper = mount(
      <DataSource getDataFunc={mockGetDataFunc} resourceName="user">
        <div>Child Component</div>
      </DataSource>
    );

    await new Promise((resolve) => setImmediate(resolve));

    wrapper.update();

    const renderedChild = wrapper.find("div").first();

    expect(renderedChild.text()).to.equal("Child Component");
    // @ts-ignore
    const actual = renderedChild.props().children[0].props.user;

    expect(actual).to.deep.equal({
      data: "testData",
    });
  });
});
