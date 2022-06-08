const userRoutes = require('express').Router();
const {
  getUsers,
  updateProfile,
  updateAvatar,
  getUserByID,
  getUserInfo,
} = require('../controllers/users');

const {
  validateUserId,
  validateUpdateProfile,
  validateAvatar,
} = require('../middlewares/validation');

userRoutes.get('/', getUsers);

userRoutes.get('/:userId', validateUserId, getUserByID);

userRoutes.get('/me', getUserInfo);

userRoutes.patch('/me', validateUpdateProfile, updateProfile);

userRoutes.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = userRoutes;
