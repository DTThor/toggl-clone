import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import TimerHistoryItem from './TimerHistoryItem';

class TimerHistory extends Component {
  renderHistoryItem() {
    const { timeEntries } = this.props;

    return timeEntries
      .sort((a, b) => (a.timeStart > b.timeStart ? -1 : 1))
      .map(({
        _id, billable, categories, task, project, timeEnd, timeStart,
      }) => (
        <TimerHistoryItem
          billable={billable}
          categories={categories}
          task={task}
          key={_id}
          project={project}
          timeEnd={timeEnd}
          timeStart={timeStart}
        />
      ));
  }
  render() {
    return <div>{this.renderHistoryItem()}</div>;
  }
}

TimerHistory.propTypes = {
  timeEntries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => (
  { timeEntries: state.timeEntries.timeEntries }
);

const mapDispachToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);


export default connect(mapStateToProps, mapDispachToProps)(TimerHistory);
