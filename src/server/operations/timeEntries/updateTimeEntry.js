const TimeEntry = require('../../models/timeEntry');

module.exports = (req, res) => {
  TimeEntry.findOneAndUpdate(
    { userId: req.user_id, _id: req.params.entryId },
    req.body,
    { new: true },
    (err, entry) => {
      if (err) return res.send(err);
      return res.json(entry);
    },
  );
};
