const router = require('express').Router();
const {
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
  getUserByID,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserByID);

router.post('/users', createUser);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
