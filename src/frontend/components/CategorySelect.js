import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faCheck } from '@fortawesome/free-solid-svg-icons';
import { find } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

class CategorySelect extends Component {
  render() {
    const {
      categories,
      categoriesSelected,
      categoriesOpen,
      setCategories,
      toggleCategoriesList,
    } = this.props;

    // marks the items in the list that have been selected so a check mark can be shown
    const categoriesRendered = categories.map((item) => {
      const itemCopy = Object.assign({}, item);
      if (find(categoriesSelected, itemCopy)) itemCopy.selected = true;
      return itemCopy;
    });

    return (
      <div className="relative">
        <FontAwesomeIcon
          className="pointer gray grow-large black-20 mh3"
          icon={faTag}
          size="lg"
          onClick={toggleCategoriesList}
        />
        {categoriesOpen ? (
          <ul
            className="dropdown-list list bg-white black-90 ba b--light-silver br3 pb3 pt3 ph0 ma4"
            onMouseLeave={toggleCategoriesList}
          >
            {categoriesRendered.map(item => (
              <li
                className="listItem ph0 pv2 black-80"
                key={item._id}
                onClick={() => setCategories(item)}
                role="presentation"
              >
                <div className="ml3 dib w-10">
                  {item.selected && <FontAwesomeIcon icon={faCheck} />}
                </div>
                <div className="pa0 dib">{item.name}</div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

CategorySelect.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  categoriesSelected: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoriesOpen: PropTypes.bool.isRequired,
  setCategories: PropTypes.func.isRequired,
  toggleCategoriesList: PropTypes.func.isRequired,
};

CategorySelect.defaultProps = {
  categories: [],
};

const mapStateToProps = state => (
  { categories: state.categories }
);

const mapDispachToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);


export default connect(mapStateToProps, mapDispachToProps)(CategorySelect);
