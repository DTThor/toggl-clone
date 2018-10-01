const Project = require('../../models/project');

module.exports = (req, res) => {
  Project.findOneAndUpdate(
    { _id: req.params.projectId },
    req.body,
    { new: true },
    (err, project) => {
      if (err) return res.send(err);
      return res.json(project);
    },
  );
};
