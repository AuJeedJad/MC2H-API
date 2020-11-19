require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use((req, res, next) => {
  res.status(404).send({ message: 'Not Found' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

db.sequelize.sync().then(() => {
  console.log('Completed Connect And Sync');
});
