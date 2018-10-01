import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserClock } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Task from './Task';
import Billable from './Billable';
import ProjectSelect from './ProjectSelect';
import TimerMode from './TimerMode';
import ManualMode from './ManualMode';
import CategorySelect from './CategorySelect';

class Timer extends Component {
  render() {
    const {
      billable,
      billableClick,
      categoriesOpen,
      categoriesSelected,
      handleManualSubmit,
      handleTimerClick,
      handleTimerMode,
      inTimerMode,
      projectSelected,
      projectsOpen,
      setCategories,
      setProject,
      setTask,
      task,
      duration,
      toggleCategoriesList,
      toggleProjectsList,
    } = this.props;

    return (
      <div className="mw100 bg-white br2 h3 pa3 mv2 ba b--black-10 flex justify-between">
        <Task setTask={setTask} task={task} />

        <div className="flex justify-around items-center mw40 mr2">
          <ProjectSelect
            projectSelected={projectSelected}
            projectsOpen={projectsOpen}
            setProject={setProject}
            toggleProjectsList={toggleProjectsList}
          />

          <CategorySelect
            categoriesOpen={categoriesOpen}
            categoriesSelected={categoriesSelected}
            setCategories={setCategories}
            toggleCategoriesList={toggleCategoriesList}
          />

          <Billable billableClick={billableClick} billable={billable} />

          {inTimerMode ? (
            <TimerMode duration={duration} handleTimerClick={handleTimerClick} />
          ) : (
            <ManualMode handleManualSubmit={handleManualSubmit} />
          )}

          <FontAwesomeIcon
            className="items-center pointer gray grow-large mh2"
            icon={inTimerMode ? faEdit : faUserClock}
            size="1x"
            onClick={handleTimerMode}
          />
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  billable: PropTypes.bool.isRequired,
  billableClick: PropTypes.func.isRequired,
  categoriesOpen: PropTypes.bool.isRequired,
  categoriesSelected: PropTypes.arrayOf(PropTypes.object).isRequired,
  duration: PropTypes.string,
  handleManualSubmit: PropTypes.func.isRequired,
  handleTimerClick: PropTypes.func.isRequired,
  handleTimerMode: PropTypes.func.isRequired,
  inTimerMode: PropTypes.bool.isRequired,
  projectSelected: PropTypes.string.isRequired,
  projectsOpen: PropTypes.bool.isRequired,
  setCategories: PropTypes.func.isRequired,
  setProject: PropTypes.func.isRequired,
  setTask: PropTypes.func.isRequired,
  task: PropTypes.string.isRequired,
  toggleCategoriesList: PropTypes.func.isRequired,
  toggleProjectsList: PropTypes.func.isRequired,
};

Timer.defaultProps = {
  duration: null,
};

export default Timer;
