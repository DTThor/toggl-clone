require('mongoose');
const Project = require('../../models/project');

module.exports = (req, res) => {
  const newProject = new Project(req.body);
  newProject.save((err, project) => {
    if (err) return res.send(err);
    return res.json(project);
  });
};
