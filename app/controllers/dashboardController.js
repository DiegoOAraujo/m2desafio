const { Project, Section } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const projects = await Project.findAll({
        include: [Section],
        where: {
          UserId: req.session.user.id,
        },
      });

      const { user } = req.session;

      return res.render('dashboard/index', { user, projects });
    } catch (err) {
      return next(err);
    }
  },
};
