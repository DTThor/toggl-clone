require('mongoose');
const User = require('../../models/user');

module.exports = (req, res) => {
  User.remove({ _id: req.params.userId }, (err) => {
    if (err) return res.send(err);
    return res.json({ message: 'User deleted! Bye bye.' });
  });
};
