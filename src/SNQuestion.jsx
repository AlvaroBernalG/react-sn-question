import React from "react";
import PropTypes from "prop-types";
import "./SNQuestion.scss";
import SNToggles from "./SNToggles";

export default class SNQuestion extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    classStates: PropTypes.arrayOf(PropTypes.string),
    disable: PropTypes.bool,
    title: PropTypes.string,
    resolutionMessage: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        correct: PropTypes.number,
        selected: PropTypes.number,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string
          })
        )
      })
    )
  };

  static defaultProps = {
    onChange: undefined,
    classStates: undefined,
    disable: false,
    title: "",
    questions: [],
    resolutionMessage: ""
  };

  static defaultClassStates = ["failure", "hot", "medium", "almost", "success"];

  static computeScore = questions =>
    questions.reduce(
      (acc, question) => acc + (question.selected === question.correct ? 1 : 0),
      0
    );

  static updateQuestions = (questions, { questionIndex, answerIndex }) => [
    ...questions.slice(0, questionIndex),
    { ...questions[questionIndex], selected: answerIndex },
    ...questions.slice(questionIndex + 1, questions.length)
  ];

  static isQuestionCorrect = questions =>
    questions.every(q => q.selected === q.correct);

  static computeDefaultClasses = (classes, nthQuestions) => [
    classes[0],
    ...classes.slice(1, nthQuestions),
    classes[classes.length - 1]
  ];

  static getDerivedStateFromProps(props, prevState) {
    // if props.classStates is being defined from the parent
    // initialize state with the data.
    if (props.classStates) {
      return {
        classStates: props.classStates
      };
    }
    // if classes has not been defined from parent and the state has not
    // been initialized:
    if (prevState.classStates.length === 0) {
      return {
        classStates: SNQuestion.computeDefaultClasses(
          SNQuestion.defaultClassStates,
          props.questions.length
        )
      };
    }
    return null;
  }

  state = {
    classStates: []
  };

  getMainWrapperClasses(questions) {
    const computedScore = SNQuestion.computeScore(questions);
    const finalClass = this.state.classStates[computedScore];
    const classes = ["snquestion", `snquestion--${finalClass}`].join(" ");
    return classes;
  }

  changeHandler(selectedValue, answerIndex, questionIndex) {
    if (this.props.onChange) {
      this.props.onChange(selectedValue, answerIndex, questionIndex);
    }
  }

  render() {
    const { questions, title, disable, resolutionMessage } = this.props;
    return (
      <div className={this.getMainWrapperClasses(questions)}>
        <h1 className="snquestion__title">{title}</h1>
        {questions.map((question, index) => (
          <SNToggles
            {...question}
            key={question.id}
            disable={disable}
            changeHandler={(value, answerIndex, questionIndex) =>
              this.changeHandler(value, answerIndex, questionIndex)
            }
            switchIndex={index}
          />
        ))}
        <p className="snquestion__result">{resolutionMessage}</p>
      </div>
    );
  }
}
