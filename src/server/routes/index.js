const router = require('express').Router();
const postToken = require('../operations/auth/postToken');
const getAllProjects = require('../operations/projects/getAllProjects');
const createProject = require('../operations/projects/createProject');
const deleteProject = require('../operations/projects/deleteProject');
const updateProject = require('../operations/projects/updateProject');
const findTimeEntries = require('../operations/timeEntries/findTimeEntries');
const getTimeEntryById = require('../operations/timeEntries/getTimeEntryById');
const createTimeEntry = require('../operations/timeEntries/createTimeEntry');
const updateTimeEntry = require('../operations/timeEntries/updateTimeEntry');
const deleteTimeEntry = require('../operations/timeEntries/deleteTimeEntry');
const deleteTimeEntries = require('../operations/timeEntries/deleteTimeEntries');
const getAllUsers = require('../operations/users/getAllUsers');
const getUserByUserId = require('../operations/users/getUserByUserId');
const createUser = require('../operations/users/createUser');
const deleteUser = require('../operations/users/deleteUser');
const createLogin = require('../operations/auth/createLogin');


// Github auth route
router.post('/auth/github', postToken);

// Login auth route
router.post('/api/login', createLogin);


// project routes
router.route('/api/projects')
  .get(getAllProjects)
  .post(createProject);

router.route('/api/projects/:projectId')
  .put(updateProject)
  .delete(deleteProject);


// time entry routes
router.route('/api/entries')
  .get(findTimeEntries)
  .post(createTimeEntry)
  .delete(deleteTimeEntries);

router.route('/api/entries/:entryId')
  .get(getTimeEntryById)
  .put(updateTimeEntry)
  .delete(deleteTimeEntry);

// user routes
router.route('/api/users')
  .get(getAllUsers)
  .post(createUser);

router.route('/api/users/:userId')
  .get(getUserByUserId)
  .delete(deleteUser);

module.exports = router;
