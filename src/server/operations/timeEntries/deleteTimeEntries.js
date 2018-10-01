require('mongoose');
const TimeEntry = require('../../models/timeEntry');

module.exports = (req, res) => {
  TimeEntry.remove({}, (err) => {
    if (err) return res.send(err);
    return res.json({ message: 'All time entries deleted' });
  });
};
