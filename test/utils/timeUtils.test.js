import {
  createManualTimestamp,
  createManualTimestampWithDate,
  displayDate,
  displayStartAndEndTimes,
  displayTimeElapsed,
  displayTimeInput,
} from '../../src/utils/timeUtils';

describe('time utils', () => {
  it('manual time entry formats user input', () => {
    expect(displayTimeInput('1:15p')).toBe('01:15 pm');
    expect(displayTimeInput('1a')).toBe('01:00 am');
    expect(displayTimeInput('1300')).toBe('01:00 pm');
    expect(displayTimeInput('1')).toBe('01:00 am');
    expect(displayTimeInput('asdfasdf')).toBe('Invalid date');
  });

  it('creates a correctly formatted manual timestamp', () => {
    expect(createManualTimestamp('01:00 am').slice(10)).toBe('T06:00:00.000Z');
    expect(createManualTimestamp('01:00 pm').slice(10)).toBe('T18:00:00.000Z');
    expect(createManualTimestamp('01:15 pm').slice(10)).toBe('T18:15:00.000Z');
  });

  it('creates a correctly formatted date', () => {
    expect(displayDate('2018-07-24T06:00:00.000Z')).toBe('07/24/2018');
    expect(displayDate('2018-07-24T18:00:00.000Z')).toBe('07/24/2018');
    expect(displayDate('2018-07-24T18:15:00.000Z')).toBe('07/24/2018');
  });

  it('creates a correctly formatted start to end times', () => {
    expect(displayStartAndEndTimes('2018-07-24T18:00:00.000Z', '2018-07-24T18:15:00.000Z')).toBe('01:00 pm - 01:15 pm');
  });

  it('creates the correct time elapsed', () => {
    expect(displayTimeElapsed('2018-07-24T18:00:00.000Z', '2018-07-24T18:15:00.000Z')).toBe('00:15:00');
  });

  it('creates a corretly formatted time and date from a manual entry', () => {
    const manualTime = '2018-07-24T01:00:00.000Z';
    const manualDate = '2018-07-04T18:00:00.000Z';

    expect(createManualTimestampWithDate(manualTime, manualDate)).toBe('2018-07-04T01:00:00.000Z');
    expect(createManualTimestampWithDate(manualTime, manualDate)).not.toBe('2018-07-24T01:00:00.000Z');
    expect(createManualTimestampWithDate(manualTime, manualDate)).not.toBe('2018-07-04T18:00:00.000Z');
  });
});
