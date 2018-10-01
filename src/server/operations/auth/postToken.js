const fetchAuthToken = require('../../../utils/fetchAuthToken');
const Users = require('../../models/user');

module.exports = (req, res) => {
  fetchAuthToken(req.body.code).then((response) => {
    Users.find({ email: response.email }, (err, docs) => {
      if (err) return res.send(err);
      if (docs.length) return res.send(docs[0]);
      return Users.create(response).then(user => res.send(user));
    });
  });
};
