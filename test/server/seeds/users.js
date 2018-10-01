const { ObjectID } = require('mongodb');

const users = [
  {
    __v: 0,
    _id: new ObjectID(),
    name: 'John Cena',
    email: 'johncena@wwe.com',
    avatarUrl: 'itsjohncena.png',
    token: 'valid',
  },
  {
    __v: 0,
    _id: new ObjectID(),
    name: 'Aubrey Graham',
    email: 'drake@ovo.com',
    avatarUrl: 'drake.png',
    token: 'valid',
  },
  {
    __v: 0,
    _id: new ObjectID(),
    name: 'LeBron James',
    email: 'lebron@lakers.com',
    avatarUrl: 'LeBron.png',
    token: 'valid',
  },
];


module.exports = users;
