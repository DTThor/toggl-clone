const Users = require('../../models/user');

module.exports = (req, res) => {
  Users.findOne({ userId: req.params._id }, (err, user) => {
    if (err) return res.send(err);
    return res.json(user);
  });
};
