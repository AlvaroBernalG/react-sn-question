import React from 'react'
import PropTypes from 'prop-types'
import Switch, { State } from 'react-switchable'
import 'react-switchable/dist/main.css'

const TogglesSwitch = ({
  id,
  selected,
  options,
  switchIndex,
  disable,
  changeHandler
}) => {
  return (
    <Switch
      key={id}
      disable={disable}
      onValueChange={(value, answerIndex) =>
        changeHandler && changeHandler(value, answerIndex, switchIndex)}
    >
      {options.map((option, index) => (
        <State
          active={selected === index}
          key={option.id}
          value={option.name}
        >
          {option.value}
        </State>
      ))}
    </Switch>
  )
}

TogglesSwitch.propTypes = {
  id: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  switchIndex: PropTypes.number.isRequired,
  disable: PropTypes.bool,
  options:  PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  changeHandler: PropTypes.func
};

TogglesSwitch.defaultProps = {
  disable: false,
  changeHandler: undefined
};

export default TogglesSwitch
