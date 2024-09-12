const express = require('express');
const userRouter = express.Router();

const {addUser, authUser} = require('../controller/user.controller');

userRouter.post('/', addUser);

userRouter.post('/auth', authUser);


module.exports = userRouter;