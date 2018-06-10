import React from "react";
import ReactDOM from "react-dom";
import "./Example.scss";
import SNQuestion from "../../src/";
import { quiz } from "../src/data";

class App extends React.Component {
  state = quiz;

  getResolutionMessage() {
    return `The answer is ${
      SNQuestion.isQuestionCorrect(this.state.questions)
        ? "correct"
        : "incorrect"
    }`;
  }

  changeHandler(_, answerIndex, questionIndex) {
    const { questions } = this.state;
    this.setState({
      questions: SNQuestion.updateQuestions(questions, {
        answerIndex,
        questionIndex
      })
    });
  }

  render() {
    // const classes = [ 'failure', 'hot', 'medium', 'almost', 'success'];
    const classes = undefined;
    return (
      <div className="demo">
        <SNQuestion
          {...this.state}
          disable={SNQuestion.isQuestionCorrect(this.state.questions)}
          resolutionMessage={this.getResolutionMessage()}
          onChange={(...args) => this.changeHandler(...args)}
          classStates={classes}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
