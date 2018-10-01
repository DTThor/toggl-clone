const Projects = require('../../models/project');

module.exports = (req, res) => {
  Projects.find({}, (err, projects) => {
    if (err) return res.send(err);
    return res.json(projects);
  });
};
