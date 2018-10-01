const Users = require('../../models/user');

module.exports = (req, res) => {
  Users.find({}, (err, users) => {
    if (err) return res.send(err);
    return res.json(users);
  });
};
