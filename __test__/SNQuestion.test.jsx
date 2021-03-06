import "raf/polyfill";
import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SNQuestion from "../src/";
import { mockUpTest } from "./data";

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = { ...mockUpTest, resolutionMessage: "works" };

const wrapper = props => <SNQuestion {...props} />;

describe("<SNQuestion />", () => {
  it("should correctly mount the component.", () => {
    const enzWrapper = mount(wrapper(defaultProps));
    expect(enzWrapper.find(".snquestion").length).toBe(1);
  });

  it("should match the snapshot.", () => {
    const enzWrapper = mount(wrapper(defaultProps));
    expect(enzWrapper).toMatchSnapshot();
  });

  it("computeScore() should correctly compute the score.", () => {
    expect(SNQuestion.computeScore(mockUpTest.questions)).toBe(2);
  });

  it("updateQuestions() should correctly update questions.", () => {
    let updatedQuestions = SNQuestion.updateQuestions(mockUpTest.questions, {
      questionIndex: 0,
      answerIndex: 0
    });
    expect(updatedQuestions[0].selected).toBe(0);
    updatedQuestions = SNQuestion.updateQuestions(mockUpTest.questions, {
      questionIndex: 1,
      answerIndex: 1
    });
    expect(updatedQuestions[1].selected).toBe(1);
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
