const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { addHash } = require('../../../utils/userAuth');

module.exports = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(403).json({
      success: false,
      error: 'Authentication failed. Email or password not found.',
    });
  }
  User.findOne({ email }, (err, user) => {
    if (user) {
      return res.status(403).json({
        success: false,
        error: 'User already exists!',
      });
    }
    const newUser = new User();
    newUser.password = addHash(password);
    newUser.email = email;
    newUser.name = name;

    newUser.save((error) => {
      if (error) {
        return res.status(500).json({
          success: false,
          error: 'Could not save user',
        });
      }
      const userJSON = newUser.toJSON();
      const token = jwt.sign(userJSON, 'secret', { expiresIn: '24h' });
      res.json({
        success: true,
        token,
        user: newUser,
      });
    });
  });
};
