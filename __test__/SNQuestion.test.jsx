import React from "react";
import { mount } from "enzyme";
import SNQuestion from "../src/";
import { mockUpTest } from "./data";

const defaultProps = { ...mockUpTest,  resolutionMessage: "works" } 

const wrapper = props => <SNQuestion {...props} />;

describe("<SNQuestion />", () => {
  it("should correctly mount the component.", () => {
    const enzWrapper = mount(wrapper(defaultProps));
    expect(enzWrapper.find(".snquestion").length).toBe(1);
  });

  it("computeScore() should correctly compute the score.", () => {
    expect(SNQuestion.computeScore(mockUpTest.questions)).toBe(2);
  });

  it("updateQuestions() should correctly update questions.", () => {
    const updatedQuestions = SNQuestion.updateQuestions(mockUpTest.questions, {
      questionIndex: 0,
      answerIndex: 0
    });
    expect(updatedQuestions[0].selected).toBe(0);
  });

  it("isQuestionCorrect() should return true if all answers are correct.", () => {
    const updatedQuestions = SNQuestion.updateQuestions(mockUpTest.questions, {
      questionIndex: 0,
      answerIndex: 0
    });
    expect(SNQuestion.isQuestionCorrect(updatedQuestions)).toBe(true);
  });

  it("should correctly render the class states.", () => {
    const enzwrapper = mount(wrapper(defaultProps));
    enzwrapper.setProps({ classStates: ["one", "two", "three"] });
    expect(enzwrapper.state("classStates").join("")).toBe(
      ["one", "two", "three"].join("")
    );
    
    expect(enzwrapper.find(".snquestion--three").length).toBe(1);
  });

  it("should correctly render the title / footer.", () => {
    const enzwrapper = mount(wrapper(defaultProps));
    enzwrapper.setProps({ resolutionMessage: "works" });
    expect(enzwrapper.find(".snquestion__result").text()).toBe("works");
    enzwrapper.setProps({ title: "works" });
    expect(enzwrapper.find(".snquestion__title").text()).toBe("works");
  });
});
