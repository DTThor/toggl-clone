import dummyCategories from '../../utils/dummyCategories';

function categories(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_CATEGORIES':
      return dummyCategories;
    default:
      return state;
  }
}

export default categories;
