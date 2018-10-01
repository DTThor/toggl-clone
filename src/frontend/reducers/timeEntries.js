function timeEntries(state = { timeEntries: [], isFetching: false }, action) {
  switch (action.type) {
    case 'REQUEST_ENTRIES':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_ENTRIES':
      return Object.assign({}, state, {
        timeEntries: action.timeEntries,
        isFetching: false,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export default timeEntries;
