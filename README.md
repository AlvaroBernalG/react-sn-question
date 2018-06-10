# [react](https://reactjs.org/)-sn-question

[![react-switchable](https://travis-ci.org/AlvaroBernalG/react-sn-question.svg?branch=master
)](https://badge.fury.io/js/react-sn-question)
[![npm
version](https://badge.fury.io/js/react-sn-question.svg)](https://badge.fury.io/js/react-sn-question)


<p align="center">
  <img src="https://lab.alvarobg.com/react-sw-question/assets/question.gif"/>
  <br><br>
  <br><br>
</p>

## Installation

```bash
npm run install react-sn-question --save
```

## Usage

```js
import React from 'react';
import SNQuestion from 'react-sn-question';
import questionData from './data'

class App extends React.Component {

  state = questionData

  render() {
    const isQuestionCorrect = SNQuestion.isQuestionCorrect(this.state.questions)
    return (
      <SNQuestion
        {...this.state}
        disable={isQuestionCorrect}
        resolutionMessage={ isQuestionCorrect ? 'Awesome!': 'Keep trying!'}
        onChange={(...args) => console.log('You have just toggled a button!!')}
      />
    )
  }
}
```

## API

Prop | Type | Required | Default | Description 
-----|------|----------|---------|-------------
`title` | string | Yes |  | The question title
`resolutionMessage` | string | Yes |  | Message to be displayed at the bottom of the container which represents the status of the question.
`questions` | Array | Yes |  | Contains the questions data
`onChange`| function | No |  undefined | Fires whenever a button is toggled
`disable` | boolean | No | false | Disables the SNQuestion.


```typescript
interface SNQuestion {

  title: string,

  resolutionMessage: string,

  questions: Array<Question>

  onChange?: (value: string, answerIndex: number, questionIndex: number) => void,

  disable?: bool,

}

interface Question {

  id: string,

  correct: number,

  selected: number,

  options: Array<Option>,

}

interface Option {

  name: string,

  value: string

}
```


## Related

[react-switchable](https://github.com/AlvaroBernalG/react-switchable)

## Contributing

All contributions are welcome.

## License

MIT license @[Alvaro Bernal G](https://alvarobg.com).

