// Import express
const express = require('express');

// Take JS file with CRUD operations
const tasksController = require('../controllers/tasks_api_controller.js')
// Build router
const routerTasks = express.Router();

// =======================
// Routes
// =======================

// Require Authentification
// routerTasks.use(tasksController.authTasksMiddleware);

// POST Method
routerTasks.post('/', tasksController.authTasksMiddleware, tasksController.registerTask);

// // GET Methods
// routerTasks.get("/", usersController.usersPage);

// routerTasks.use('/:id', usersController.authUsersMiddleware);
// routerTasks.get('/:id', usersController.getUserFromID);

// // PATCH Method
// routerTasks.patch('/:id', usersController.patchUser);

// // DELETE Method
// routerTasks.delete('/:id', usersController.deleteUser);

// Export router
module.exports = routerTasks;