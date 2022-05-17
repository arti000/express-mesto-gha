const cardsRoutes = require('express').Router();

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRoutes.get('/', getCards);

cardsRoutes.delete('/:cardId', deleteCard);

cardsRoutes.post('/', createCard);

cardsRoutes.put('/:cardId/likes', likeCard);

cardsRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRoutes;
