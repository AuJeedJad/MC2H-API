require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const adminRoute = require('./routes/admin');
const staffRoute = require('./routes/staff');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/admin/staffs', adminRoute);
app.use('/staffs', staffRoute);
app.use((req, res, next) => {
  res.status(404).send({ message: 'Not Found' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

db.sequelize.sync().then(() => {
  console.log('Completed Connect And Sync');
});
