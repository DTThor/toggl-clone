import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { displayDate, displayStartAndEndTimes, displayTimeElapsed } from '../../utils/timeUtils';

export default class TimerHistoryItem extends Component {
  render() {
    const {
      billable, categories, task, project, timeEnd, timeStart,
    } = this.props;

    const isTimeOut = timeEnd !== 0;

    const renderCategories = categories.map((item, index, arr) => {
      const lastIndex = arr.length - 1;
      return `${item.name}${index === lastIndex ? '' : ', '}`;
    });

    const renderBillable = billable ? (
      <FontAwesomeIcon icon={faDollarSign} size="1x" />
    ) : (
      <span>&nbsp;&nbsp;&nbsp;</span>
    );

    if (!isTimeOut) return '';

    return (
      <div className="black-80 f6 ba b--black-10 w-100 center bg-white br2 pa3 pa3-ns mv3 flex justify">
        <div className="pa2 tl mh2 w-10">{displayDate(timeStart)}</div>
        <div className="wrap pa2 tl mh2 w-20">{task}</div>
        <div className="pa2 tl mh2 w-20">{project && project.name}</div>
        <div className="pa2 tl mh2 w-20">{renderCategories}</div>
        <div className="pa2 tl mh2 w-5">{renderBillable}</div>
        <div className="pa2 tl mh2 w-20">{displayStartAndEndTimes(timeStart, timeEnd)}</div>
        <div className="pa2 tl mh2 w-10">{displayTimeElapsed(timeStart, timeEnd)}</div>
      </div>
    );
  }
}

TimerHistoryItem.propTypes = {
  billable: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.object),
  task: PropTypes.string,
  project: PropTypes.shape({}),
  timeEnd: PropTypes.string.isRequired,
  timeStart: PropTypes.string.isRequired,
};

TimerHistoryItem.defaultProps = {
  billable: false,
  categories: [],
  project: {},
  task: '',
};
