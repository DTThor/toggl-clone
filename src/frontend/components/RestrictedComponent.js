import React from 'react';
import PropTypes from 'prop-types';
import NotFound from './NotFound';

const RestrictedComponent = ({ children, isAdmin }) => (
  isAdmin ? children : <NotFound />
);

export default RestrictedComponent;

RestrictedComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
