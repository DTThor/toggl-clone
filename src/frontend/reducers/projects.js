function projects(state = { projects: [], isFetching: false }, action) {
  switch (action.type) {
    case 'REQUEST_PROJECTS':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_PROJECTS':
      return Object.assign({}, state, {
        projects: action.projects,
        isFetching: false,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export default projects;
