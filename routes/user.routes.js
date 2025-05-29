const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.createUser);      // POST /users
router.get('/', userController.getAllUsers);      // GET /users
router.get('/:id', userController.getUserById);   // GET /users/:id

module.exports = router;
