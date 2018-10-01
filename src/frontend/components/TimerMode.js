import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSquare } from '@fortawesome/free-solid-svg-icons';
import DocumentHead from './DocumentHead';
import { DEFAULT_DURATION } from '../../constants';

export default class TimerMode extends Component {
  render() {
    const { duration, handleTimerClick } = this.props;

    return (
      <div className="flex justify-around items-center ph2 h2 mw40">
        <DocumentHead duration={duration} />
        <span className="b f4 mr3 items-center black-60">{duration || DEFAULT_DURATION}</span>
        <button
          className="pointer bg-blue mooveItNavybg mooveItPink f6 link br-100 w2 h2 tc items-center"
          onClick={handleTimerClick}
        >
          <FontAwesomeIcon icon={duration ? faSquare : faPlay} size="1x" />
        </button>
      </div>
    );
  }
}

TimerMode.propTypes = {
  duration: PropTypes.string,
  handleTimerClick: PropTypes.func.isRequired,
};

TimerMode.defaultProps = {
  duration: null,
};
