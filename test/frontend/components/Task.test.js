import React from 'react';
import { shallow } from 'enzyme';
import Task from '../../../src/frontend/components/Task';

const setTask = jest.fn();
const task = ''

describe('Task Component', () => {
  it('renders without crashing', () => {
    shallow(<Task
      task={task}
      setTask={setTask}
    />);
  });
});
