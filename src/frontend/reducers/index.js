import { combineReducers } from 'redux';

import projects from './projects';
import categories from './categories';
import timeEntries from './timeEntries';

const rootReducer = combineReducers({ projects, categories, timeEntries });

export default rootReducer;
