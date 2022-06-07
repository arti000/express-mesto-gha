const userRoutes = require('express').Router();
const {
  getUsers,
  updateProfile,
  updateAvatar,
  getUserByID,
  getUserInfo,
} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/:userId', getUserByID);

userRoutes.get('/me', getUserInfo);

userRoutes.patch('/me', updateProfile);

userRoutes.patch('/me/avatar', updateAvatar);

module.exports = userRoutes;
