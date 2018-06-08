import React from 'react'
import PropTypes from 'prop-types'
import './Toggles.scss'
import TogglesSwitch from "./TogglesSwitch";

export default class Toggles extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    classStates: PropTypes.arrayOf(PropTypes.string),
    disable: PropTypes.bool,
    questionTitle: PropTypes.string,
    resolutionMessage: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        correct: PropTypes.number,
        selected: PropTypes.number,
        answers: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string
          })
        )
      })
    )
  }

  static defaultProps = {
    onChange: undefined,
    classStates: undefined,
    disable: false,
    questionTitle: '',
    questions: [],
    resolutionMessage: ''
  }

  static defaultClassStates = ['failure', 'hot', 'medium', 'almost', 'success']

  static computeScore = questions =>
    questions.reduce(
      (acc, question) => acc + (question.selected === question.correct ? 1 : 0),
      0
    )

  static computeDefaultClasses(classes, nthQuestions) {
    return [
      classes[0],
      ...classes.slice(1, nthQuestions),
      classes[classes.length - 1]
    ]
  }

  static getDerivedStateFromProps(props, prevState) {
    // if props.classStates is being defined from the parent
    // initialize state with the data.
    if (props.classStates) {
      return {
        classStates: props.classStates
      }
    }
    // if classes has not been defined from parent and the state has not
    // been initialized:
    if (prevState.classStates.length === 0) {
      return {
        classStates: Toggles.computeDefaultClasses(
          Toggles.defaultClassStates,
          props.questions.length
        )
      }
    }
    return null
  }

  state = {
    classStates: []
  }

  getClasses(questions) {
    const computedScore = Toggles.computeScore(questions)
    const finalClass = this.state.classStates[computedScore]
    const classes = ['toggles', `toggles--${finalClass}`].join(' ')
    return classes;
  }

  changeHandler(selectedValue, answerIndex, questionIndex) {
    if (this.props.onChange) { this.props.onChange(selectedValue, answerIndex, questionIndex) }
  }

  render() {
    const { questions, questionTitle, disable } = this.props
    return (
      <div className={this.getClasses(questions)}>
        <h1 className='title'>
          {questionTitle}
        </h1>
        {questions.map((question, index) => (
          <TogglesSwitch 
            {...question}
            disable={disable}
            options={question.answers}
            changeHandler={(value, answerIndex, questionIndex) => 
              this.changeHandler(value, answerIndex, questionIndex)} 
            switchIndex={index} />
        ))}
        <p className='toggles__result'>
          {this.props.resolutionMessage}
        </p>
      </div>
    )
  }
}
