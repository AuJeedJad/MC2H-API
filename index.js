require('dotenv').config();
require('./middleware/passport');

const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const adminRoute = require('./routes/admin');
const loginRoute = require('./routes/login');
const motherAccountRoute = require('./routes/motherAccount');
const motherProfileRoute = require('./routes/motherProfile');
const staticRiskEvaluationRoute = require('./routes/staticRiskEvaluation');
const riskEvaluationRoute = require('./routes/riskEvaluation');
const dentalRoute = require('./routes/dental');
const ancRoute = require('./routes/anc');
const labResultRoute = require('./routes/labResult');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/admin/staff', adminRoute);
app.use('/login', loginRoute);
app.use('/staff/motherAccount', motherAccountRoute);
app.use('/motherProfile', motherProfileRoute);
app.use('/anc', ancRoute);
app.use('/staticRiskEvaluation', staticRiskEvaluationRoute);
app.use('/riskEvaluation', riskEvaluationRoute);
app.use('/dental', dentalRoute);
app.use('/labResult', labResultRoute);

app.use((req, res, next) => {
  res.status(404).send({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

db.sequelize.sync({ force: false }).then(() => {
  console.log('Completed Connect And Sync');
});
