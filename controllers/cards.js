const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(
      {
        message: 'Ошибка по умолчанию',
        err,
      },
    ));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: 'Передан несуществующий _id карточки',
        });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({
          message: 'Переданы некорректные данные для удаления карточки',
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

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки',
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

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: 'Передан несуществующий _id карточки',
        });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка',
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

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: 'Передан несуществующий _id карточки',
        });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка',
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
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
