// Import express
const express = require('express');

// Take JS file with CRUD operations
const usersController = require('../controllers/users_api_controller.js')
// Build router
const routerUsers = express.Router();

// =======================
// Routes
// =======================

routerUsers.post('/', usersController.registerUser);

// routerUsers.use('/:id', usersController)

// Export router
module.exports = routerUsers;