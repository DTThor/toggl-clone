import React from 'react';
import { shallow } from 'enzyme';
import ProjectSelect from '../../../src/frontend/components/ProjectSelect';

const projects = [];
const projectSelected = '';
const projectsOpen = false;
const toggleProjectsList = jest.fn();
const setProject = jest.fn();

describe('ProjectSelect Component', () => {
  it('renders without crashing', () => {
    shallow(<ProjectSelect
      projects={projects}
      projectSelected={projectSelected}
      projectsOpen={projectsOpen}
      toggleProjectsList={toggleProjectsList}
      setProject={setProject}
    />);
  });
});
