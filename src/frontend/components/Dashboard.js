import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Timer from './Timer';
import TimerHistory from './TimerHistory';
import { isAdmin } from './AuthRoute';

export default class Dashboard extends Component {
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
      <div>
        {isAdmin() && (
          <Link className="fw9 tracked-tight mooveItNavy" to="/admin">
            <p className="mr3 tr">Admin Portal</p>
          </Link>
        )}
        <Timer
          billable={billable}
          billableClick={billableClick}
          categoriesOpen={categoriesOpen}
          categoriesSelected={categoriesSelected}
          duration={duration}
          handleManualSubmit={handleManualSubmit}
          handleTimerClick={handleTimerClick}
          handleTimerMode={handleTimerMode}
          inTimerMode={inTimerMode}
          projectSelected={projectSelected}
          projectsOpen={projectsOpen}
          setCategories={setCategories}
          setProject={setProject}
          setTask={setTask}
          task={task}
          toggleCategoriesList={toggleCategoriesList}
          toggleProjectsList={toggleProjectsList}
        />
        <TimerHistory />
      </div>
    );
  }
}

Dashboard.propTypes = {
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

Dashboard.defaultProps = {
  duration: null,
};
