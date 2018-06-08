import React from "react";
import ReactDOM from "react-dom";
import "./Example.scss";
import Toggles from "../../src/";
import { quiz } from "../src/data";

class App extends React.Component { 

  static reduceQuestion = (questions, {questionIndex, answerIndex}) => [
    ...questions.slice(0, questionIndex),
    { ...questions[questionIndex], selected: answerIndex },
    ...questions.slice(questionIndex + 1, questions.length)
  ]

  static isQuestionCorrect = (questions) => questions.every(q => q.selected === q.correct);

  state = quiz

  getResolutionMessage() {
    return `The answer is ${App.isQuestionCorrect(this.state.questions) ? 'correct': 'incorrect'}`;
  }

  changeHandler(_, answerIndex, questionIndex) {
    const { questions } = this.state
    this.setState({
      questions: App.reduceQuestion(questions, {answerIndex, questionIndex})
    });
  }

  render () {
    // const classes = [ 'failure', 'hot', 'medium', 'almost', 'success'];
    const classes = undefined
    return (
      <div className="demo">
        <Toggles 
          {...this.state}
          disable={App.isQuestionCorrect(this.state.questions)}
          resolutionMessage={this.getResolutionMessage()}
          onChange={(...args) => this.changeHandler(...args)} 
          classStates={classes}
          />
      </div>
    )
  }

}

ReactDOM.render( <App />, document.getElementById("app"));
