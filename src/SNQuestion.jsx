import React from "react";
import PropTypes from "prop-types";
import Switch, { State } from "react-switchable";
import "react-switchable/dist/main.css";
import "./SNQuestion.scss";

export default class SNQuestion extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    resolutionMessage: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        correct: PropTypes.number.isRequired,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
          })
        ),
        selected: PropTypes.number
      })
    ).isRequired,
    onChange: PropTypes.func,
    classStates: PropTypes.arrayOf(PropTypes.string), // eslint-disable-line react/no-unused-prop-types
    disable: PropTypes.bool
  };

  static defaultProps = {
    onChange: undefined,
    classStates: undefined,
    disable: false
  };

  static defaultClassStates = ["failure", "hot", "medium", "almost", "success"];

  static computeScore = questions =>
    questions.reduce(
      (acc, question) => acc + (question.selected === question.correct ? 1 : 0),
      0
    );

  static updateQuestions = (questions, { questionIndex, answerIndex }) =>
    questions.map(
      (question, index) =>
        questionIndex === index
          ? { ...question, selected: answerIndex }
          : question
    );

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
    const classes = ["snquestion", `snquestion--${finalClass}`]
      .join(" ")
      .trim();
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
        {questions.map((question, answerIndex) => (
          <Switch
            key={question.id}
            disable={disable}
            onValueChange={(value, questionIndex) =>
              this.changeHandler(value, questionIndex, answerIndex)
            }
          >
            {question.options.map((option, optionIndex) => (
              <State
                active={question.selected === optionIndex}
                key={option.id}
                value={option.name}
              >
                {option.value}
              </State>
            ))}
          </Switch>
        ))}
        <p className="snquestion__result">{resolutionMessage}</p>
      </div>
    );
  }
}
