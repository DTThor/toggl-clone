const TimeEntry = require('../../models/timeEntry');

module.exports = (req, res) => {
  const newTimeEntry = new TimeEntry(req.body);
  newTimeEntry.save((err, timeEntry) => {
    if (err) return res.send(err);
    return res.send(timeEntry);
  });
};
