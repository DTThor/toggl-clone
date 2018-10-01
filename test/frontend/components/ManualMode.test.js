import React from 'react';
import { shallow } from 'enzyme';
import ManualMode from '../../../src/frontend/components/ManualMode';

let validateManualModeSubmit;
let manualSubmitCallback;

beforeAll(() => {
  manualSubmitCallback = jest.fn();
  validateManualModeSubmit = jest.fn();
});

describe('Manual Mode', () => {
  it('should render without crashing', () => {
    shallow(<ManualMode validateManualModeSubmit={validateManualModeSubmit} />);
  });

  it('should not call validateManualModeSubmit if inputs are empty', () => {
    const wrapper = shallow(<ManualMode validateManualModeSubmit={validateManualModeSubmit} />);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(manualSubmitCallback).not.toHaveBeenCalled();
  });
});
