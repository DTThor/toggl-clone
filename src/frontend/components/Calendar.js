import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export default class Calendar extends Component {
  render() {
    const { onClick, value } = this.props;
    return (
      <button className="mooveItNavybg white pa2 mh1 db" onClick={onClick}>
        <FontAwesomeIcon icon={faCalendarAlt} size="1x" className="pr2" />
        {value}
      </button>
    );
  }
}

Calendar.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

Calendar.defaultProps = {
  onClick: () => {},
  value: 'hello',
};
