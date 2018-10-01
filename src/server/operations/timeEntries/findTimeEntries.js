const TimeEntry = require('../../models/timeEntry');

module.exports = (req, res) => {
  TimeEntry.find({ userId: req.query.id })
    .populate('project')
    .exec((err, entries) => {
      if (err) return res.send(err);
      return res.json(entries);
    });
};
