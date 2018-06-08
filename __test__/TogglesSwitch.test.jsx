import React from "react";
import { mount } from "enzyme";
import TogglesSwitch from "../src/TogglesSwitch";
import { mockUpTest } from "./data";

describe("<Toggles />", () => {
  it("should mount.", () => {
    const question = mockUpTest.questions[0];

    const wrapper = mount(
      <TogglesSwitch
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
