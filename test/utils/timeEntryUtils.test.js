import {
  setTimeStartInLocalStorage,
  getTimeStartFromLocalStorage,
  removeTimeStartFromLocalStorage,
  setRecordInLocalStorage,
  getRecordFromLocalStorage,
  removeRecordFromLocalStorage,
} from '../../src/utils/timeEntryUtils';

const startTime = '2018-08-02T16:48:16.537Z';

const record = {
  task: 'A task description',
  billable: true,
  project: '0123',
  categories: [{ _id: '01', name: 'a category' }, { _id: '02', name: 'another category' }],
};

describe('timeEntry utilities', () => {
  it('it sets the start time in local storage', () => {
    setTimeStartInLocalStorage(startTime);
    const isTimeEntryInLocalStorage = localStorage.getItem('timeStart');
    expect(isTimeEntryInLocalStorage).toBeTruthy();
    localStorage.clear();
  });

  it('it gets and parses the start time from local storage', () => {
    setTimeStartInLocalStorage(startTime);
    const isTimeEntryInLocalStorage = getTimeStartFromLocalStorage();
    expect(isTimeEntryInLocalStorage).toBeTruthy();
    expect(isTimeEntryInLocalStorage).toEqual(startTime);
    localStorage.clear();
  });

  it('removes the start time from local storage', () => {
    const isTimeEntryInLocalStorage = () => !!getTimeStartFromLocalStorage();
    expect(isTimeEntryInLocalStorage()).toBeFalsy();
    setTimeStartInLocalStorage(startTime);
    expect(isTimeEntryInLocalStorage()).toBeTruthy();
    removeTimeStartFromLocalStorage();
    expect(isTimeEntryInLocalStorage()).toBeFalsy();
  });

  it('it sets the record in local storage', () => {
    setRecordInLocalStorage(record);
    const isRecordInLocalStorage = localStorage.getItem('record');
    expect(isRecordInLocalStorage).toBeTruthy();
    localStorage.clear();
  });

  it('it gets and parses the record from local storage', () => {
    setRecordInLocalStorage(record);
    const isRecordInLocalStorage = getRecordFromLocalStorage();
    expect(isRecordInLocalStorage).toBeTruthy();
    expect(isRecordInLocalStorage).toEqual(record);
    localStorage.clear();
  });

  it('removes the record from local storage', () => {
    const isRecordInLocalStorage = () => !!getRecordFromLocalStorage();
    expect(isRecordInLocalStorage()).toBeFalsy();
    setRecordInLocalStorage(record);
    expect(isRecordInLocalStorage()).toBeTruthy();
    removeRecordFromLocalStorage();
    expect(isRecordInLocalStorage()).toBeFalsy();
    localStorage.clear();
  });
});
