const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '627ad0aa0d757da0d3d06090',
  };

  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);
app.use('*', (req, res, next) => {
  next(res.status(404).json({ message: 'Страница не найдена' }));
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });

  app.listen(PORT, () => {
    console.log(`Слушаем ${PORT}`);
  });
}

main();
