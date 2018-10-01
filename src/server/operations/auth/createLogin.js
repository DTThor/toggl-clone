const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { verifyPassword } = require('../../../utils/userAuth');

module.exports = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({
      success: false,
      error: 'Authentication failed. Email or password not found.',
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Internal Server Error',
      });
    }
    if (!user || !verifyPassword(user, password)) {
      return res.status(403).json({
        success: false,
        error: 'Invalid email or password',
      });
    }
    const userJSON = user.toJSON();
    const token = jwt.sign(userJSON, 'secret', { expiresIn: '24h' });
    res.json({
      success: true,
      token,
      user,
    });
  });
};
