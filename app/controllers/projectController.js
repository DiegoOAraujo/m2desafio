const { Project, Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {

      const project = await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });
      req.flash('success', 'Projeto criado com sucesso');

      return res.redirect(`/app/projects/${project.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const projectId = req.params.id;

      const project = await Project.findById(projectId);

      const sections = await Section.findAll({
        where: {
          ProjectId: projectId,
        },
      });

      const { user } = req.session;

      return res.render('projects/show', {
        user,
        project,
        activeProject: projectId,
        sections,
      });
    } catch (err) {
      return next(err);
    }
  },
};
