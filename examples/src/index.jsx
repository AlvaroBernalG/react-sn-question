// /* eslint react/prop-types: 0 */
import React from "react";
import ReactDOM from "react-dom";
import SNQuestion from "../../src/index";
import "../../src/SNQuestion.scss";
import "./Example.scss";

import data from './data';
const log = console.log;


import { quiz } from "./data";

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
     const classes = undefined;
     return (
       <div className="demo">
         <SNQuestion
           {...this.state}
           disable={SNQuestion.isQuestionCorrect(this.state.questions)}
           resolutionMessage={this.getResolutionMessage()}
           onChange={(...args) => log('changing', ...args) || this.changeHandler(...args)}
           classStates={classes}
         />
       </div>
     );
   }
 }

 const rootElement = document.getElementById("app");
 ReactDOM.render(<App />, rootElement);


