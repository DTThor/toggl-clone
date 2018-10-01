import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {
  render() {
    const { setTask, task } = this.props;
    return (
      <input
        autoFocus
        className="input-reset outline-0 w-90 ba b--none br2 db f5 black-80 ml3 mr3 pa2"
        maxLength={120}
        name="task"
        onChange={setTask}
        placeholder="What have you done?"
        spellCheck={false}
        type="text"
        value={task}
      />
    );
  }
}

Task.propTypes = {
  setTask: PropTypes.func.isRequired,
  task: PropTypes.string.isRequired,
};
