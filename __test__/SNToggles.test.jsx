import React from "react";
import { mount } from "enzyme";
import SNToggles from "../src/";
import { mockUpTest } from "./data";

describe("<SNToggles />", () => {
  it("should mount.", () => {
    const question = mockUpTest.questions[0];

    const wrapper = mount(
      <SNToggles
        {...question}
        key={1}
        options={question.answers}
        disable={false}
        changeHandler={(...args) => console.log(...args)}
        switchIndex={1}
      />
    );

    wrapper.unmount();
  });
});
