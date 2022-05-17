const userRoutes = require('express').Router();
const {
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
  getUserByID,
} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/:userId', getUserByID);

userRoutes.post('/', createUser);

userRoutes.patch('/me', updateProfile);

userRoutes.patch('/me/avatar', updateAvatar);

module.exports = userRoutes;
