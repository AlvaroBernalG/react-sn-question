import React from "react";
import PropTypes from "prop-types";
import Switch, { State } from "react-switchable";
import "react-switchable/dist/main.css";

const SNToggles = ({
  id,
  selected,
  options,
  switchIndex,
  disable,
  changeHandler,
  ...rest
}) => (
  <Switch
    {...rest}
    key={id}
    disable={disable}
    onValueChange={(value, answerIndex) =>
      changeHandler && changeHandler(value, answerIndex, switchIndex)
    }
  >
    {options.map((option, index) => (
      <State active={selected === index} key={option.id} value={option.name}>
        {option.value}
      </State>
    ))}
  </Switch>
);

SNToggles.propTypes = {
  id: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  switchIndex: PropTypes.number.isRequired,
  disable: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  changeHandler: PropTypes.func
};

SNToggles.defaultProps = {
  disable: false,
  changeHandler: undefined
};

export default SNToggles;
