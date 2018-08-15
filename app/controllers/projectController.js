const { Project, Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      if (req.body.title) {
        const project = await Project.create({
          ...req.body,
          UserId: req.session.user.id,
        });
        req.flash('success', 'Projeto criado com sucesso');

        return res.redirect(`/app/projects/${project.id}`);
      }else{
        req.flash('success', 'Preencha o nome do projeto');

        return res.redirect(`/app/dashboard`);
      }
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

  async update(req, res, next) {
    try {
      
      const project = await Project.findById(req.params.id);

      await project.update(req.body);

      req.flash('success', 'Projeto atualizado com sucesso!');

      return res.redirect(`/app/projects/${project.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    console.log(req.params);
    
    try {
      await Project.destroy({
        where:
        {
          id: req.params.id,
        },
      });

      req.flash('success', 'Projeto deletado com sucesso!');

      return res.redirect(`/app/dashboard/`);
    } catch (err) {
      return next(err);
    }
  },
};
