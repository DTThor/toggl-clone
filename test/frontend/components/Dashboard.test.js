import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../../../src/frontend/components/Dashboard';

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
const timeEntries = [];
const toggleCategoriesList = jest.fn();
const toggleProjectsList = jest.fn();

localStorage.setItem('user', JSON.stringify({ email: 'admin@admin.com' }));

describe('Dashboard Component', () => {
  it('renders without crashing', () => {
    shallow(<Dashboard
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
      timeEntries={timeEntries}
      toggleCategoriesList={toggleCategoriesList}
      toggleProjectsList={toggleProjectsList}
    />);
  });
});
