const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(
      {
        message: 'Ошибка по умолчанию.',
        err,
      },
    ));
};

const getUserByID = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectID') {
        res.status(404).send({
          message: 'Пользователь по указанному _id не найден',
          err,
        });
        return;
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию',
        err,
      });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.errors.name.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя',
          err,
        });
        return;
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию',
        err,
      });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectID') {
        res.status(404).send({
          message: 'Пользователь по указанному _id не найден',
          err,
        });
        return;
      }
      if (err.errors.name.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара',
          err,
        });
        return;
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию',
        err,
      });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectID') {
        res.status(404).send({
          message: 'Пользователь по указанному _id не найден',
          err,
        });
        return;
      }
      if (err.errors.name.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара',
          err,
        });
        return;
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию',
        err,
      });
    });
};

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateProfile,
  updateAvatar,
};
