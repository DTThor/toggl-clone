import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Alert from 'react-s-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar';
import {
  createManualTimestamp,
  createManualTimestampWithDate,
  displayTimeInput,
} from '../../utils/timeUtils';
import { showAlert } from '../../utils/alertUtils';
import { INVALID_TIME, TIMER_WARNING } from '../../constants';

export default class ManualMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manualDate: moment(),
      manualTimeEnd: localStorage.getItem('manualTimeEnd') || '',
      manualTimeStart: localStorage.getItem('manualTimeStart') || '',
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateManualTimes = this.validateManualTimes.bind(this);
    this.validateTime = this.validateTime.bind(this);
  }

  handleInputChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleDateChange(date) {
    this.setState({ manualDate: date });
  }

  validateTime(e) {
    const { value, name } = e.target;
    const time = displayTimeInput(value);

    if (time === 'Invalid date') {
      this.setState({ [name]: '' });
      return showAlert(INVALID_TIME);
    }
    this.setState({ [name]: time });
    localStorage.setItem([name], time);
  }

  validateManualTimes() {
    const { manualDate, manualTimeStart, manualTimeEnd } = this.state;
    const { handleManualSubmit } = this.props;
    if (!manualTimeStart || !manualTimeEnd) return showAlert(TIMER_WARNING);
    const timeStart = createManualTimestampWithDate(manualTimeStart, manualDate);
    const timeEnd = createManualTimestamp(manualTimeEnd);
    return handleManualSubmit(timeStart, timeEnd);
  }

  render() {
    const { manualDate, manualTimeStart, manualTimeEnd } = this.state;

    return (
      <div className="flex items-center justify-around ph2 h2">
        <DatePicker
          customInput={<Calendar />}
          dateFormat="M/D"
          selected={manualDate}
          onChange={this.handleDateChange}
        />

        <input
          className="start input-reset ba b--black-20 pa2 mh1 db w4 outline-0 br3 black-60"
          name="manualTimeStart"
          onChange={this.handleInputChange}
          value={manualTimeStart}
          onBlur={this.validateTime}
          placeholder="Time In"
        />

        <FontAwesomeIcon icon={faArrowRight} size="1x" className="mooveItNavy" />

        <input
          className="end input-reset ba b--black-20 pa2 mh1 db w4 outline-0 br3 black-60"
          name="manualTimeEnd"
          onChange={this.handleInputChange}
          value={manualTimeEnd}
          onBlur={this.validateTime}
          placeholder="Time Out"
        />

        <button
          className="pointer mooveItNavybg f6 link dim br-100 w2 h2 dib mooveItPink bg-blue tc"
          onClick={this.validateManualTimes}
        >
          <FontAwesomeIcon icon={faCheck} size="1x" />
        </button>

        <Alert stack={{ limit: 3 }} />
      </div>
    );
  }
}

ManualMode.propTypes = {
  handleManualSubmit: PropTypes.func.isRequired,
};
