const port = process.env.PORT || 3000;
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport');
const pool = require('./src/utils/dbConnection');
const constants = require('./src/utils/constants');
require('./src/utils/jwt-passport')(passport);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

pool.getConnection((error) => {
  if (error) throw error;
  console.log('Database Connected');
});

// const basePath = '/';
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*', credentials: false }));

const customer = require('./src/routes/customer');
const employee = require('./src/routes/employee');
const project = require('./src/routes/project');
const issue = require('./src/routes/issue');

app.use('/customer', customer);
app.use('/employee', employee);
app.use('/project', project);
app.use('/issue', issue);

app.get('/ping', (req, res) => res
  .status(constants.STATUS_CODE.SUCCESS_STATUS)
  .send());

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('Error Occurred! Please try again');
});

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
