import React from 'react';
import { shallow } from 'enzyme';
import TimerHistoryItem from '../../../src/frontend/components/TimerHistoryItem';
import { displayDate } from '../../../src/utils/timeUtils.js';
import timeEntrySeeds from '../../server/seeds/timeEntries';

const {
  billable, categories, task, project, timeEnd, timeStart,
} = timeEntrySeeds[0];

describe('TimerHistoryItem Component', () => {
  it('renders without crashing', () => {
    shallow(<TimerHistoryItem
      billable={billable}
      categories={categories}
      task={task}
      project={project}
      timeEnd={timeEnd}
      timeStart={timeStart}
    />);
  });

  it('renders the correct date', () => {
    const wrapper = shallow(<TimerHistoryItem
      billable={billable}
      categories={categories}
      project={project}
      task={task}
      timeEnd={timeEnd}
      timeStart={timeStart}
    />);

    const datetext = wrapper
      .children()
      .at(0)
      .text();

    expect(displayDate(datetext)).toEqual('07/04/2018');
  });

  it('renders the correct start time and end time', () => {
    const wrapper = shallow(<TimerHistoryItem
      billable={billable}
      categories={categories}
      project={project}
      task={task}
      timeEnd={timeEnd}
      timeStart={timeStart}
    />);

    const time = wrapper
      .children()
      .at(5)
      .text();

    expect(time).toEqual('01:00 pm - 04:15 pm');
  });

  it('renders the correct elapsed time', () => {
    const wrapper = shallow(<TimerHistoryItem
      billable={billable}
      categories={categories}
      task={task}
      project={project}
      timeEnd={timeEnd}
      timeStart={timeStart}
    />);

    const time = wrapper
      .children()
      .at(6)
      .text();
    expect(time).toEqual('03:15:00');
  });
});
