import React from 'react';
import { mount } from 'enzyme';
import CategorySelect from '../../../src/frontend/components//CategorySelect';

describe('CategorySelect Component', () => {
  const categories = [];
  const categoriesSelected = [];
  const categoriesOpen = false;
  const toggleCategoriesList = jest.fn();
  const setCategories = jest.fn();

  it('renders without crashing', () => {
    mount(<CategorySelect
      categories={categories}
      categoriesSelected={categoriesSelected}
      categoriesOpen={categoriesOpen}
      toggleCategoriesList={toggleCategoriesList}
      setCategories={setCategories}
    />);
  });
});
