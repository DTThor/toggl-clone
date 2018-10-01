require('mongoose');
const Project = require('../../models/project');

module.exports = (req, res) => {
  Project.remove({ _id: req.params.projectId }, (err) => {
    if (err) return res.send(err);
    return res.json({ message: 'Project deleted!' });
  });
};
