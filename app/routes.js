const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');
const sectionController = require('./controllers/sectionController');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/**
 * auth
 */
routes.get('/', guestMiddleware, authController.signin);
routes.get('/signup', guestMiddleware, authController.signup);
routes.get('/signout', authController.signout);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

/**
 * dashboard
 */
routes.use('/app', authMiddleware);
routes.get('/app/dashboard', dashboardController.index);

/**
 * projetos
 */
routes.get('/app/projects/:id', projectController.show);
routes.put('/app/projects/:id', projectController.update);
routes.post('/app/projects/create', projectController.store);
routes.delete('/app/projects/:id', projectController.destroy);

/**
 * sections
 */
routes.get('/app/projects/:ProjectId/sections/:id', sectionController.show);
routes.put('/app/projects/:ProjectId/sections/:id', sectionController.update);
routes.post('/app/projects/:ProjectId/sections/create', sectionController.store);
routes.delete('/app/projects/:ProjectId/sections/:id', sectionController.destroy);


/**
 * erros
 */
// se não encontrar nenhuma das rotas acima vai para erro 404
routes.use((req, res) => res.render('errors/404'));
 // se houver algum erro será direcionado para página de erro detalhando o mesmo
routes.use((err, req, res, _next) => {
  res.status(err.status || 500);
  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
