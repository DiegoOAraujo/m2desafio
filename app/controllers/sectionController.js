const { Project, Section } = require('../models');

module.exports = {
  index(req, res) {
    return res.render('/app/projects/');
  },

  async store(req, res, next) {
    try {
      const { projectId } = req.params;

      const section = await Section.create({
        ...req.body,
        ProjectId: projectId,
      });

      req.flash('success', 'Seção criada com sucesso');

      return res.redirect(`/app/projects/${projectId}/section/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { ProjectId, id } = req.params;

      const project = await Project.findById(ProjectId);

      const sections = await Section.findAll({
        where: {
          ProjectId,
        },
      });

      const { user } = req.session;

      const section = await Section.findById(id);

      return res.render('sections/show', {
        user,
        activeProject: ProjectId,
        project,
        sections,
        currentSection: section,
      });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const section = await Section.findById(req.params.id);

      await section.update(req.body);

      req.flash('success', 'Secão atualizada com sucesso!');

      return res.redirect(`/app/projects/${req.params.projectId}/sections/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Section.destroy({
        where:
        {
          id: req.params.id,
        },
      });

      req.flash('success', 'Seção deletada com sucesso!');

      return res.redirect(`/app/projects/${req.params.projectId}`);
    } catch (err) {
      return next(err);
    }
  },
};
