import React from "react";
import { mount } from "enzyme";
import SNToggles from "../src/SNToggles";
import { mockUpTest } from "./data";

describe("<SNToggles />", () => {
  it("should mount.", () => {
    const question = mockUpTest.questions[0];

    const wrapper = mount(
      <SNToggles
        {...question}
        key={1}
        disable={false}
        changeHandler={(...args) => console.log(...args)}
        switchIndex={1}
      />
    );

    wrapper.unmount();
  });
});
