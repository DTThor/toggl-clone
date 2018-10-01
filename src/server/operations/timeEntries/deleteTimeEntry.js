require('mongoose');
const TimeEntry = require('../../models/timeEntry');

module.exports = (req, res) => {
  TimeEntry.remove({ userId: req.user._id, _id: req.params.entryId }, (err) => {
    if (err) return res.send(err);
    return res.json({ message: 'Entry deleted!' });
  });
};
