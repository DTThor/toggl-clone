const TimeEntry = require('../../models/timeEntry');

module.exports = (req, res) => {
  TimeEntry.findOne({ entryId: req.params._id }, (err, entry) => {
    if (err) return res.send(err);
    return res.json(entry);
  });
};
