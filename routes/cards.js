const cardsRoutes = require('express').Router();

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateCardId,
  validateCard,
} = require('../middlewares/validation');

cardsRoutes.get('/', getCards);

cardsRoutes.delete('/:cardId', validateCardId, deleteCard);

cardsRoutes.post('/', validateCard, createCard);

cardsRoutes.put('/:cardId/likes', validateCardId, likeCard);

cardsRoutes.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardsRoutes;
