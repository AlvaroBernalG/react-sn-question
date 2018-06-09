import React from "react";
import { mount } from "enzyme";
import Toggles from "../src/";
import { mockUpTest } from "./data";

const wrapper = props => <Toggles {...props} />;

describe("<Toggles />", () => {
  it("should correctly mount the component.", () => {
    const enzWrapper = mount(wrapper());
    expect(enzWrapper.find(".toggles").length).toBe(1);
  });

  it("computeScore() should correctly compute the score.", () => {
    expect(Toggles.computeScore(mockUpTest.questions)).toBe(2);
  });

  it("reduceQuestion() should correctly update questions.", () => {
    const updatedQuestions = Toggles.reduceQuestion(mockUpTest.questions, {
      questionIndex: 0,
      answerIndex: 0
    });
    expect(updatedQuestions[0].selected).toBe(0);
  });

  it("isQuestionCorrect() should return true if all answers are correct.", () => {
    const updatedQuestions = Toggles.reduceQuestion(mockUpTest.questions, {
      questionIndex: 0,
      answerIndex: 0
    });
    expect(Toggles.isQuestionCorrect(updatedQuestions)).toBe(true);
  });

  it("should correctly render the class states.", () => {
    const enzwrapper = mount(wrapper());
    enzwrapper.setProps({ classStates: ["one", "two", "three"] });
    expect(enzwrapper.state("classStates").join("")).toBe(
      ["one", "two", "three"].join("")
    );
    expect(enzwrapper.find(".toggles--one").length).toBe(1);
  });

  it("should correctly render the title / footer.", () => {
    const enzwrapper = mount(wrapper());
    enzwrapper.setProps({ resolutionMessage: "works" });
    expect(enzwrapper.find(".toggles__result").text()).toBe("works");
    enzwrapper.setProps({ questionTitle: "works" });
    expect(enzwrapper.find(".toggles__title").text()).toBe("works");
  });
});
