import React from 'react';
import { shallow } from 'enzyme';
import Timer from '../../../src/frontend/components/TimerMode';
import { setTimeEntryInLocalStorage } from '../../../src/utils/timeEntryUtils';
import timestamps from '../../mock/timestamps';

let isTiming;
let validateTimerModeSubmit;

beforeAll(() => {
  isTiming = false;
  validateTimerModeSubmit = jest.fn();
});

describe('TimerMode', () => {
  it('renders an empty clock when the timer is stopped', () => {
    const wrapper = shallow(<Timer validateTimerModeSubmit={validateTimerModeSubmit} isTiming={isTiming} />);
    const timeElapsed = wrapper.find('h1').text();
    expect(timeElapsed).toBe('00:00:00');
  });
});
