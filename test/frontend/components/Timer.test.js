import React from 'react';
import { shallow } from 'enzyme';
import Timer from '../../../src/frontend/components/Timer';
import { setTimeEntryInLocalStorage } from '../../../src/utils/timeEntryUtils';
import timeEntrySeeds from '../../server/seeds/timeEntries';

// let billable = false;
// let billableClick = jest.fn();
// let categories = [];
// let categoriesOpen = false;
// let setCategories = jest.fn();
// let handleManualSubmit = jest.fn();
// let setProject = jest.fn();
// let handleTimerClick = jest.fn();
// let handleTimerMode = jest.fn();
// let isTiming = true;
// let project = '';
// let inTimerMode = true;
// let toggleCategoriesList = jest.fn();

const billable = false;
const billableClick = jest.fn();
const categories = [];
const categoriesOpen = false;
const categoriesSelected = [];
const handleManualSubmit = jest.fn();
const handleTimerClick = jest.fn();
const handleTimerMode = jest.fn();
const inTimerMode = true;
const isTiming = false;
const projects = [];
const projectSelected = '';
const projectsOpen = false;
const setCategories = jest.fn();
const setProject = jest.fn();
const setTask = jest.fn();
const task = '';
const toggleCategoriesList = jest.fn();
const toggleProjectsList = jest.fn();

describe('Timer Component', () => {
  it('renders without crashing', () => {
    shallow(<Timer
      billable={billable}
      billableClick={billableClick}
      categories={categories}
      categoriesOpen={categoriesOpen}
      categoriesSelected={categoriesSelected}
      handleManualSubmit={handleManualSubmit}
      handleTimerClick={handleTimerClick}
      handleTimerMode={handleTimerMode}
      inTimerMode={inTimerMode}
      isTiming={isTiming}
      projects={projects}
      projectSelected={projectSelected}
      projectsOpen={projectsOpen}
      setCategories={setCategories}
      setProject={setProject}
      setTask={setTask}
      task={task}
      toggleCategoriesList={toggleCategoriesList}
      toggleProjectsList={toggleProjectsList}
    />);
  });
});
