const bcrypt = require('bcrypt-nodejs');

const addHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

const verifyPassword = (user, password) => bcrypt.compareSync(password, user.password);

module.exports = { addHash, verifyPassword };
