const { Router } = require('express');

const userController = require('../controllers/user.controller');

const userRouter = new Router();

userRouter.post('/user', userController.createUser);

userRouter.put('/user', userController.updateActive);

module.exports = userRouter;
