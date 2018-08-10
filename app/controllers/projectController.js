const {Project, Section} = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      
      const project = await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });
      console.log(project);
      req.flash('success', 'Projeto criado com sucesso');
      
      return res.redirect(`/app/projects/${project.id}`);
    } catch (err) {
      return next(err);
    }
  },
  async index(req, res, next) {
    try {
      const projects = await Project.findAll({
        include: [Section],
        where:{        
          UserId: req.session.user.id,
        }
      }); 
      const {user} = req.session;
      return res.render('projects/index', {user,projects});
    } catch (err) {
      next(err);
    }
  },
};