require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

// роуты, не требующие авторизации
app.post('/signin', login);
app.post('/signup', createUser);

// авторизация
app.use(auth);

// роуты, которым нужна авторизация
app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Страница не найдена' });
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
