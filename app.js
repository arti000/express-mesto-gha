const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '627ad0aa0d757da0d3d06090',
  };

  next();
});

app.use((req, res, next) => {
  next(res.status(404).json({ message: 'Страница не найдена' }));
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });

  app.listen(PORT, () => {
    console.log(`Слушаем ${PORT}`);
  });
}

main();
